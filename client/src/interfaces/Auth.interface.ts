import { Organization } from "./Role.interface"
import { User } from "./User.interface"

export interface AuthType {
    user: User | undefined
    isAuth: boolean
    initials: string
    login: (email: string, password: string) => Promise<boolean>
/*     initForgotPassword: (email: string) => Promise<{state: boolean, data: string}>
 */    restorePassword: (password: string, token: string) => Promise<{state: boolean, data: string}>
    logout: () => void
    isDesktop: boolean
    loading: boolean
    token: string
    totalDocsByMonth: number
    isPremium: boolean
    userId: string
    org?: Organization
}