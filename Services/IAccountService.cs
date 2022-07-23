using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace React_Sample.Services
{
    public interface IAccountService
    {
        public Task<string> HandleUserAsync(ClaimsPrincipal user);
    }
}
