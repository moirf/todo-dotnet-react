using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ToDo.Services
{
    public interface IAccountService
    {
        public Task<string> HandleUserAsync(ClaimsPrincipal user);
    }
}
