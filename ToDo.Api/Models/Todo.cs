namespace ToDo.Models;

public enum Priority
{
    Low = 0,
    Med = 1,
    High = 2
}

public class Todo
{
    // [Key]
    // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Task { get; set; }
    public DateTime DueDate { get; set; }
    public bool Completed { get; set; }
}