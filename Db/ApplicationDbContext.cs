using Microsoft.EntityFrameworkCore;
using ToDo.Models;

namespace ToDo.Data
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
