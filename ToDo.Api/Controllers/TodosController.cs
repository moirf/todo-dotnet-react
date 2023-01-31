using Microsoft.AspNetCore.Cors;
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
    [EnableCors("TodoApiCorsPolicy")]
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

    [HttpGet("{id}")]
    //[Authorize(Roles = "User, Admin")]
    public async Task<ActionResult> GetTodoAsync(int id)
    {
        var result = await _todoRepository.GetTodoAsync(id);
        if (result.IsSuccess)
        {
            return Ok(result.Todo);
        }
        return NotFound();
    }

    [HttpPut]
    //[Authorize(Roles = "User, Admin")]
    public async Task<ActionResult> UpdateTodosAsync([FromBody] IEnumerable<Models.Todo> todos)
    {

        // var userId = await _accountService.HandleUserAsync(User);
        // todos.ToList().ForEach(todo =>
        // {
        //     todo.AccountId = userId;
        // });
        var result = await _todoRepository.UpdateTodosAsync(todos);
        if (result.IsSuccess)
        {
            return Ok(result.Todos);
        }
        else
        {
            return NotFound(result.ErroMessage);
        }

    }

    [HttpDelete("{id}")]
    //[Authorize(Roles = "User, Admin")]
    public async Task<IActionResult> DeleteTodoAsync(int id)
    {
        var result = await _todoRepository.DeleteTodoAsync(id);
        if (result.IsSuccess)
        {
            return Ok($"Todo deleted with Id => {id}");
        }
        else
        {
            return NotFound(result.ErroMessage);
        }
    }

    [HttpPost]
    //[Authorize(Roles = "User, Admin")]
    public async Task<ActionResult> AddTodosAsync([FromBody] IEnumerable<Models.Todo> todos)
    {
        var result = await _todoRepository.AddTodosAsync(todos);
        if (result.IsSuccess)
        {
            return Ok(result.Todos);
        }
        else
        {
            return NotFound(result.ErroMessage);
        }
    }
}