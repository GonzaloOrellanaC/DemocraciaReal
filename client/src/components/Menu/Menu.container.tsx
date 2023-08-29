import { IonButton, IonCard, IonContent, IonIcon, IonLabel, IonMenu } from "@ionic/react"
import { t } from "i18next"
import { briefcase, logOut, people } from "ionicons/icons"
import { useHistory } from "react-router"
/* import { logout } from "../../../functions" */

const MenuContainer = () => {
    const history = useHistory()
    const salir = async () => {
        /* const response = await logout()
        if (response) {
            history.replace('/login')
        } */
    }
    return (
        <IonMenu contentId="main" swipeGesture={true} type={'push'}>
            <IonContent className="ion-padding">
                <IonCard className='left-home-menu'>
                    <img src='./assets/logo/logo-kauel.png' className={'logo-home-image'} alt={'logo'}/>
                    <h3>
                        {t('home:title')}
                    </h3>
                    <br />
                    <h2>Admin</h2>
                    {/* <h4>{userData?.name} {userData?.lastName}</h4> */}
                    <img src='./assets/images/image-profile.png' width={100} className={'profile-image'} alt={'profile'} />
                    <br />
                    <br />
                    <IonButton expand={'block'} onClick={() => { history.push(`/${t('routes:users')}`) }}>
                        <IonIcon icon={people} style={{ marginRight: 10 }}/>
                        <IonLabel>{t('home:buttons:users')}</IonLabel>
                    </IonButton>
                    <br />
                    <IonButton expand={'block'} onClick={() => { history.push(`/${t('routes:organizations')}`) }}>
                        <IonIcon icon={briefcase} style={{ marginRight: 10 }}/>
                        {t('home:buttons:organizations')}
                    </IonButton>
                    <br />
                    <IonButton expand={'block'} color={'danger'} onClick={ salir }>
                        <IonIcon icon={logOut} style={{ marginRight: 10 }}/>
                        {t('home:buttons:close')}
                    </IonButton>
                </IonCard>
            </IonContent>
        </IonMenu>
    )
}

export default MenuContainer
