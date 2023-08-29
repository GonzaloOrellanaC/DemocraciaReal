import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getDateWithTime } from "../../../functions"
import userIndexedDb from "../../../indexedDb/user.indexedDb"
import { Survey } from "../../../interfaces/Survey.interface"
import { User } from "../../../interfaces/User.interface"
import { surveysResponseRouter, surveysRouter } from "../../../router"
import { useSurveysContext } from "../../../context/Surveys.context"

const MySurveysComponent = () => {
    const {mySurveys} = useSurveysContext()
    const history = useHistory()
    const [surveys, setSurveys] = useState<Survey[]>([])
    useEffect(() => {
        if (mySurveys.length > 0) {
            setSurveys(mySurveys)
        }
    }, [mySurveys])
    
    /* const init = async () => {
        const { database } = await userIndexedDb.init()
        const userData = await userIndexedDb.consultar(database)
        const user: User = userData.user
        const responseList = await surveysRouter.getSurveyByOrganizationId(user.organization[0]._id)
        const surveyCache = [...responseList.data]
        surveyCache.forEach(async (survey, index) => {
            const response = await surveysResponseRouter.getSurveyResponseBySurveyId(survey._id)
            if (response.state) {
                survey.done = true
            }
            if (index === (surveyCache.length - 1)) {
                setSurveys(surveyCache.reverse())
            }
        })
    } */

    const openSurvey = (id: string, state: boolean) => {
        if (state) {
            history.push(`/${t('routes:my-survey-detail')}/${id}`)
        } else {
            alert('Encuesta no se encuentra activa.')
        }
    }
    
    return (
        <IonContent>
            <IonToolbar>
                <IonTitle><strong>{t('my-surveys:title')}</strong></IonTitle>
            </IonToolbar>
            <div className='padding-left-20'>
                <IonGrid>
                    <IonRow className='border-bottom-1 hide-xs hide-sm hide-md'>
                        <IonCol sizeXl='0.5' sizeLg="0.5" sizeMd="1">
                            <div className='organization-list-titles'>
                                <p>
                                    {t('survey:survey-list:list:id').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol sizeXl='4' sizeLg="3" sizeMd="4">
                            <div className='organization-list-titles'>
                                <p>
                                    {t('survey:survey-list:list:description').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol sizeXl='2' sizeLg="2" sizeMd="2">
                            <div className='organization-list-titles'>
                                <p>
                                    {t('survey:survey-list:list:date-created').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol sizeXl='2' sizeLg="2" sizeMd="2">
                            <div className='organization-list-titles'>
                                <p>
                                    {t('survey:survey-list:list:date-updated').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol sizeXl='1.5' sizeLg="2" sizeMd="1.5">
                            <div className='organization-list-titles'>
                                <p>
                                    {t('survey:survey-list:list:status').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol sizeXl='1.5' sizeLg="1.5" sizeMd="1.5">
                            <div className='organization-list-titles'>

                            </div>
                        </IonCol>
                    </IonRow>
                    <div className="height-adjuted-survey">
                    {
                        surveys.map((survey, n) => {
                            return (
                                <IonRow key={n} style={{ borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 10, marginBottom: 20 }}>
                                    <IonCol sizeXl='0.5' sizeLg="0.5" sizeMd="" sizeSm="" sizeXs="12">
                                        <div className='organization-list-titles'>
                                            <p className="show-md">
                                                Encuesta:
                                            </p>
                                            <p>
                                                {survey.idSurvey}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol sizeXl='4' sizeLg="3" sizeMd="" sizeSm="" sizeXs="12">
                                        <div className='organization-list-titles'>
                                            <p className="show-md">
                                                Título:
                                            </p>
                                            <p>
                                                {survey.description}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol sizeXl='2' sizeLg="2" sizeMd="" sizeSm="" sizeXs="12">
                                        <div className='organization-list-titles'>
                                            <p className="show-md">
                                                Creación:
                                            </p>
                                            <p>
                                                {getDateWithTime(new Date(survey.createdAt))}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol sizeXl='2' sizeLg="2" sizeMd="" sizeSm="" sizeXs="12">
                                        <div className='organization-list-titles'>
                                            <p className="show-md">
                                                Actualización:
                                            </p>
                                            <p>
                                                {getDateWithTime(new Date(survey.updatedAt))}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol sizeXl='1.5' sizeLg="2" sizeMd="" sizeSm="12" sizeXs="12">
                                        <div className='organization-list-titles'>
                                            {survey.state
                                                ?
                                                <div className="state-org active-org">
                                                    {t('survey:survey-list:list:active-survey')}
                                                </div>
                                                :
                                                <div className="state-org inactive-org">
                                                    {t('survey:survey-list:list:inactive-survey')}
                                                </div>
                                            }
                                        </div>
                                    </IonCol>
                                    <IonCol sizeXl='1.5' sizeLg="" sizeMd="" sizeSm="" sizeXs="12">
                                        <div className='organization-list-titles'>
                                            <IonButtons>
                                                <IonButton color={'primary'} fill={'solid'} disabled={survey.done} expand={'block'} size={'default'} onClick={() => { openSurvey(survey._id, survey.state) }}>
                                                    {survey.done ? 'Respondido' : 'Responder'}
                                                </IonButton>
                                                <IonButton color={'secondary'} fill={'solid'} hidden={!survey.done} expand={'block'} size={'default'}>
                                                    Ver
                                                </IonButton>
                                            </IonButtons>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            )
                        })
                    }
                    </div>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default MySurveysComponent
