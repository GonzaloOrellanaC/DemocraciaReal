import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react"
import { t } from "i18next"
import { LoginContainer } from "../../../components"
import { PassingData } from "../../../interfaces/PassingData.interface"
import { Logo } from "../../../icons"

const LoginPage = () => {
    return (
        <IonPage>
            <IonContent>
                <IonGrid className="no-padding-style">
                    <IonRow>
                        <IonCol /* sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12" */>
                            <div>
                                 <IonRow>
                                    <IonCol></IonCol>
                                    <IonCol sizeXl="3" sizeLg="4" sizeMd="8" sizeSm="12" sizeXs="12" style={{ height: 'calc(100vh - 300px)', display: 'block' }}>
                                        <div style={{ height: 'calc(100vh - 300px)', display: 'block' }}>
                                            <div className="login-title">
                                                <img src={Logo} width={200} alt={'logo'} />
                                                {/* <h3 style={{fontSize:32}}><strong>{t('login:title')}</strong></h3> */}
                                            </div>
                                            <LoginContainer />
                                            {/* <div className="data-platform">
                                                <p>Plataforma desarrollada por el <strong>Equipo de Comunicaciones del Partido de la Gente de la Región de Valparaíso</strong></p>
                                                <a href="https://www.linkedin.com/in/gonzaloorellanac/" target={'_blank'}>Contacta al desarrollador.</a>
                                            </div> */}
                                        </div>
                                    </IonCol>
                                    <IonCol></IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                        {/* <IonCol className="no-padding-style" sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="0" sizeXs="0">
                            <div className="background-login">
                            </div>
                        </IonCol> */}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage
