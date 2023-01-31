export default class DateParser {

    static parseFromTaskString(dateString: string) {
        const dateFields = dateString.split('/')
        const day = parseInt(dateFields[0])
        const month = parseInt(dateFields[1]) - 1
        const year = parseInt(dateFields[2])

        const tempDate = new Date(year, month, day)
        const dateMonth = tempDate.getMonth()
        const dateDay = tempDate.getDate()
        if (!tempDate || (dateMonth !== month) || (dateDay !== day))
            throw new Error("Invalid date")

        return tempDate
    }

    static parseFromInput(dateString: string) {
        const dateFields = dateString.split('-')
        const year = parseInt(dateFields[0])
        const month = parseInt(dateFields[1]) - 1
        const day = parseInt(dateFields[2])
        
        const tempDate = new Date(year, month, day)
        const dateMonth = tempDate.getMonth()
        const dateDay = tempDate.getDate()
        if (!tempDate || (dateMonth !== month) || (dateDay !== day))
            throw new Error("Invalid date")

        return tempDate
    }

    static getDateString(date: Date) {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        let res = '${year}'
        if (month < 10)
            res  += '0' + month.toString();
        if (day < 10)
            res += '0' + day.toString();

        return res;
    }

    static getCurrentDateString() {
        return this.getDateString(new Date())
    }
}