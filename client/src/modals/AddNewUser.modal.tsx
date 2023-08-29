import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import { t } from 'i18next'
import { close } from 'ionicons/icons'
import { UserDetailContainer } from '../components'
import { Organization } from '../interfaces/Role.interface'
import './css/ExecutionAlert.css'
const AddNewUserModal = ({open, hidden, closeModal, org, someFunction}:{open: boolean, hidden?: boolean, closeModal?: () => void, org?: Organization, someFunction?: () => void}) => {
    return (
        <IonModal hidden={hidden} isOpen={open} trigger='open-modal' className={'preview-modal'} onWillDismiss={someFunction}>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>
                        {`${t('users:user-to-org:create')} ${org?.name}`}
                    </IonTitle>
                    <IonButtons slot='end'>
                        <IonButton strong={true} onClick={closeModal}>
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <UserDetailContainer org={org} closeModal={closeModal} />
        </IonModal>
    )
}

export default AddNewUserModal
