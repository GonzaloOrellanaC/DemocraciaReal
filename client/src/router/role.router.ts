import axios from "axios";
import { Role } from "../interfaces/Role.interface";

const createRole = async (role: Role, global: boolean) => {
    /* console.log(role, global) */
    const response = await axios.post(global ? '/api/roles/createGlobalRole' : '', role)
    return response.data
}

const getRolesAdmin = async () => {
    const response = await axios.get(`/api/roles/getRolesAdmin`)
    return response.data
}

const getRolesByOrg = async (orgId: string) => {
    /* console.log(orgId) */
    const response = await axios.post(`/api/roles/getRolesById/organization/`, {organizationId: orgId})
    return response.data
}

const roleRouter = {
    createRole,
    getRolesAdmin,
    getRolesByOrg
}

export default roleRouter
