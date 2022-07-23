using React_Sample.Data;
using React_Sample.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace React_Sample.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private ApplicationDbContext _context;
        public TodoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Todo> GetTodos(string userId)
        {
            return _context.Todos
                .Where(todo => todo.AccountId.Equals(userId))
                .OrderByDescending(todo => todo.DueDate);
        }

        public async Task<Todo> GetTodo(int todoId)
        {
            return await _context.Todos.FindAsync(todoId);
        }

        public async Task UpdateTodos(IEnumerable<Todo> todos)
        {
            _context.Todos.UpdateRange(todos);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTodo(int id)
        {
            Todo todo = await _context.Todos.FindAsync(id);
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
        }

        public async Task<int> AddTodo(Todo todo)
        {
            await _context.Todos.AddAsync(todo);
            await _context.SaveChangesAsync();

            return todo.Id;
        }
    }
}
