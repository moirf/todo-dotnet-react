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
    private ApplicationDbContext _context;
    private readonly TodosDbContext _dbContext;
    private readonly ILogger<TodoRepository> _logger;
    private readonly IMapper _mapper;
    public TodoRepository(TodosDbContext dbContext, ILogger<TodoRepository> logger, IMapper mapper)
    {
        _dbContext = dbContext;
        _logger = logger;
        _mapper = mapper;
    }

    public IEnumerable<Models.Todo> GetTodos()
    {
        string userId = "1"; //[ToDo] get it from accesstoken
        return _context.Todos
            .Where(todo => todo.AccountId.Equals(userId))
            .OrderByDescending(todo => todo.DueDate);
    }

    public async Task<Models.Todo> GetTodo(int todoId)
    {
        return await _context.Todos.FindAsync(todoId);
    }

    public async Task UpdateTodos(IEnumerable<Models.Todo> todos)
    {
        _context.Todos.UpdateRange(todos);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTodo(int id)
    {
        Models.Todo todo = await _context.Todos.FindAsync(id);
        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();
    }

    public async Task<int> AddTodo(Models.Todo todo)
    {
        await _context.Todos.AddAsync(todo);
        await _context.SaveChangesAsync();

        return todo.Id;
    }

    public Task<(bool IsSuccess, IEnumerable<Models.Todo> Todos, string ErroMessage)> GetTodosAsync()
    {
        throw new NotImplementedException();
    }
}
