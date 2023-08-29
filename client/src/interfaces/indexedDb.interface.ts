import { User } from "./User.interface"

export interface UserDatabase {
    message: string
    database: IDBDatabase
    error: Event | null
    state: string
}

export interface UserIndexedDatabase {
    user: User
    state: boolean
    error: Event | null
}