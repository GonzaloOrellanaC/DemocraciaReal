import { IonPage } from '@ionic/react'
import { UserDetailContainer } from '../../../components'
import RegistreContainer2 from '../../../components/Auth/Registre/Registre2.container'

const RegistreFormPage = () => {
    return (
        <IonPage>
            <RegistreContainer2 />
            {/* <UserDetailContainer isRegistre={true} /> */}
        </IonPage>
    )
}

export default RegistreFormPage
