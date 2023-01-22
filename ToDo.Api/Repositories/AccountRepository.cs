using ToDo.Data;
using ToDo.Models;

namespace ToDo.Repositories
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
