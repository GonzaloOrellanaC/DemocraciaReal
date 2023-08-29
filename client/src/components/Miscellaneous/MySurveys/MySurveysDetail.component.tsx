import { IonButton, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonLoading, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { t } from "i18next"
import { chevronBackOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import socketConnection from "../../../connections/socket.connection"
import { Alternative, Question, Survey, SurveyResponse,  } from "../../../interfaces/Survey.interface"
import { SurveyModal } from "../../../modals"
import { surveysResponseRouter, surveysRouter } from "../../../router"

const MySurveyDetailContainer = () => {
    const history = useHistory()
    const id: {id: string} = useParams()
    const [survey, setSurvey] = useState<Survey>()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [question, setQuestion] = useState<Question>()
    const [questions, setQuestions] = useState<Question[]>([])
    const [indexQuestion, setIndexQuestion] = useState(0)
    const [dataToSend, setDataToSend] = useState<{questionNumber: number, response: number[] }[]>([])
    const [noAnswers, setNoAnswers] = useState<boolean>(false)
    const [openLoading, setOpneLoading] = useState<boolean>(false)
    const [messageLoading, setMessageLoading] = useState<string>('')
    useEffect(() => {
        init()
    }, [])
    const init = async () => {
        setOpneLoading(true)
        setMessageLoading('Cargando Encuesta')
        const r = await surveysRouter.getSurveyById(id.id)
        /* console.log(r.data) */
        setSurvey(r.data)
        const surv: Survey = r.data
        const list: {questionNumber: number, response: number[]}[] = []
        surv.questions.forEach((question, index) => {
            list.push({questionNumber: index, response: []})
            if (index === (surv.questions.length - 1)) {
                setDataToSend(list)
            }
        })
        setQuestions(surv.questions)
        setTimeout(() => {
            setOpneLoading(false)
        }, 1000)
    }
    const closeModal = () => {
        if (openModal) {
            setOpenModal(false)
        }
    }
    const openQuestion = (question: Question, index: number) => {
        setIndexQuestion(index)
        setQuestion(question)
        setOpenModal(true)
    }
    useEffect(() => {
        /* console.log(question) */
        
    }, [question])
    const saveResponse = (selection: {questionNumber: number, response: number[]}, alternatives: Alternative[]) => {
        /* console.log(alternatives) */
        const questionsCache = [...questions]
        const dataToSendCache = [...dataToSend]
        dataToSendCache[indexQuestion] = selection
        if (question)
        questionsCache[indexQuestion].alternatives = alternatives
        setQuestions(questionsCache)
        setDataToSend(dataToSendCache)
    }
    const sendResponse = async () => {
        setOpneLoading(true)
        setMessageLoading('Enviando Encuesta')
        setNoAnswers(false)
        /* console.log(dataToSend) */
        let state: boolean = true
        const noAnswersList: any[] = []
        dataToSend.forEach((data, index) => {
            if (data.response.length === 0) {
                state = false
                noAnswersList.push(index)
            }
            if (index === (dataToSend.length - 1)) {
                if (state) {
                    const questionsCache = [...questions]
                    questionsCache.forEach(question => {
                        question.bgColor = 'light'
                    })
                    setTimeout(async () => {
                        const responseToSend = {
                            updatedBy: window.localStorage.getItem('_id'),
                            createdBy: window.localStorage.getItem('_id'),
                            survey: id.id,
                            responses: dataToSend
                        } as SurveyResponse
                        if (window.confirm('Confirme que enviará los cambios. No se podrán modificar.')) {
                            const res = await surveysResponseRouter.saveSurveyResponse(responseToSend)
                            if (res.state) {
                                setOpneLoading(false)
                                alert('Respuestas enviadas')
                                history.goBack()
                                socketConnection.encuestaRespondida()
                            }
                        } else {
                            setOpneLoading(false)
                        }
                    }, 1000);
                } else {
                    alert('Algunas preguntas de la encuesta no fueron respondidas. Por favor responda las preguntas que aparecen de color rojo.')
                    const questionsCache = [...questions]
                    questionsCache.forEach((question, numberData) => {
                        question.bgColor = 'light'
                        noAnswersList.forEach(indexNoAnswer => {
                            if (numberData === indexNoAnswer) {
                                question.bgColor = 'danger'
                            }
                        })
                        if (numberData === (questionsCache.length - 1)) {
                            setQuestions(questionsCache)
                            setNoAnswers(true)
                            setOpneLoading(false)
                            /* noAnswersList = [] */
                        }
                    })
                }
            }
        })
    }
    return (
        <IonContent>
        {
            question
            &&
            <SurveyModal open={openModal} setSurvey={setSurvey} closeModal={closeModal} question={question} setQuestion={setQuestion} saveResponse={saveResponse} dataToSend={dataToSend} indexQuestion={indexQuestion}/>
        }
            <IonLoading
                isOpen={openLoading}
                message={messageLoading}
            />
            <IonToolbar>
                <IonButton slot="start" fill={'clear'} onClick={() => { history.goBack() }}>
                    <IonIcon slot={'icon-only'} icon={chevronBackOutline} />
                </IonButton>
                <IonTitle><strong>{t('my-survey-detail:title')}</strong></IonTitle>
            </IonToolbar>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <div style={{ padding: 10, textAlign: 'justify' }}>
                            <p hidden={!noAnswers} style={{ color: 'red' }}>
                                Responda las preguntas que aparecen en color <strong>ROJO</strong>.
                            </p>
                            <p className="surveys-text-mobile">
                                {survey?.description}
                            </p>
                            <br />
                            {/* <IonButton fill={'outline'} onClick={() => { setOpenModal(true) }}>
                                <IonLabel style={{ merginRight: 10 }}>Ir a Preguntas</IonLabel> <IonIcon icon={arrowForwardOutline} />
                            </IonButton> */}
                            <IonRow>
                                {
                                    questions?.map((question, index) => {
                                        return (
                                            <IonCol key={index} sizeXl={'3'} sizeLg={'3'} sizeMd={'6'} sizeSm={'12'} sizeXs={'12'} >
                                                <IonCard color={question.bgColor && question.bgColor} button style={{ padding: 20, textAlign: 'center' }} onClick={() => { openQuestion(question, index) }}>
                                                    <IonCardTitle>
                                                        Pregunta {index + 1}
                                                    </IonCardTitle>
                                                </IonCard>
                                            </IonCol>
                                        )
                                    })
                                }
                            </IonRow>
                            <IonToolbar>
                                <IonButton slot="end" onClick={sendResponse}>
                                    Enviar Respuestas
                                </IonButton>
                            </IonToolbar>
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default MySurveyDetailContainer
