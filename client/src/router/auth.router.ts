import axios from 'axios'

const login = async (email: string, password: string) => {
    const data = {
        email: email,
        password: password
    }
    const response = await axios.post('/api/login', data)
    return response.data
}

const restorePassword = async (email: string) => {
    const response = await axios.post('/api/forgot-password', {email: email})
    return response.data
}

const resetPassword = async (token: string, password: string) => {
    const response = await axios.post('/api/reset-password', {token: token, password: password})
    return response.data
}

const authRouter = {
    login,
    restorePassword,
    resetPassword
}

export default authRouter
