import { createContext, useContext, useEffect, useState } from "react"
import { useAuthContext } from "./Auth.context"
import { User } from "../interfaces/User.interface"
import { usersRouter } from "../router"

interface UsersType {
    users: User[]
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
    userSelected: User | undefined
    setUserSelected: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const UsersContext = createContext<UsersType>({} as UsersType)

export const UsersProvider = (props: any) => {
    const {isAuth, user, token} = useAuthContext()
    const [users, setUsers] = useState<User[]>([])
    const [userSelected, setUserSelected] = useState<User>()

    useEffect(() => {
        if (isAuth) {
            if (user && user.roles.length > 0)
            if (user.roles[0].name === 'SuperAdmin') {
                getAllUsers()
            }
        }
    },[isAuth])

    const getAllUsers = async () => {
        const resolve = await usersRouter.getUsers()
        setUsers(resolve.data)
    }

    const value = {
        users,
        setUsers,
        userSelected,
        setUserSelected
    }

    return (
        <UsersContext.Provider value={value} >
            {props.children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => useContext(UsersContext)