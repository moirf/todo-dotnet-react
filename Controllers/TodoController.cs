using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ToDo.Models;
using ToDo.Repositories;
using ToDo.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private ITodoRepository _repository;
        private IConfiguration _config;
        private IAccountService _accountService;

        public TodoController(ITodoRepository repository, IConfiguration configuration, IAccountService accountService)
        {
            _config = configuration;
            _repository = repository;
            _accountService = accountService;
        }

        [HttpGet("")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<IEnumerable<TodoViewModel>>> GetTodos()
        {
            try
            {
                var userId = await _accountService.HandleUserAsync(User);

                var todos =_repository.GetTodos(userId);
                var todoViewModels = todos
                    .OrderBy(todo => todo.ColumnIndex)
                    .Select(todo => new TodoViewModel { 
                        Id = todo.Id, 
                        Priority = todo.Priority, 
                        Task = todo.Task, 
                        Completed = todo.Completed, 
                        DueDate = $"{todo.DueDate:yyyy/MM/dd}" });

                return Ok(todoViewModels);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Fail", Message = ex.Message });
            }
        }

        [HttpPut("")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> PutTodos([FromBody] IEnumerable<Todo> todos)
        {
            try
            {
                var userId = await _accountService.HandleUserAsync(User);
                todos.ToList().ForEach(todo =>
                {
                    todo.AccountId = userId;                        
                });

                await _repository.UpdateTodos(todos);
                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Fail", Message = ex.Message });
            }
        }

        [HttpDelete("{todoId}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> DeleteTodo(int todoId)
        {
            try
            {
                var userId = await _accountService.HandleUserAsync(User);
                var todo = await _repository.GetTodo(todoId);

                if (todo == null)
                    throw new ArgumentException($"todo id: {todoId} was not found in database");
                if (!todo.AccountId.Equals(userId))
                    throw new ArgumentException($"Todo was not associated with logged in user: {userId}");

                await _repository.DeleteTodo(todoId);
                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Fail", Message = ex.Message });
            }
        }

        [HttpPost("")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<int>> PostTodo([FromBody] Todo todo)
        {
            try
            {
                var userId = await _accountService.HandleUserAsync(User);
                todo.AccountId = userId;
                var todoId = await _repository.AddTodo(todo);
                return Ok(todoId);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Fail", Message = ex.Message });
            }
        }
    }
}
