using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using React_Sample.Models;

namespace React_Sample.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
        public virtual DbSet<Todo> Todos { get; set; }

        public virtual DbSet<Account> Accounts { get; set; }
    }
}
