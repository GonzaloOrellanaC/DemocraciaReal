import { Institution } from "./Institution.interface"
import { Organization, Role } from "./Role.interface"

export interface User {
    _id: string
    idUser: number
    nickName: string
    name: string
    lastName: string
    secondLastName: string
    run: string
    phone: string
    direction: string
    region: string
    city: string
    nacionality: string
    email: string
    password: string,
    emailVerifiedAt: Date
    state: boolean
    profileImage: string
    roles: Role[]
    organization: Organization[]
    createdAt: Date
    updatedAt: Date
    totalDocsByMonth: any
    isPremium: any
}