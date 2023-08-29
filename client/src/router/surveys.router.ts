import axios from 'axios'
import { Organization } from '../interfaces/Role.interface'
import { Survey } from '../interfaces/Survey.interface'

const createSurvey = async (survey: Survey) => {
    const response = await axios.post('/api/survey/createSurvey', survey)
    return response.data
}

const editSurvey = async (survey: Survey) => {
    const response = await axios.post('/api/survey/editSurvey', survey)
    return response.data
}

const getSurveys = async () => {
    const response = await axios.get('/api/survey/getSurveys')
    return response.data
}

const getSurveysByAdmins = async (organizationId: string) => {
    const response = await axios.post('/api/survey/getSurveysByAdmins', {organizationId: organizationId})
    return response.data
}

const getSurveyById = async (_id: string) => {
    const response = await axios.post('/api/survey/getSurveyById', {_id:_id})
    return response.data
}

const getSurveyByOrganizationId = async (_id: string) => {
    const response = await axios.post('/api/survey/getSurveyByOrganizationId', {_id:_id})
    return response.data
}

const removeSurveyById = async (_id: string) => {
    const response = await axios.post('/api/survey/removeSurveyById', {_id:_id})
    return response.data
}

export default {
    createSurvey,
    editSurvey,
    getSurveys,
    getSurveysByAdmins,
    getSurveyById,
    getSurveyByOrganizationId,
    removeSurveyById
}