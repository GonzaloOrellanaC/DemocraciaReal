import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonToolbar } from '@ionic/react'
import { checkmarkCircleOutline, close, closeCircleOutline } from 'ionicons/icons'
import './css/ExecutionAlert.css'
const ExecutionAlertModal = ({open, hidden, closeModal, title, text, isOk, someFunction}:{open: boolean, hidden?: boolean, closeModal?: () => void, title?: string, text?: string, isOk: boolean, someFunction?: () => void}) => {
    return (
        <IonModal hidden={hidden} isOpen={open} trigger='open-modal' className='execution-alert-modal' onWillDismiss={someFunction}>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot='end'>
                        <IonButton strong={true} onClick={closeModal}>
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <div className='icon-execution-alert'>
                    <IonIcon color={isOk ? 'success' : 'danger'} icon={isOk ? checkmarkCircleOutline : closeCircleOutline} />
                </div>
                <div className='title-execution-alert'>
                    <p>
                        <b>
                            {title}
                        </b>
                    </p>
                </div>
                <div className='text-execution-alert'>
                    <p>
                        {text}
                    </p>
                </div>
            </IonContent>
        </IonModal>
    )
}

export default ExecutionAlertModal
