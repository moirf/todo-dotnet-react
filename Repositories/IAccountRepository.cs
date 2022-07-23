using React_Sample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Sample.Repositories
{
    public interface IAccountRepository
    {
        public Task<Account> GetAccountAsync(string id);

        public Task CreateAccountAsync(Account account);

    }
}
