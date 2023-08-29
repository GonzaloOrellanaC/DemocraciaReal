import { IonContent, IonPage } from '@ionic/react'
import { t } from 'i18next'

const NotFoundPage = () => {
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
                    <p>{t(`${'notFoundPage:title'}`)}</p>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default NotFoundPage