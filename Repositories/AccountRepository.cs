using React_Sample.Data;
using React_Sample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Sample.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private ApplicationDbContext _context;
        public AccountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Account> GetAccountAsync(string id)
        {
            return await _context.Accounts.FindAsync(id);
        }

        public async Task CreateAccountAsync(Account account)
        {
            await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();
        }
    }
}
