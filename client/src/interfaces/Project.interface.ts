import { User } from "./User.interface"

export interface Project {
    _id: string
    name: string
    typeProduct: string
    segments: Segment[]
    criticalityAlerts: ProjectAlert[]
    state: boolean
}

export interface Segment {
    _id: string
    unit: number
    inspectFrequency: string
    areaDensity: number
    typeAreaDensity: string
    landUse: string
    trajectoryState: boolean
    trajectory: LatLng[]
    state: boolean
    personInCharge: User[]
    supervisor: User[]
    operator: User[]
}

export interface LatLng {
    lat: number
    lng: number
    alt?: number
}

export interface ProjectAlert {
    _id: string
    category: string
    distanceToAsset: number
    riskLevel: string
    state: boolean
}