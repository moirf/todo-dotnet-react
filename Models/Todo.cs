using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace React_Sample.Models
{
    public enum TodoPriority
    {
        Low = 0,
        Med = 1,
        High = 2
    }

    public class Todo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Task { get; set; }
        public DateTime DueDate { get; set; }
        public bool Completed { get; set; }
        public string AccountId { get; set; }
        public int ColumnIndex { get; set; }
        public TodoPriority Priority { get; set; }

        public virtual Account Account { get; set; }
    }
}
