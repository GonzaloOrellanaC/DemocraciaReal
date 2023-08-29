import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonLoading, IonNote, IonPage } from "@ionic/react"
import { t } from "i18next"
import { useState } from "react"
import { useHistory } from "react-router"
import { authRouter } from "../../../router"

const RestorePasswordPage = () => {
    const [email, setEmail] = useState<string>('')
    const [openLoading, setOpenLoading] = useState(false)
    const [isTouched, setIsTouched] = useState(false)
    const [isValid, setIsValid] = useState<boolean>()
    const history = useHistory()
    const restorePassword = async () => {
        setOpenLoading(true)
        const response = await authRouter.restorePassword(email)
        if (response) {
            /* console.log(response) */
            setOpenLoading(false)
            alert('Correo de restablecimiento de contraseña enviado. Si no ve el correo en su bandeja de entrada, revise los spams.')
            history.goBack()
        }
    }
    const validateEmail = (email: string) => {
        return email.match(
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        )
    }
    
    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
    
        setIsValid(undefined)
    
        if (value === '') return
    
        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false)

        setEmail(value)
    }
    
    const markTouched = () => {
        setIsTouched(true);
    }
    return (
        <div className='login-container'>
            <IonLoading
                isOpen={openLoading}
            />
            
            <IonList>
                <IonLabel style={{ marginRight: 10, textAlign: 'left' }}>
                    Email
                </IonLabel>
                <IonItem fill="outline" className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                    {/* <IonLabel position={'floating'} color={'primary'}>
                        Email
                    </IonLabel> */}
                    <IonInput
                        onIonBlur={markTouched}
                        style={{
                            textAlign: 'center',
                            fontSize: 18,
                            color: 'var(--ion-color-primary)'
                        }}
                        maxlength={30}
                        type={'email'}
                        onIonChange={(e) => {validate(e)}}
                    />
                    <IonNote slot="helper">Enter a valid email</IonNote>
                    <IonNote slot="error">Invalid email</IonNote>
                </IonItem>
                <br />
                <IonButton expand={'block'} onClick={restorePassword}>
                    {t('forgot-password:buttonName')}
                </IonButton>
                <IonButton expand={'block'} onClick={() => { history.goBack() }} color={'medium'}>
                    {t('forgot-password:backButtonName')}
                </IonButton>
            </IonList>
        </div>
    )
}

export default RestorePasswordPage
