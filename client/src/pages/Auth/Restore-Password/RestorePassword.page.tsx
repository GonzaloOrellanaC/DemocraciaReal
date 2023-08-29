import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react"
import { t } from "i18next"
import { RestorePasswordContainer } from "../../../components"
import { Logo } from "../../../icons"

const RestorePasswordPage = () => {
    return (
        <IonPage>
            <IonContent>
                <IonGrid className="no-padding-style">
                    <IonRow>
                        <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                            <IonRow>
                                <IonCol></IonCol>
                                <IonCol sizeXl="6" sizeLg="8" sizeMd="12" sizeSm="12" sizeXs="12">
                                    <div className="login-title">
                                        <img src={Logo} width={250} alt={'logo'} />
                                        <h3 style={{fontSize:32}}><strong>{t('forgot-password:title')}</strong></h3>
                                    </div>
                                    <RestorePasswordContainer />
                                    {/* <div style={{ textAlign: 'center', fontSize: 10 }}>
                                        <p>Plataforma desarrollada por el <strong>Equipo de Comunicaciones del Partido de la Gente de la Región de Valparaíso</strong></p>
                                        <a href="https://www.linkedin.com/in/gonzaloorellanac/">Contacta al desarrollador.</a>
                                    </div> */}
                                </IonCol>
                                <IonCol></IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol className="no-padding-style" sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="0" sizeXs="0">
                            <div className="background-login">
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default RestorePasswordPage
