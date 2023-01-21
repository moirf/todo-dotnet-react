using ToDo.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Db;
using AutoMapper;

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
        if(!_dbContext.Todos.Any())
        {
            _dbContext.Todos.Add(new Db.Todo(){ Id=1, Task="Todo 1", DueDate=DateTime.Now, Completed=false});
            _dbContext.Todos.Add(new Db.Todo(){ Id=2, Task="Todo 2", DueDate=DateTime.Now, Completed=false});
            _dbContext.Todos.Add(new Db.Todo(){ Id=3, Task="Todo 3", DueDate=DateTime.Now, Completed=false});
            _dbContext.Todos.Add(new Db.Todo(){ Id=4, Task="Todo 4", DueDate=DateTime.Now, Completed=false});
            _dbContext.Todos.Add(new Db.Todo(){ Id=5, Task="Todo 5", DueDate=DateTime.Now, Completed=false});
            _dbContext.SaveChanges();
        }
    }

    // public IEnumerable<Models.Todo> GetTodos()
    // {
    //     string userId = "1"; //[ToDo] get it from accesstoken
    //     return _dbContext.Todos
    //         .Where(todo => todo.Id.Equals(userId))
    //         .OrderByDescending(todo => todo.DueDate);
    // }

    // public async Task<Models.Todo> GetTodo(int todoId)
    // {
    //     return await _context.Todos.FindAsync(todoId);
    // }

    // public async Task UpdateTodos(IEnumerable<Models.Todo> todos)
    // {
    //     _context.Todos.UpdateRange(todos);
    //     await _context.SaveChangesAsync();
    // }

    // public async Task DeleteTodo(int id)
    // {
    //     Models.Todo todo = await _context.Todos.FindAsync(id);
    //     _context.Todos.Remove(todo);
    //     await _context.SaveChangesAsync();
    // }

    // public async Task<int> AddTodo(Models.Todo todo)
    // {
    //     await _context.Todos.AddAsync(todo);
    //     await _context.SaveChangesAsync();

    //     return todo.Id;
    // }

    public async Task<(bool IsSuccess, IEnumerable<Models.Todo> Todos, string ErroMessage)> GetTodosAsync()
    {
        try
        {
            var todos = await _dbContext.Todos.ToListAsync();
            if(todos!=null && todos.Any())
            {
                var result = _mapper.Map<IEnumerable<Db.Todo>, IEnumerable<Models.Todo>>(todos);
                return(true, result, null);
            }
            return(false, null, "Not found.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return(false, null, ex.Message);
        }
    }
}
