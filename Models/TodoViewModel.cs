using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Models
{
    public class TodoViewModel
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public string DueDate { get; set; }
        public bool Completed { get; set; }
        public TodoPriority Priority { get; set; }
    }
}
