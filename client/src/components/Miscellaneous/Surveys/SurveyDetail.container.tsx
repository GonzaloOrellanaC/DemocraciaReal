import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonLoading, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import { t } from "i18next"
import { add, close, trashOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import socketConnection from "../../../connections/socket.connection"
import userIndexedDb from "../../../indexedDb/user.indexedDb"
import { Organization } from "../../../interfaces/Role.interface"
import { Question, Survey } from "../../../interfaces/Survey.interface"
import { ExecutionAlertModal, QuestionModal } from "../../../modals"
import { organizationRouter, surveysRouter } from "../../../router"
import { useSurveysContext } from "../../../context/Surveys.context"

const SurveyDetailContainer = () => {
    const {surveySelected} = useSurveysContext()
    const id: {id: string} = useParams()
    const history = useHistory()
    const [survey,setSurvey] = useState<Survey>()
    const [questions, setQuestions] = useState<Question[]>([])
    const [typeUser, setTypeUser] = useState<string>('')
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const [question, setQuestion] = useState<Question>()
    const [surveyDescription, setSurveyDescription] = useState<string>('')
    const [surveyState, setSurveyState] = useState<boolean>(true)
    const [openLoading, setOpenLoading] = useState<boolean>(false)
    const [messageLoading, setMessageLoading] = useState<string>('')
    const [openOrgSuccess, setOpenOrgSuccess] = useState<boolean>(false)
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [organizationsSelected, setOrganizationsSelected] = useState<string[] | Organization[]>([])
    const [cannotEdit, setCannotEdit] = useState<boolean>(false)
    useEffect(() => {
        if (organizationsSelected.length > 1 && (typeUser==='admin')) {
            setCannotEdit(true)
        } else {
            setCannotEdit(false)
        }
    }, [organizationsSelected, typeUser])
    useEffect(() => {
        console.log(surveySelected)
        if (surveySelected) {
            setSurvey(surveySelected)
            setSurveyDescription(surveySelected.description)
            setQuestions(surveySelected.questions)
            setOrganizationsSelected(surveySelected.organization)
            setSurveyState(surveySelected.state)

        }
    },[surveySelected])
    /* useEffect(() => {
        init()
    }, []) */
    useEffect(() => {
        /* console.log(typeUser) */
        if (typeUser==='SuperAdmin') {
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
    }, [typeUser])
    const init = async () => {
        const {database} = await userIndexedDb.init()
        const responseUser = await userIndexedDb.consultar(database)
        setTypeUser(responseUser.user.roles[0].name)
        const res = await organizationRouter.readAllOrgs()
        /* console.log(res.data) */
        const orgs: Organization[] = res.data
        setOrganizations(orgs)
        if (id.id) {
            const r = await surveysRouter.getSurveyById(id.id)
            /* console.log(r.data) */
            const surveyCache: Survey = r.data
            setSurveyDescription(surveyCache.description)
            setQuestions(surveyCache.questions)
            setOrganizationsSelected(surveyCache.organization)
            setSurveyState(surveyCache.state)
        }
        if (responseUser.user.roles[0].name === 'admin') {
            setOrganizationsSelected([responseUser.user.organization[0]._id])
        }
    }
    const closeExecutionAlert = () => {
        setOpenOrgSuccess(false)
    }
    const back = () => {
        history.goBack()
    }
    const activateUserPopover = () => {
        /* console.log('Activando Popover') */
        if (popoverOpen) {
            setPopoverOpen(false)
        } else {
            setPopoverOpen(true)
        }
    }
    const removeQuestion = (index: number) => {
        if (window.confirm(`Eliminará Pregunta ${index + 1}`)) {
            const questionsCache = [...questions]
            const filteredElement = questionsCache.filter((item, number) => {
                if (number === index) {
                    return null
                } else {
                    return item
                }
            })
            setQuestions(filteredElement)
        }
    }
    const saveSurvey = async () => {
        setOpenLoading(true)
        if (!id.id) {
            const surveyToSave = {
                organization: organizationsSelected,
                description: surveyDescription,
                questions: questions,
                state: surveyState,
                createdBy: localStorage.getItem('_id'),
                updatedBy: localStorage.getItem('_id')
            } as Survey
            try {
                const response = await surveysRouter.createSurvey(surveyToSave)
                /* console.log(response) */
                history.goBack()
                setOpenLoading(false)
            } catch (error) {
                setOpenLoading(false)
            }
        } else {
            const surveyToSave = {
                _id: id.id,
                organization: organizationsSelected,
                description: surveyDescription,
                questions: questions,
                state: surveyState,
                updatedBy: localStorage.getItem('_id')
            } as Survey
            try {
                const response = await surveysRouter.editSurvey(surveyToSave)
                /* console.log(response) */
                history.goBack()
                setOpenLoading(false)
            } catch (error) {
                setOpenLoading(false)
            }
        }
        socketConnection.encuestaCreadaEditada()
    }
    const openModalToEdit = (question: Question) => {
        /* console.log(question) */
        setQuestion(question)
        activateUserPopover()
    }
    const closeModal = () => {
        if(popoverOpen) {
            setPopoverOpen(false)
        }
    }
    return (
        <IonContent>
            <QuestionModal
                question={question}
                popoverOpen={popoverOpen}
                setQuestions={setQuestions}
                setQuestion={setQuestion}
                questions={questions}
                closeModal={closeModal}
            />
            <IonLoading
                isOpen={openLoading}
                message={messageLoading}
            />
            <ExecutionAlertModal
                open={openOrgSuccess}
                closeModal={closeExecutionAlert}
                title={(id.id) ? `${t('organization-detail:edit-org:success:title')}` : `${t('organization-detail:creating-org:success:title')}`}
                text={(id.id) ? `${t('organization-detail:edit-org:success:text')}` : `${t('organization-detail:creating-org:success:text')}`}
                someFunction={back}
                isOk={true}
            />
            <IonGrid>
                <IonRow>
                    <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                        <IonToolbar>
                            <IonTitle><strong>{t('survey-detail:title')}</strong></IonTitle>
                            <div hidden={!cannotEdit}>
                                <p style={{ color: 'red' }}><strong>Solo el administrador de sistema puede editar la encuesta.</strong></p>
                            </div>
                        </IonToolbar>
                        <IonRow>
                            <IonCol sizeXl="12" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                <IonLabel className="item-org-label">
                                    {t('survey-detail:inputs:description').toUpperCase()}
                                </IonLabel>
                                <IonItem fill="outline" counter={true}>
                                    <IonTextarea
                                        disabled={cannotEdit}
                                        value={surveyDescription}
                                        onIonChange={(e) => { setSurveyDescription(e.target.value ? e.target.value : '') }}
                                        autoGrow
                                        rows={10}
                                        maxlength={300}
                                        name={t('survey-detail:inputs-names:description')}
                                        placeholder={t('survey-detail:inputs-names:description')}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeXl="12" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                <IonItem disabled={cannotEdit}>
                                    <IonLabel>
                                        {surveyState ? 'Activado' : 'Desactivado'}
                                    </IonLabel>
                                    <IonToggle checked={surveyState} onIonChange={(e) => { setSurveyState(e.target.checked) }} />
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXl="12" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                <IonItem>
                                    <IonLabel>
                                        Seleccione Organizaciones
                                    </IonLabel>
                                    <IonSelect disabled={!canEdit} multiple interface={'alert'} value={organizationsSelected} onIonChange={(e) => { setOrganizationsSelected(e.target.value) }}>
                                        {
                                            organizations.map((org, i) => {
                                                return (
                                                    <IonSelectOption key={i} value={org._id}>
                                                        {org.name}
                                                    </IonSelectOption>
                                                )
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeXl="12" sizeLg="4" sizeMd="12" sizeSm="12" sizeXs="12">
                                <IonRow>
                                    <IonCol sizeXl="6" sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                        <IonButton disabled={cannotEdit} className="button-org-detail" fill={'outline'} color={'secondary'} onClick={saveSurvey}>
                                            <IonIcon icon={add} style={{marginRight: 10}} />
                                            {(id.id) ? t('survey-detail:buttons:edit-survey') : t('survey-detail:buttons:create-survey')}
                                        </IonButton>
                                    </IonCol>
                                    <IonCol sizeXl="6" sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                        <IonButton className="button-org-detail" fill={'outline'} color={'danger'} onClick={() => { history.goBack() }}>
                                            <IonIcon icon={close} style={{marginRight: 10}} />
                                            {t('survey-detail:buttons:cancel')}
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                        <IonRow>
                            <IonCol>
                                <IonToolbar>
                                    <IonTitle>
                                        <strong>{t('survey-detail:question-list:title')}</strong>
                                    </IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton disabled={cannotEdit} id='click-trigger-question' fill={'outline'} shape={'round'} color={'primary'} onClick={activateUserPopover}>
                                            <IonIcon icon={add} />
                                        </IonButton>
                                    </IonButtons>
                                </IonToolbar>
                                <div className="question-list">
                                    {
                                        questions.map((question, index) => {
                                            return(
                                                <IonCard
                                                    disabled={cannotEdit}
                                                    key={index}
                                                    button>
                                                    <IonToolbar>
                                                        <IonTitle>
                                                            <p>Pregunta {index + 1}</p>
                                                        </IonTitle>
                                                        <IonButtons slot={'end'} onClick={() => { removeQuestion(index) }}>
                                                            <IonButton>
                                                                <IonIcon color="danger" icon={trashOutline} />
                                                            </IonButton>
                                                        </IonButtons>
                                                    </IonToolbar>
                                                    <IonCardContent onClick={() => {openModalToEdit(question)}}>
                                                        <IonRow>
                                                            <IonCol size="5">
                                                                <p>{question.description}</p>
                                                            </IonCol>
                                                            <IonCol size="4">
                                                                {
                                                                    question.alternatives.map((e, i) => {
                                                                        return (
                                                                            <IonRow key={i}>
                                                                                <IonCol size="1">
                                                                                    <p>{i + 1}</p>
                                                                                </IonCol>
                                                                                <IonCol>
                                                                                    <p>{e.description}</p>
                                                                                </IonCol>
                                                                            </IonRow>
                                                                        )
                                                                    })
                                                                }
                                                            </IonCol>
                                                            <IonCol size="2">
                                                                
                                                            </IonCol>
                                                        </IonRow>
                                                    </IonCardContent>
                                                </IonCard>
                                            )
                                        })
                                    }
                                    {
                                        questions.length === 0
                                        &&
                                        <IonRow>
                                            <IonCol>
                                                <IonTitle>
                                                    Ingrese una pregunta
                                                </IonTitle>
                                            </IonCol>
                                        </IonRow>
                                    }
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default SurveyDetailContainer
