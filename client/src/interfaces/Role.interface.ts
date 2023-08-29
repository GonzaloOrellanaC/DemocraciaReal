import { LatLng, Project } from "./Project.interface"
import { User } from "./User.interface"

export interface Organization {
    _id: string
    name: string
    description?: string
    state: boolean
    contracts: Contract[]
    imageBgLoginUrl: string[]
    themes: string[]
    logoUrl: string
    idOrg: number
    nation: string
    region: string
    city: string
    address: string
    phone: string
    email: string
    coords: LatLng
    users: User[]
    createdAt: string
    updatedAt: string
}

export interface Contract {
    _id: string
    init: Date
    finish: Date
    contractDescription: string
    projects: Project[]
}

export interface Role {
    _id: string
    name: string
    resources: object
    organizationId: Organization
    description: string
}

export interface RoleId {
    _id: string
}
