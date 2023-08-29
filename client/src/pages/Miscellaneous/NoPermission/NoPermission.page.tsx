import { IonContent, IonPage } from '@ionic/react'
import { t } from 'i18next'

const NotPermissionPage = () => {
    return (
        <IonPage>
            <IonContent>
                <div
                    style={
                        {
                            marginTop: 50,
                            textAlign: 'center',
                            fontSize: 18
                        }
                    }
                >
                    <p>{t('notPermissionPage:title')}</p>
                    <br />
                    <a href='/'>A inicio</a>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default NotPermissionPage
