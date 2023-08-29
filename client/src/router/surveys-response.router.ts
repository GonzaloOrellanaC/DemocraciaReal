import axios from 'axios'
import { SurveyResponse } from '../interfaces/Survey.interface'

const saveSurveyResponse = async (responseToSend: SurveyResponse) => {
    const response = await axios.post('/api/survey-response/saveSurveyResponse', {data: responseToSend})
    return response.data
}

const getSurveyResponseBySurveyId = async (surveyId: string) => {
    const response = await axios.post('/api/survey-response/getSurveyResponseBySurveyId', {_id: surveyId, userId: window.localStorage.getItem('_id')})
    return response.data
}

const getSurveyDataBySurveyId = async (surveyId: string) => {
    const response = await axios.post('/api/survey-response/getSurveyDataBySurveyId', {_id: surveyId})
    return response.data
}

export default {
    saveSurveyResponse,
    getSurveyResponseBySurveyId,
    getSurveyDataBySurveyId
}