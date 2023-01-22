using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ToDo.Db;

namespace ToDo.Repositories;
public class TodoRepository : ITodoRepository
{
    private readonly TodosDbContext _dbContext;
    private readonly ILogger<TodoRepository> _logger;
    private readonly IMapper _mapper;
    public TodoRepository(TodosDbContext dbContext, ILogger<TodoRepository> logger, IMapper mapper)
    {
        _dbContext = dbContext;
        _logger = logger;
        _mapper = mapper;

        SeedData();
    }

    private void SeedData()
    {
        if (!_dbContext.Todos.Any())
        {
            _dbContext.Todos.Add(new Db.Todo() { Id = 1, Task = "Todo 1", DueDate = DateTime.Now, Completed = false });
            _dbContext.Todos.Add(new Db.Todo() { Id = 2, Task = "Todo 2", DueDate = DateTime.Now, Completed = false });
            _dbContext.Todos.Add(new Db.Todo() { Id = 3, Task = "Todo 3", DueDate = DateTime.Now, Completed = false });
            _dbContext.Todos.Add(new Db.Todo() { Id = 4, Task = "Todo 4", DueDate = DateTime.Now, Completed = false });
            _dbContext.Todos.Add(new Db.Todo() { Id = 5, Task = "Todo 5", DueDate = DateTime.Now, Completed = false });
            _dbContext.SaveChanges();
        }
    }

    public async Task<(bool IsSuccess, IEnumerable<Models.Todo> Todos, string ErroMessage)> GetTodosAsync()
    {
        try
        {
            var todos = await _dbContext.Todos.ToListAsync();
            if (todos != null && todos.Any())
            {
                var result = _mapper.Map<IEnumerable<Db.Todo>, IEnumerable<Models.Todo>>(todos);
                return (true, result, null);
            }
            return (false, null, "Not found.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return (false, null, ex.Message);
        }
    }

    public async Task<(bool IsSuccess, Models.Todo Todo, string ErroMessage)> GetTodoAsync(int id)
    {
        try
        {
            var todo = await _dbContext.Todos.FindAsync(id);
            if (todo != null)
            {
                var result = _mapper.Map<Db.Todo, Models.Todo>(todo);
                return (true, result, null);
            }
            return (false, null, "Not found.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return (false, null, ex.Message);
        }
    }

    public async Task<(bool IsSuccess, IEnumerable<Models.Todo> Todos, string ErroMessage)> UpdateTodosAsync(IEnumerable<Models.Todo> todos)
    {
        try
        {
            var dbTodos = _mapper.Map<IEnumerable<Models.Todo>, IEnumerable<Db.Todo>>(todos);
            _dbContext.Todos.UpdateRange(dbTodos);
            await _dbContext.SaveChangesAsync();
            return (true, todos, null);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return (false, null, ex.Message);
        }
    }

    public async Task<(bool IsSuccess, string ErroMessage)> DeleteTodoAsync(int id)
    {
        try
        {
            var todo = await _dbContext.Todos.FindAsync(id);
            if (todo != null)
            {
                _dbContext.Todos.Remove(todo);
                await _dbContext.SaveChangesAsync();
                return (true, null);
            }
            return (false, "Not found.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return (false, ex.Message);
        }
    }

    public async Task<(bool IsSuccess, IEnumerable<Models.Todo> Todos, string ErroMessage)> AddTodosAsync(IEnumerable<Models.Todo> todos)
    {
        try
        {
            var dbTodos = _mapper.Map<IEnumerable<Models.Todo>, IEnumerable<Db.Todo>>(todos);
            await _dbContext.Todos.AddRangeAsync(dbTodos);
            await _dbContext.SaveChangesAsync();
            return (true, todos, null);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return (false, null, ex.Message);
        }
    }
}
