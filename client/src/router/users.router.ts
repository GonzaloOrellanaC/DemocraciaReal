import axios from 'axios'
import { User } from '../interfaces/User.interface'

const createUser = async (user: User) => {
    const response = await axios.post('/api/users/createUser', user)
    return response.data
}

const getUsers = async () => {
    const response = await axios.get('/api/users/getUsers')
    return response.data
}

const getAdminUsers = async () => {
    const response = await axios.get('/api/users/getUsers')
    return response.data
}

const getAllSystemUser = async () => {
    const response = await axios.get('/api/users/getAllSystemUser')
    return response.data
}

const getUsersByOrg = async (_id: string) => {
    const response = await axios.post('/api/users/getUsersByOrg', {orgId: _id})
    return response.data
}

const getUserById = async (id: string) => {
    const response = await axios.post('/api/users/getUserById', {id: id})
    return response.data
}

const editUser = async (user: User) => {
    const response = await axios.post('/api/users/editUser', user)
    return response.data
}

const deleteUser = async (user: User) => {
    const response = await axios.post('/api/users/deleteUser', {id: user._id})
    return response.data
}

const usersRouter = {
    createUser,
    editUser,
    getUsers,
    getUserById,
    getAllSystemUser,
    getUsersByOrg,
    deleteUser
}

export default usersRouter