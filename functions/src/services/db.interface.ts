export interface IDb {
    addValue(value: object): any
    setValue(key: string, value: object): any
    readValue(key: string): any
}