import { IonPage } from '@ionic/react'
import { UserDetailContainer } from '../../../components'

const RegistreFormPage = () => {
    return (
        <IonPage>
            <UserDetailContainer isRegistre={true} />
        </IonPage>
    )
}

export default RegistreFormPage
