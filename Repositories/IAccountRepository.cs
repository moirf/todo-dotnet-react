using ToDo.Models;

namespace ToDo.Repositories
{
    public interface IAccountRepository
    {
        public Task<Account> GetAccountAsync(string id);

        public Task CreateAccountAsync(Account account);

    }
}
