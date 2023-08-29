import axios from "axios"

const loadPreUserExcel = async (excel: Blob) => {
    const formData = new FormData()
    formData.append('preUsers', excel)
    const config = {
        headers: { "Content-Type": "multipart/form-data" },
    }
    const response = await axios.post('/api/preUsers/loadPreUserExcel', formData, config)
    return response
}

const getPreUsers = async () => {
    const response = await axios.get('/api/preUsers/getPreUsers')
    return response.data
}

const findPreUserByRun = async (run: string) => {
    const response = await axios.post('/api/preUsers/findPreUserByRun', {run: run})
    return response
}

export default {
    loadPreUserExcel,
    getPreUsers,
    findPreUserByRun
}