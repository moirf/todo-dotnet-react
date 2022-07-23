using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using React_Sample.Repositories;
using React_Sample.Models;

namespace React_Sample.Services
{
    public class AccountService : IAccountService
    {
        private IConfiguration _config;
        private IAccountRepository _repository;

        public AccountService(
            IConfiguration config,
            IAccountRepository accountRepository)
        {
            _config = config;
            _repository = accountRepository;
        }
        
        public async Task<string> HandleUserAsync(ClaimsPrincipal user)
        {
            var oid_type = _config.GetValue<string>("OAuth:oid_type");
            var id = user.Claims.Where(claim => claim.Type.Equals(oid_type)).Single().Value;
            AccountRole role;          
            
            if (await _repository.GetAccountAsync(id) != null)
                return id;

            if (user.IsInRole("User"))
                role = AccountRole.User;
            else if (user.IsInRole("Admin"))
                role = AccountRole.Admin;
            else
                throw new UnauthorizedAccessException("Logged in user does not have an assigned role");

            var email_type  = _config.GetValue<string>("OAuth:email_type");
            var name_type   = _config.GetValue<string>("OAuth:name_type");
         
            var email   = user.Claims.Where(claim => claim.Type.Equals(email_type)).Single().Value;
            var name    = user.Claims.Where(claim => claim.Type.Equals(name_type)).Single().Value;

            Account newAccount = new Account { Id = id, Email = email, Name = name, Role = role };

            await _repository.CreateAccountAsync(newAccount);
            return id;
        }
    }
}
