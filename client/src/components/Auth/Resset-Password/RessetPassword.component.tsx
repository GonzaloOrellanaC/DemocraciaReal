import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonLoading } from "@ionic/react"
import { t } from "i18next"
import { eyeOffOutline, eyeOutline } from "ionicons/icons"
import { useState } from "react"
import { useHistory, useParams } from "react-router"
import { authRouter } from "../../../router"

const RessetPasswordContainer = () => {
    const history = useHistory()
    const param: {id: string} = useParams()
    const [openLoading, setOpenLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [confPassword, setConfPassword] = useState<string>('')
    const [typePassword, setTypePassword] = useState<any>('password')
    const [typeConfirmPassword, setTypeConfirmPassword] = useState<any>('password')
    const [iconLookPassw, setIconLookPassw] = useState(eyeOutline)
    const [iconLookConfirmPassw, setIconLookConfirmPassw] = useState(eyeOutline)

    const restorePassword = async () => {
        if (password.length > 1) {
            if (confPassword.length > 1) {
                if (password === confPassword) {
                    setOpenLoading(true)
                    const response = await authRouter.resetPassword(param.id, password)
                    if (response) {
                        /* console.log(response) */
                        setTimeout(() => {
                            setOpenLoading(false)
                            if (response.message === 'password reset') {
                                alert('Contraseña cambiada.')
                                history.replace('/')
                            }
                        }, 1000);
                    }
                } else {
                    alert('Debe ingresar la misma contraseña.')
                }
            } else {
                alert('Debe ingresar datos para confirmar la password')
            }
        } else {
            alert('Debe ingresar datos en Password')
        }
    }

    const changeTypePassword = () => {
        if (typePassword === 'password') {
            setTypePassword('text')
            setIconLookPassw(eyeOffOutline)
        } else {
            setTypePassword('password')
            setIconLookPassw(eyeOutline)
        }
    }

    const changeTypeConfirmPassword = () => {
        if (typeConfirmPassword === 'password') {
            setTypeConfirmPassword('text')
            setIconLookConfirmPassw(eyeOffOutline)
        } else {
            setTypeConfirmPassword('password')
            setIconLookConfirmPassw(eyeOutline)
        }
    }
    return (
        <div>
            <IonLoading
                isOpen={openLoading}
            />
            
            <IonList>
                <IonLabel style={{ marginRight: 10, textAlign: 'left' }}>
                    Password
                </IonLabel>
                <IonItem fill="outline">
                    <IonInput
                        style={{
                            textAlign: 'center',
                            fontSize: 18,
                            color: 'var(--ion-color-primary)'
                        }}
                        maxlength={30}
                        type={typePassword}
                        onIonChange={(e) => {setPassword(e.target.value ? e.target.value.toString() : '')}}
                    />
                    <IonButton color={'medium'} style={{position:'absolute', right:0, zIndex:2}} onClick={changeTypePassword} fill={'clear'} slot={'end'} size={'default'}>
                        <IonIcon icon={iconLookPassw} />
                    </IonButton>
                </IonItem>
                <br />
                <IonLabel style={{ marginRight: 10, textAlign: 'left' }}>
                    Confirme Password
                </IonLabel>
                <IonItem fill="outline">
                    <IonInput
                        style={{
                            textAlign: 'center',
                            fontSize: 18,
                            color: 'var(--ion-color-primary)'
                        }}
                        maxlength={30}
                        type={typeConfirmPassword}
                        onIonChange={(e) => {setConfPassword(e.target.value ? e.target.value.toString() : '')}}
                    />
                    <IonButton color={'medium'} style={{position:'absolute', right:0, zIndex:2}} onClick={changeTypeConfirmPassword} fill={'clear'} slot={'end'} size={'default'}>
                        <IonIcon icon={iconLookConfirmPassw} />
                    </IonButton>
                </IonItem>
                <br />
                <IonButton expand={'block'} onClick={restorePassword}>
                    {t('forgot-password:buttonName')}
                </IonButton>
            </IonList>
        </div>
    )
}

export default RessetPasswordContainer
