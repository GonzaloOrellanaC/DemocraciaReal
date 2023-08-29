import { IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonRow, IonToolbar } from "@ionic/react"
import { close } from "ionicons/icons"
import { Alternative, Question, Survey } from "../interfaces/Survey.interface"
import { useEffect, useState } from "react";


const SurveyModal = (
    {open, closeModal, setQuestion, someFunction, question, dataToSend, saveResponse, indexQuestion}:
    {open: boolean, closeModal: () => void, setSurvey: React.Dispatch<React.SetStateAction<Survey | undefined>>, survey?: Survey, someFunction?: () => void, question: Question, setQuestion: React.Dispatch<React.SetStateAction<Question|undefined>>, dataToSend: {questionNumber: number, response: number[]}[], saveResponse: (selection: {questionNumber: number, response: number[]}, alternatives: Alternative[]) => void, indexQuestion: number}) => {
    const [alternatives, setAlternatives] = useState<Alternative[]>([])   
   
    useEffect(() => {
        setAlternatives(question.alternatives)
    }, [question])

    const selectElement = (indexAlternative: number) => {
        const alternativesCache = [...alternatives]
        alternativesCache.forEach((al, i) => {
            /* console.log(indexAlternative, i) */
            if (i === indexAlternative) {
                al.selected = true
            } else {
                al.selected = false
            }
        })
        const dataToSendCache = {questionNumber: indexQuestion, response: [indexAlternative]}
        saveResponse(dataToSendCache, alternativesCache)
        /* setAlternatives(alternativesCache) */
    }

    const closeModalStatic = () => {
        closeModal()
    }

    const saveData = () => {
        question.alternatives = alternatives
        setQuestion(question)
        closeModalStatic()
    }

    return (
        <IonModal isOpen={open} className={'questions-modal'}>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot='end'>
                        <IonButton strong={true} onClick={closeModalStatic}>
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <p>{question?.description}</p>
                <IonList>
                    {
                        alternatives.map((alternative, i) => {
                            return (
                                <IonItem onClick={() => { selectElement(i) }} button key={i} color={alternative.selected ? 'secondary' : 'light'}>
                                    <IonCheckbox checked={alternative.selected} />
                                    <IonLabel className="ion-text-wrap" style={{ marginLeft: 10 }}>
                                        {alternative.description}
                                    </IonLabel>
                                </IonItem>
                            )
                        })
                    }
                </IonList>
                <IonGrid>
                    <IonRow>
                        <IonCol sizeXl="3" sizeLg="3" sizeMd="1" sizeSm="0" sizeXs="0">

                        </IonCol>
                        <IonCol sizeXl="6" sizeLg="6" sizeMd="10" sizeSm="12" sizeXs="12">
                            <IonButton fill={'outline'} expand={'block'} onClick={saveData}>
                                Guardar
                            </IonButton>
                        </IonCol>
                        <IonCol sizeXl="3" sizeLg="3" sizeMd="1" sizeSm="0" sizeXs="0">

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}

export default SurveyModal
