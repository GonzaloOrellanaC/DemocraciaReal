import { createContext, useContext, useEffect, useState } from 'react'
import { AuthType } from '../interfaces/Auth.interface'
import { useHistory } from 'react-router'
import { authRouter, organizationRouter } from '../router'
import { User } from '../interfaces/User.interface'
import { Organization } from '../interfaces/Role.interface'

export const AuthContext = createContext<AuthType>({} as AuthType)

export const AuthProvider = (props: any) => {
    const [isAuth, setIsAuth] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)
    const [user, setUser] = useState<User>()
    const [userId, setUserId] = useState<string>('')
    const [totalDocsByMonth, setTotalDocsByMonth] = useState(0)
    const [token, setToken] = useState('')
    const [initials, setInitials] = useState('')
    const [loading, setLoading] = useState(false)
    const [isPremium, setIsPremium] = useState(false)
    const [org, setOrg] = useState<Organization>()

    const history = useHistory()

    useEffect(() => {
        setIsAuth(localStorage.getItem('isAuth') ? true : false)
        /* const isAuthCache = localStorage.getItem('isAuth')
        if (isAuthCache) {
            setIsAuth(true)
        } */
        if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
        }
    }, [])

    useEffect(() => {
        console.log(isDesktop)
    },[isDesktop])

    useEffect(() => {
        console.log(isAuth)
        if (isAuth===true) {
            const tokenSaved = localStorage.getItem('token')
            if (tokenSaved) {
                setToken(tokenSaved)
            }
            const userIdSaved = localStorage.getItem('userId')
            if (userIdSaved) {
                setUserId(userIdSaved)
            }
            const userCache = localStorage.getItem('user')
            if (userCache) {
                setUser(JSON.parse(userCache))
            }
        } else {
            getOrgNoAuth()
        }
    }, [isAuth])

    useEffect(() => {
        console.log(user)
        if (user) {
            setInitials(`${user.name[0]}${user.lastName[0]}`)
            setTotalDocsByMonth(user.totalDocsByMonth)
            setIsPremium(user.isPremium)
            setUserId(user._id)
            if (user.organization && (user.organization.length > 0)) {
                setOrg(user.organization[0])
            } else {

                /* const orgCache = {} as Organization
                orgCache._id = '64ee5dd60149073ae51c5124' */
                /* setOrg(orgCache) */
            }
        } else {
            const userCache = localStorage.getItem('user')
            if (userCache) {
                setInitials(`${JSON.parse(userCache).name[0]}${JSON.parse(userCache).lastName[0]}`)
                setTotalDocsByMonth(JSON.parse(userCache).totalDocsByMonth)
                setIsPremium(JSON.parse(userCache).isPremium)
                setUserId(JSON.parse(userCache)._id)
                setIsAuth(true)
            }
        }
    }, [user])

    const getOrgNoAuth = async () => {
        const orgCache = await organizationRouter.getOrgById('64ee5dd60149073ae51c5124')
        setOrg(orgCache.data)
    }

    const login = async (email: string, password: string) => {
        setLoading(true)
        try {
            const response = await authRouter.login(email, password)
            setUser(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
            setToken(response.token)
            localStorage.setItem('token', response.token)
            localStorage.setItem('userId', response.data._id)
            setIsAuth(true)
            localStorage.setItem('isAuth', 'true')
            console.log(response)
            setLoading(false)
            /* history.push('/home') */
            return response
        } catch (error) {
            setLoading(false)
            return error
        }
    }

    /* const initForgotPassword = async (email: string) => {
        setLoading(true)
        try {
            const response = await authRouter.initForgotPassword(email)
            console.log(response)
            setLoading(false)
            return {state: true, data: ''}
        } catch (error: any) {
            setLoading(false)
            console.log(error.response.data.message)
            return {state: false, data: error.response.data.message}
        }
    }
 */
    const restorePassword = async (password: string, token: string) => {
        setLoading(true)
        try {
            const response = await authRouter.restorePassword(password/* , token */)
            console.log(response)
            setLoading(false)
            return {state: true, data: ''}
        } catch (error: any) {
            setLoading(false)
            console.log(error.response.data.message)
            return {state: false, data: error.response.data.message}
        }
    }

    const logout = () => {
        setIsAuth(false)
        localStorage.clear()
    }

    const value = {
        user,
        isAuth,
        initials,
        login,
        /* initForgotPassword, */
        restorePassword,
        logout,
        isDesktop,
        loading,
        token,
        totalDocsByMonth,
        isPremium,
        userId,
        org
    }

    return (
        <AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)