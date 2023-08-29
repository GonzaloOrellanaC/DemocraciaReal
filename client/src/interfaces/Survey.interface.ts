import { Organization } from "./Role.interface"
import { User } from "./User.interface"

export interface Survey {
    _id: string
    idSurvey: number
    description: string
    organization: Organization[] | string[]
    createdAt: Date
    updatedAt: Date
    createdBy?: User | string
    updatedBy?: User | string
    state: boolean
    users: User[]
    questions: Question[]
    done?: boolean
}

export interface Question {
    _id: string
    description: string
    alternatives: Alternative[]
    multiple: boolean
    bgColor?: string
}

/* export interface QuestionResponse {
    alternatives: AlternativeResponse[]
    multiple: boolean
} */

export interface Alternative {
    _id: string
    description: string
    selected?: boolean
}

/* export interface AlternativeResponse {
    selected?: boolean
} */

export interface SurveyResponse {
    _id: string
    survey: string | Question
    createdBy: string | User
    updatedBy: string | User
    responses: ResponseSurveyResponse[]
}

export interface ResponseSurveyResponse {
    questionNumber: number,
    response: any[]
}