using ToDo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Repositories
{
    public interface IAccountRepository
    {
        public Task<Account> GetAccountAsync(string id);

        public Task CreateAccountAsync(Account account);

    }
}
