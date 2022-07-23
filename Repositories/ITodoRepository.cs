using React_Sample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Sample.Repositories
{
    public interface ITodoRepository
    {
        public IEnumerable<Todo> GetTodos(string userId);
        public Task<Todo> GetTodo(int todoId);
        public Task UpdateTodos(IEnumerable<Todo> todos);
        public Task DeleteTodo(int todoId);
        public Task<int> AddTodo(Todo todo);
    }
}
