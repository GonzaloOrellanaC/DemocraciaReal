import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTextarea, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import { t } from "i18next"
import { add, close } from "ionicons/icons"
import { Dispatch } from "react"
import { Alternative } from "../../../interfaces/Survey.interface"


const QuestionContainer = ({/* activateUserPopover,  */alternatives, questionDescription, setQuestionDescription, setAlternatives, multiple, setMultiple}:{/* activateUserPopover: () => void, */ alternatives: Alternative[], questionDescription: string, setQuestionDescription: Dispatch<React.SetStateAction<string>>, setAlternatives: Dispatch<React.SetStateAction<Alternative[]>>, multiple: boolean, setMultiple: Dispatch<React.SetStateAction<boolean>>}) => {
    const alternative = {
        description: ''
    } as Alternative
    const newAlternative = () => {
        if (alternatives.length < 8) {
            const alternativesCache = [...alternatives]
            alternativesCache.push(alternative)
            setAlternatives(alternativesCache)
        } else {
            alert('Máximo de alternativas superado')
        }
    }
    const removeAlternative = (index: number) => {
        const alternativesCache = [...alternatives]
        const response = alternativesCache.filter((item, number) => {
            if (index === number) {
                return null
            } else {
                return item
            }
        })
        setAlternatives(response)
    }
    const setAlternativeDescription = (value: string, index: number) => {
        const alternativesCache = [...alternatives]
        alternativesCache[index].description = value
        setAlternatives(alternativesCache)
    }
    return (
        <IonContent class='ion-padding'>
            <div /* className='question-popover-container' */>
                <IonGrid>
                    <IonRow>
                        <IonCol size="8">
                            <IonLabel className="item-org-label">
                                {t('question:inputs:description').toUpperCase()}
                            </IonLabel>
                            <IonItem fill="outline" counter={true}>
                                <IonTextarea
                                    rows={10}
                                    autoGrow
                                    value={questionDescription}
                                    maxlength={300}
                                    name={t('question:inputs-names:description')}
                                    onIonChange={(e) => { setQuestionDescription(e.target.value ? e.target.value : '') }}
                                />
                            </IonItem>
                        </IonCol>
                        <IonCol size="4">
                            <IonItem>
                                <IonLabel>Multiples respuestas</IonLabel>
                                <IonToggle checked={multiple} onIonChange={(e) => { setMultiple(e.target.checked) }} slot="end"></IonToggle>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <br />
                <br />
                <IonToolbar>
                    <IonTitle>
                        Add new alternatives
                    </IonTitle>
                    <IonButtons slot={'end'}>
                        <IonButton onClick={newAlternative}>
                            Add new Alternative
                            <IonIcon icon={add} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonGrid>
                    {
                        alternatives.map((alternative, index) => {
                            return (
                                <IonRow key={index}>
                                    <IonCol size="0.5">
                                        <br />
                                        <br />
                                        <IonLabel>
                                            {index + 1}
                                        </IonLabel>
                                    </IonCol>
                                    <IonCol size="10">
                                        <IonLabel className="item-org-label">
                                            {t('question:inputs:description').toUpperCase()}
                                        </IonLabel>
                                        <IonItem fill="outline" counter={true}>
                                            <IonInput
                                                onIonChange={(e) => { setAlternativeDescription(e.target.value ? e.target.value.toString() : '', index) }}
                                                value={alternative.description}
                                            />
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="0.5">
                                        <br />
                                        <IonButton fill={'clear'} shape={'round'} onClick={() => { removeAlternative(index) }}>
                                            <IonIcon slot="icon-only" icon={close} />
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            )
                        })
                    }
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default QuestionContainer
