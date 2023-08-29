import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { t } from "i18next"
import { add, informationCircleOutline, pencilOutline, trashOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getDateWithTime } from "../../../functions"
import { Survey } from "../../../interfaces/Survey.interface"
import { useSurveysContext } from "../../../context/Surveys.context"

const SurveyContainer = () => {
    const {surveys, setSurveySelected, removeSurveyById} = useSurveysContext()
    const [ surveysToShow, setSurveysToShow ] = useState<Survey[]>([])
    const history = useHistory()
    useEffect(() => {
        console.log(surveys)
        if (surveys.length > 0) {
            setSurveysToShow(surveys.reverse())
        }
    }, [surveys])

    const removeSurvey = (survey: Survey) => {
        if (window.confirm('Confirme que removerá la consulta digital.')) {
            removeSurveyById(survey._id)
        }
    }
    return (
        <IonContent>
            <IonToolbar>
                <IonTitle><strong>{t('survey:title')}</strong></IonTitle>
            </IonToolbar>
            <IonToolbar>
                <IonButton slot="end" fill={'outline'} color={'secondary'} onClick={() => {history.push(`/${t('routes:survey-detail')}`)}}>
                    <IonIcon icon={add} />
                    {t('survey:buttons:create-survey')}
                </IonButton>
            </IonToolbar>
            <div className='padding-left-20'>
                <IonGrid>
                    <IonRow className='border-bottom-1 hide-xs hide-sm hide-md'>
                        <IonCol sizeXl='1' sizeLg="0.5" sizeMd="1">
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
                                <p>
                                    {t('survey:survey-list:list:action').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                    </IonRow>
                    <div className="organizations-list-container">
                    {
                        surveysToShow.map((survey, n) => {
                            return (
                                <IonRow key={n}>
                                    <IonCol sizeXl='1' sizeLg="0.5" sizeMd="" sizeSm="" sizeXs="12">
                                        <div className='organization-list-titles'>
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
                                            <IonButtons className="organization-list-buttons-action">
                                                <IonButton size={'large'} onClick={() => {history.push(`/${t('routes:survey-results')}/${survey._id}`)}}>
                                                    <IonIcon icon={informationCircleOutline} />
                                                </IonButton>
                                                <IonButton size={'large'} onClick={() => {setSurveySelected(survey); history.push(`/${t('routes:survey-detail')}/${survey._id}`)}}>
                                                    <IonIcon icon={pencilOutline} />
                                                </IonButton>
                                                <IonButton size={'large'} onClick={() => {removeSurvey(survey)}}>
                                                    <IonIcon color="danger" icon={trashOutline} />
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

export default SurveyContainer
