import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLoading, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Survey, SurveyResponse } from "../../../interfaces/Survey.interface"
import { surveysResponseRouter, surveysRouter } from "../../../router"
import { PieChart, Pie, Cell } from 'recharts';
import { t } from "i18next"
import { chevronBackOutline } from "ionicons/icons"


interface DataToGraphic {
    description: string;
    alternatives: {_id: string, description: string, value: number}[];
}

interface DataToGraphicPage {
    description: string;
    alternatives: {_id: string, description: string, value: number}[];
    datas: {
        name: string
        value: number
    }[] 
}

const SurveyResultsContainer = () => {
    const history = useHistory()
    const id: {id: string} = useParams()
    const [dataGraphToPage, setDataGraph] = useState<DataToGraphicPage[]>([])
    const [openLoading, setOpenLoading] = useState<boolean>(false)
    const [messageLoading, setMessageLoading] = useState<string>('')

    useEffect(() => {
      init()
    }, [])
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff8c00', '#e81123', '#68217a', '#009e49'];
    const init = async () => {
        setOpenLoading(true)
        setMessageLoading('Cargando datos. Espere...')
        const response = await surveysRouter.getSurveyById(id.id)
        const data = await surveysResponseRouter.getSurveyDataBySurveyId(id.id)
        const survey: Survey = response.data
        const surveysResponse: SurveyResponse[] = data.data
        const totalCuestions : any[] = []

        const datasToGraph: DataToGraphic[] = []
        const datasToGraphPage: DataToGraphicPage[] = []
        
        try {
            survey.questions.forEach((question, i) => {
                /* console.log(question) */
                const questionsData = {
                    desciption: question.description,
                    responses: {
                        alternatives: question.alternatives,
                        responses: []
                    }
                }
                totalCuestions.push(questionsData)
                
                if (i === (survey.questions.length - 1)) {
                    const datas: any[] = []
                    totalCuestions.forEach((questionData, n) => {
                        const data: DataToGraphic = {
                            description: questionData.desciption,
                            alternatives: [...questionData.responses.alternatives]
                        }
                        data.alternatives.forEach((alternative: {
                            _id: string
                            description: string
                            value: number
                        }, i) => {
                            alternative.value = 0
                        })
                        const dataToGraph: any[] = []
                        surveysResponse.forEach((res, num) => {
                            /* console.log(res.responses[n].response) */
                            data.alternatives[res.responses[n].response[0]].value = data.alternatives[res.responses[n].response[0]].value + 1
                        })
                        data.alternatives.forEach((alternative: {
                            _id: string
                            description: string
                            value: number
                        }, i) => {
                            dataToGraph.push({name: alternative.description, value: alternative.value})
                        })
                        /* console.log(data) */
                        const datasToGraphPageUnique: DataToGraphicPage = {
                            datas: dataToGraph,
                            description: data.description,
                            alternatives: data.alternatives
                        }
                        datasToGraphPage.push(datasToGraphPageUnique)
                        if (n === (totalCuestions.length - 1)) {
                            setDataGraph(datasToGraphPage)
                            /* console.log(datas) */
                            setOpenLoading(false)
                        }
                    })
                }
            })
        } catch (error) {
            alert(error)
            setOpenLoading(false)
        }
    }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, payload, percent, index}:{cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, payload: any, percent: number, index: number}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        /* console.log(payload) */
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <IonContent>
        <IonLoading
            isOpen={openLoading}
            message={messageLoading}
        />
            <IonToolbar>
                <IonButton slot="start" fill={'clear'} onClick={() => { history.goBack() }}>
                    <IonIcon slot={'icon-only'} icon={chevronBackOutline} />
                </IonButton>
                <IonTitle><strong>{t('survey-results:title')}</strong></IonTitle>
            </IonToolbar>
            <IonGrid>
                <IonRow>
                    <IonCol>

                    </IonCol>
                    <IonCol sizeXl="8" sizeLg="8" sizeMd="10" sizeSm="12" sizeXs="12">
                        <IonRow>
                        {
                            dataGraphToPage.map((data, i) => {
                                /* console.log(dataGraphToPage[i]) */
                                return(
                                    <IonCol key={i} sizeXl='6'>
                                        <h2>
                                            {i + 1}.- {data.description}
                                        </h2>
                                        {
                                            <div style={{ width: '100%', textAlign: 'center', marginRight: 'auto', marginLeft: 'auto' }}>
                                                <IonRow>
                                                    <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                                        <IonRow>
                                                            <IonCol size="9">
                                                                <p style={{ textAlign: 'justify' }}><strong>Opciones</strong></p>
                                                            </IonCol>
                                                            <IonCol size="3">
                                                                <p><strong>Resp.</strong></p>
                                                            </IonCol>
                                                        </IonRow>
                                                        {
                                                            data.datas.map((e, y) => {
                                                                return(
                                                                    <IonRow key={y}>
                                                                        <IonCol size="9">
                                                                            <p style={{ textAlign: 'justify', color: COLORS[y] }}> <strong>{e.name}</strong> </p>
                                                                        </IonCol>
                                                                        <IonCol size="3">
                                                                            <p style={{ color: COLORS[y] }}> <strong>{e.value}</strong> </p>
                                                                        </IonCol>
                                                                    </IonRow>
                                                                )
                                                            })
                                                        }
                                                    </IonCol>
                                                    <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                                        <div style={{ width: '100%', marginRight: 'auto', marginLeft: 'auto' }}>
                                                            <PieChart width={250} height={250}>
                                                                <Pie
                                                                    data={data.datas}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    labelLine={false}
                                                                    label={renderCustomizedLabel}
                                                                    outerRadius={100}
                                                                    fill="#8884d8"
                                                                    dataKey="value"
                                                                >
                                                                    {data.datas.map((entry, index) => (
                                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                    ))}
                                                                </Pie>
                                                            </PieChart>
                                                        </div>
                                                    </IonCol>
                                                </IonRow>
                                            </div>
                                        }
                                    </IonCol>
                                )
                            })
                        }
                        </IonRow>
                    </IonCol>
                    <IonCol>

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default SurveyResultsContainer
