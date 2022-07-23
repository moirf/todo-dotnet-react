import TodoPriority from './TodoPriority'
import DateParser from './DateParser'

export default class TodoInfoHandler {
    static taskSelector = "task:"
    static dueDateSelector = "duedate:"
    static prioritySelector = "priority:"

    static validate(todoInfo) {
        const results = todoInfo.split('#')
        let task
        try {
            results.forEach(result => {
                const cleanResult = result.trim().toLowerCase()
                if (cleanResult.startsWith(TodoInfoHandler.taskSelector)) {
                    task = cleanResult.slice(TodoInfoHandler.taskSelector.length, cleanResult.length).trim()
                }
                else if (cleanResult.startsWith(TodoInfoHandler.dueDateSelector)) {
                    const dueDateString = cleanResult.slice(TodoInfoHandler.dueDateSelector.length, cleanResult.length).trim()
                    const tempDate = DateParser.parseFromTaskString(dueDateString)

                    if (tempDate.getTime() < Date.now())
                        throw new Error("Invalid date")
                }
                else if (cleanResult.startsWith(TodoInfoHandler.prioritySelector)) {
                    const priorityString = cleanResult.slice(TodoInfoHandler.prioritySelector.length, cleanResult.length).trim()
                    switch (priorityString) {
                        case "3":
                        case "2":
                        case "1":
                            break
                        default: throw new Error("Invalid priority")
                    }                     
                }
                else { throw new Error("Invalid field") }
            })
            if (!task)
                throw new Error("Task is required")
            return null
        } catch (err) { return err }
    }

    static parse(todoInfo) {
        const results = todoInfo.split('#')

        let task
        let dueDate
        let priority

        try {
            results.forEach(result => {

                const cleanResult = result.trim().toLowerCase()
                if (cleanResult.startsWith(this.taskSelector)) {
                    task = cleanResult.slice(this.taskSelector.length, cleanResult.length).trim()
                }
                else if (cleanResult.startsWith(this.dueDateSelector)) {
                    const dueDateString = cleanResult.slice(this.dueDateSelector.length, cleanResult.length).trim()
                    const tempDate = DateParser.parseFromTaskString(dueDateString)

                    if (tempDate.getTime() < Date.now())
                        throw new Error("Invalid date")

                    dueDate = tempDate
                }
                else if (cleanResult.startsWith(this.prioritySelector)) {
                    let priorityString = cleanResult.slice(this.prioritySelector.length, cleanResult.length).trim()
                    switch (priorityString) {
                        case "3":
                            priority = TodoPriority.LOW
                            break
                        case "2":
                            priority = TodoPriority.MED
                            break
                        case "1":
                            priority = TodoPriority.HIGH
                            break
                        default:
                            throw new Error("Invalid priority")
                    }
                }
                else {
                    throw new Error("Invalid field")
                }
            })

            if (!dueDate)
                dueDate = new Date(Date.now())

            if (!priority)
                priority = TodoPriority.LOW

            if (!task)
                throw new Error("Task is required")

            return { task, dueDate, priority, error: null }

        } catch (error) {
            return { task, dueDate, priority, error }
        }
    }
}



