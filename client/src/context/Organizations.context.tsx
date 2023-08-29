import { createContext, useContext, useEffect, useState } from "react"
import { useAuthContext } from "./Auth.context"
import { organizationRouter } from "../router"
import { Organization } from "../interfaces/Role.interface"

interface OrganizationType {
    institutions: Organization[]
    setInstitutions: React.Dispatch<React.SetStateAction<Organization[]>>
    institutionSelected: any
    setInstitutionSelected: React.Dispatch<React.SetStateAction<undefined>>
}

export const OrganizationContext = createContext<OrganizationType>({} as OrganizationType)

export const OrganizationProvider = (props: any) => {
    const {isAuth, user, token} = useAuthContext()
    const [institutions, setInstitutions] = useState<Organization[]>([])
    const [institutionSelected, setInstitutionSelected] = useState()

    useEffect(() => {
        if (isAuth) {
            if (user && user.roles.length > 0)
            if (user.roles[0].name === 'SuperAdmin') {
                getAllOrgs()
            }
        }
    },[isAuth])

    useEffect(() => {
        console.log(institutions)
    },[institutions])

    const getAllOrgs = async () => {
        const resolve = await organizationRouter.readAllOrgs()
        setInstitutions(resolve.data)
    }

    const value = {
        institutions,
        setInstitutions,
        institutionSelected,
        setInstitutionSelected
    }

    return (
        <OrganizationContext.Provider value={value} >
            {props.children}
        </OrganizationContext.Provider>
    )
}

export const useOrganizationContext = () => useContext(OrganizationContext)