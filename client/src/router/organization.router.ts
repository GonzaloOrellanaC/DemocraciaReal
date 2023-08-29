import axios from "axios";
import { Organization } from "../interfaces/Role.interface";

const createOrganization = async (organization: Organization) => {
    const response = await axios.post('/api/organizations/createOrg', organization)
    return response.data
}

const editOrganization = async (organization: Organization) => {
    const response = await axios.post('/api/organizations/editOrg', organization)
    return response.data
}

const readAllOrgs = async () => {
    const response = await axios.get('/api/organizations/getOrganizations')
    return response.data
}

const getOrgById = async (id: string) => {
    const response = await axios.post('/api/organizations/getOrgById', {_id:id})
    return response.data
}

const organizationRouter = {
    createOrganization,
    readAllOrgs,
    getOrgById,
    editOrganization
}

export default organizationRouter
