using Microsoft.EntityFrameworkCore;

namespace ToDo.Db;

public class TodosDbContext : DbContext
{
    public DbSet<Todo> Todos { get; set; }

    public TodosDbContext(DbContextOptions options) : base(options)
    {
    }
}