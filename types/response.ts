export type GenericResponse = {
    status_name?: string
    status_code: string | number
    status_message: string
    result?: Object | [] | {}
    errors?: string | string [] | object
    error_title?: string
}