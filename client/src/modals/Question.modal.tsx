import { IonButton, IonButtons, IonIcon, IonModal, IonPopover, IonTitle, IonToolbar } from "@ionic/react"
import { closeCircleOutline, saveOutline } from "ionicons/icons"
import { Dispatch, Ref, useEffect, useState } from "react"
import { QuestionContainer } from "../components"
import { Alternative, Question } from "../interfaces/Survey.interface"
import './css/QuestionModal.css'

const QuestionModal = (
{
    popoverOpen,
    question,
    questions,
    setQuestions,
    setQuestion,
    closeModal
}:{
    popoverOpen: boolean,
    question?: Question,
    questions: Question[],
    setQuestions: Dispatch<React.SetStateAction<Question[]>>,
    setQuestion: Dispatch<React.SetStateAction<Question|undefined>>,
    closeModal: () => void
}
) => {
    const [alternatives, setAlternatives] = useState<Alternative[]>([])
    const [questionDescription, setQuestionDescription] = useState<string>('')
    const [multiple, setMultiple] = useState<boolean>(false)
    useEffect(() => {
        if (question) {
            setAlternatives(question.alternatives)
            setQuestionDescription(question.description)
            setMultiple(question.multiple)
        }
    }, [question])
    const save = () => {
        const questionToSave = {
            description: questionDescription,
            alternatives: alternatives
        } as Question
        /* console.log(questionToSave) */
        const questionsCache = questions
        if (question) {
            
        } else {
            questionsCache.push(questionToSave)
        }
        setQuestions(questionsCache)
        setAlternatives([])
        setQuestionDescription('')
        setQuestion(undefined)
        closeModal()
    }
    const closePopover = () => {
        setMultiple(false)
        setAlternatives([])
        setQuestionDescription('')
        setQuestion(undefined)
        closeModal()
    }
    return (
        <IonModal className="question-popover" isOpen={popoverOpen} /* onIonModalWillDismiss={activateUserPopover} */>
            <IonToolbar>
                <IonTitle>
                    Add new question
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={save}>
                        <IonIcon icon={saveOutline} />
                    </IonButton>
                    <IonButton onClick={closePopover}>
                        <IonIcon icon={closeCircleOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <QuestionContainer
                /* activateUserPopover={activateUserPopover} */
                alternatives={alternatives}
                setAlternatives={setAlternatives}
                questionDescription={questionDescription}
                setQuestionDescription={setQuestionDescription}
                multiple={multiple}
                setMultiple={setMultiple}
            />
        </IonModal>
    )
}

export default QuestionModal
