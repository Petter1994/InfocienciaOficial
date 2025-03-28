export const normalizeDate = (date: Date) => {
    const tempDate: Date = new Date(date);
    const day: number = tempDate.getDate()
    const month: number = tempDate.getMonth() + 1
    const year: number = tempDate.getFullYear()

    const dayFormated: string = day < 10 ? '0' + day : day.toString();
    const monthFormated: string = month < 10 ? '0' + month : month.toString();

    return `${dayFormated}-${monthFormated}-${year}`
}

export const normalizeHour = (date: Date) => {
    const tempDate: Date = new Date(date);
    const hour: number = tempDate.getHours()
    const minutes: number = tempDate.getMinutes()
    const seconds: number = tempDate.getSeconds()

    return `${hour}:${minutes}:${seconds}`
}
