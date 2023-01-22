using ToDo.Models;

namespace ToDo.Repositories;

public interface ITodoRepository
{
    //public IEnumerable<Todo> GetTodos();

    Task<(bool IsSuccess, IEnumerable<Todo> Todos, string ErroMessage)> GetTodosAsync();
    Task<(bool IsSuccess, Todo Todo, string ErroMessage)> GetTodoAsync(int id);
    Task<(bool IsSuccess, IEnumerable<Todo> Todos, string ErroMessage)> UpdateTodosAsync(IEnumerable<Models.Todo> todos);
    Task<(bool IsSuccess, string ErroMessage)> DeleteTodoAsync(int id);
    Task<(bool IsSuccess, IEnumerable<Todo> Todos, string ErroMessage)> AddTodosAsync(IEnumerable<Models.Todo> todos);
}