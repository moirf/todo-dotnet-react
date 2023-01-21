using Microsoft.AspNetCore.Mvc;
using ToDo.Repositories;

namespace ToDo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private ITodoRepository _todoRepository;
    private IConfiguration _config;
    //private IAccountService _accountService;

    public TodosController(ITodoRepository todoRepository, IConfiguration configuration)
    {
        _config = configuration;
        _todoRepository = todoRepository;
        //_accountService = accountService;
    }

    [HttpGet("/ServiceCheck")]
    public ActionResult GetServiceCheck()
    {
        return Ok("Sevice working!!");
    }

    [HttpGet]
    //[Authorize(Roles = "User, Admin")]
    public async Task<ActionResult> GetTodosAsync()
    {
        var result = await _todoRepository.GetTodosAsync();
        if (result.IsSuccess)
        {
            return Ok(result.Todos);
        }
        return NotFound();
    }

    // [HttpPut("")]
    // //[Authorize(Roles = "User, Admin")]
    // public async Task<IActionResult> PutTodos([FromBody] IEnumerable<Todo> todos)
    // {
    //     try
    //     {
    //         var userId = await _accountService.HandleUserAsync(User);
    //         todos.ToList().ForEach(todo =>
    //         {
    //             todo.AccountId = userId;
    //         });

    //         await _repository.UpdateTodos(todos);
    //         return Ok();
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Fail", Message = ex.Message });
    //     }
    // }

    // [HttpDelete("{todoId}")]
    // //[Authorize(Roles = "User, Admin")]
    // public async Task<IActionResult> DeleteTodo(int todoId)
    // {
    //     try
    //     {
    //         var userId = await _accountService.HandleUserAsync(User);
    //         var todo = await _repository.GetTodo(todoId);

    //         if (todo == null)
    //             throw new ArgumentException($"todo id: {todoId} was not found in database");
    //         if (!todo.AccountId.Equals(userId))
    //             throw new ArgumentException($"Todo was not associated with logged in user: {userId}");

    //         await _repository.DeleteTodo(todoId);
    //         return Ok();
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Fail", Message = ex.Message });
    //     }
    // }

    // [HttpPost("")]
    // //[Authorize(Roles = "User, Admin")]
    // public async Task<ActionResult<int>> PostTodo([FromBody] Todo todo)
    // {
    //     try
    //     {
    //         var userId = await _accountService.HandleUserAsync(User);
    //         todo.AccountId = userId;
    //         var todoId = await _repository.AddTodo(todo);
    //         return Ok(todoId);
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Fail", Message = ex.Message });
    //     }
    // }
}