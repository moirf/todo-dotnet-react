using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Models
{
    public enum AccountRole
    {
        User=0,
        Admin=1
    }
    public class Account
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public AccountRole Role { get; set; }
    }
}
