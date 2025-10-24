export type url = `/${string}`

export type path = `./${string}` | `../${string}`

export type Route = {
    [key: url]: path
}