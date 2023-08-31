import { createContext, useContext, useEffect, useState } from "react"
import { useAuthContext } from "./Auth.context"
import { organizationRouter, roleRouter } from "../router"
import { Organization, Role } from "../interfaces/Role.interface"

interface RolesType {
    roles: Role[]
    setRoles: React.Dispatch<React.SetStateAction<Role[]>>
    roleSelected: Role | undefined
    setRoleSelected: React.Dispatch<React.SetStateAction<Role | undefined>>
    getRolesByOrg: (org: Organization) => Promise<any>
}

export const RolesContext = createContext<RolesType>({} as RolesType)

export const RolesProvider = (props: any) => {
    const {isAuth, user, token} = useAuthContext()
    const [roles, setRoles] = useState<Role[]>([])
    const [roleSelected, setRoleSelected] = useState<Role>()

    useEffect(() => {
        if (isAuth) {
            if (user && user.roles.length > 0)
            if (user.roles[0].name === 'SuperAdmin') {
                getAllRoles()
            }
        }
    },[isAuth])

    const getAllRoles = async () => {
        const resolve = await roleRouter.getRolesAdmin()
        setRoles(resolve.data)
    }

    const getRolesByOrg = async (org: Organization) => {
        const response = await roleRouter.getRolesByOrg(org._id)
        return response.data
    }

    const value = {
        roles,
        setRoles,
        roleSelected,
        setRoleSelected,
        getRolesByOrg
    }

    return (
        <RolesContext.Provider value={value} >
            {props.children}
        </RolesContext.Provider>
    )
}

export const useRolesContext = () => useContext(RolesContext)