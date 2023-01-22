namespace ToDo.Profiles;

public class TodoProfile : AutoMapper.Profile
{
    public TodoProfile()
    {
        CreateMap<Db.Todo, Models.Todo>();
        CreateMap<Models.Todo, Db.Todo>();
    }
}