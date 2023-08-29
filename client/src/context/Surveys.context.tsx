import { createContext, useContext, useEffect, useState } from "react"
import { useAuthContext } from "./Auth.context"
import { surveysResponseRouter, surveysRouter } from "../router"
import { Survey } from "../interfaces/Survey.interface"

interface SurveysType {
    surveys: Survey[]
    setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>
    surveySelected: Survey | undefined
    setSurveySelected: React.Dispatch<React.SetStateAction<Survey | undefined>>
    mySurveys: Survey[]
    setSurveyByOrganizationId: React.Dispatch<React.SetStateAction<Survey[]>>
    removeSurveyById: (_id: string) => void
}

export const SurveysContext = createContext<SurveysType>({} as SurveysType)

export const SurveysProvider = (props: any) => {
    const {isAuth, user, token} = useAuthContext()
    const [surveys, setSurveys] = useState<Survey[]>([])
    const [mySurveys, setSurveyByOrganizationId] = useState<Survey[]>([])
    const [surveySelected, setSurveySelected] = useState<Survey>()

    useEffect(() => {
        if (isAuth) {
            if (user && user.roles.length > 0)
            if (user.roles[0].name === 'SuperAdmin') {
                getAllSurveys()
            } else {
                getMySurveys()
            }
        }
    },[isAuth])

    const getAllSurveys = async () => {
        const resolve: any = await surveysRouter.getSurveys()
        setSurveys(resolve.data)
    }

    const getMySurveys = async () => {
        if (user) {
            const resolve: any = await surveysRouter.getSurveyByOrganizationId(user.organization[0]._id)
            console.log(resolve.data)
            const surveyCache: Survey[] = resolve.data
            surveyCache.forEach(async (survey, index) => {
                const response = await surveysResponseRouter.getSurveyResponseBySurveyId(survey._id)
                if (response.state) {
                    survey.done = true
                }
                if (index === (surveyCache.length - 1)) {
                    setSurveyByOrganizationId(surveyCache.reverse())
                }
            })
            /* setSurveyByOrganizationId(resolve.data) */
        }
    }
    
    const removeSurveyById = async (_id: string) => {
        const response = await surveysRouter.removeSurveyById(_id)
        const surveysCache = [...surveys]
        const surveysTemp: Survey[] = []
        surveysCache.forEach((survey) => {
            if (survey._id === response.data.data._id) {
                return null
            } else {
                surveysTemp.push(survey)
            }
        })
        setSurveys(surveysTemp)
    }

    const value = {
        surveys,
        setSurveys,
        surveySelected,
        setSurveySelected,
        mySurveys,
        setSurveyByOrganizationId,
        removeSurveyById
    }

    return (
        <SurveysContext.Provider value={value} >
            {props.children}
        </SurveysContext.Provider>
    )
}

export const useSurveysContext = () => useContext(SurveysContext)