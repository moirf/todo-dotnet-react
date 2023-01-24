using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ToDo.Db;
using ToDo.Profiles;
using ToDo.Repositories;

namespace ToDo.Api.Tests
{
    public class TodoServiceTest
    {
        [Fact]
        public async Task GetTodosReturnsAllTodos()
        {
            var options = new DbContextOptionsBuilder<TodosDbContext>()
                .UseInMemoryDatabase(nameof(GetTodosReturnsAllTodos))
                .Options;
            var dbContext = new TodosDbContext(options);
            CreateMockTodos(dbContext);

            var todoProfile = new TodoProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(todoProfile));
            var mapper = new Mapper(configuration);
            var todoRepository = new TodoRepository(dbContext, null, mapper);

            var (IsSuccess, Todos, ErroMessage) = await todoRepository.GetTodosAsync();

            Assert.True(IsSuccess);
            Assert.True(Todos.Any());
            Assert.Null(ErroMessage);
        }

        [Fact]
        public async Task GetTodoReturnsTodoUsingValidId()
        {
            var options = new DbContextOptionsBuilder<TodosDbContext>()
                .UseInMemoryDatabase(nameof(GetTodoReturnsTodoUsingValidId))
                .Options;
            var dbContext = new TodosDbContext(options);
            CreateMockTodos(dbContext);

            var todoProfile = new TodoProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(todoProfile));
            var mapper = new Mapper(configuration);
            var todoRepository = new TodoRepository(dbContext, null, mapper);

            var todo = await todoRepository.GetTodoAsync(1);

            Assert.True(todo.IsSuccess);
            Assert.NotNull(todo.Todo);
            Assert.True(todo.Todo.Id == 1);
            Assert.Null(todo.ErroMessage);
        }

        [Fact]
        public async Task GetTodoReturnsTodoUsingInvalidId()
        {
            var options = new DbContextOptionsBuilder<TodosDbContext>()
                .UseInMemoryDatabase(nameof(GetTodoReturnsTodoUsingInvalidId))
                .Options;
            var dbContext = new TodosDbContext(options);
            CreateMockTodos(dbContext);

            var todoProfile = new TodoProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(todoProfile));
            var mapper = new Mapper(configuration);
            var todoRepository = new TodoRepository(dbContext, null, mapper);

            var todo = await todoRepository.GetTodoAsync(-1);

            Assert.False(todo.IsSuccess);
            Assert.Null(todo.Todo);
            Assert.NotNull(todo.ErroMessage);
        }

        private void CreateMockTodos(TodosDbContext dbContext)
        {
            for (int i = 1; i <= 10; i++)
            {
                dbContext.Todos.Add(new Todo()
                {
                    Id = i,
                    Task = $"Todo Task {i}.",
                    DueDate = DateTime.Now.AddDays(i),
                    Completed = false
                });
            }
            dbContext.SaveChanges();
        }
    }
}