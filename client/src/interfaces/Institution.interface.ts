import { Survey } from "./Survey.interface"
import { User } from "./User.interface"

export interface Institution {
    _id: string
    users: User[]
    serveys: Survey[]
    name: string
    nation: string
    updatedAt: Date
    createdAt: Date
}