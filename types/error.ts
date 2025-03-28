export interface FetchError extends Error {
    info?: string,
    status?: string
}