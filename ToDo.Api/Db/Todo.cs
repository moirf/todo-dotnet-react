namespace ToDo.Db;

public class Todo
{
    public int Id { get; set; }
    public string Task { get; set; }
    public DateTime DueDate { get; set; }
    public bool Completed { get; set; }
}