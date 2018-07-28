export interface IDb {
    addValue(value: object): any
    readValue(key: string): any
}