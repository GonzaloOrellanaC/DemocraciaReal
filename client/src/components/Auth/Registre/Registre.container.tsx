import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonNote } from "@ionic/react"
import { t } from "i18next"
import { arrowBack, logoFacebook, logoGoogle, mail } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { format, validate } from 'rut.js'
import preUsersRouter from "../../../router/pre-users.router"

const RegistreContainer = () => {
    const history = useHistory()
    const [isTouched, setIsTouched] = useState(false)
    const [isValid, setIsValid] = useState<boolean>()
    const [rut, setRut] = useState<string>('')
    const [haveUser, setHaveUser] = useState<boolean>(false)
    const sendRut = async () => {
        const response = await preUsersRouter.findPreUserByRun(rut)
        /* console.log(response.data) */
        setHaveUser(response.data.state)
        if (response.data.state) {
            alert('Su rut está registrado en nuestras bases de datos. Por favor presione botón "Continuar"')
        } else {
            if (response.data.message === 'user ir registered') {
                alert('Su rut ya aparece como registrado en la plataforma.')
            } else {
                alert('Su rut no está registrado en nuestras bases de datos. Si se inscribió al partido después del 30 de septiembre, espere hasta una nueva actualización')
            }
        }
    }
    const validateRut = (rut: string) => {
        return validate(rut)
    }
    const valid = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
        setIsValid(undefined)
        if (value === '-') {
            setRut('')
        } else if (value === '') {
            validateRut(value) !== null ? setIsValid(true) : setIsValid(false)
        }
        setRut(format(value))
    }
    const markTouched = () => {
        setIsTouched(true);
    }
    return (
        <div className='registre-container'>
            {/* <IonLabel style={{ marginRight: 10, textAlign: 'left' }}>
                Rut
            </IonLabel>
            <IonItem fill="outline" className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                <IonInput
                    placeholder="11.111.111-1"
                    onIonBlur={markTouched}
                    style={{
                        textAlign: 'center',
                        fontSize: 18,
                        color: 'var(--ion-color-primary)'
                    }}
                    maxlength={12}
                    type={'text'}
                    value={rut}
                    onIonChange={(e) => {valid(e)}}
                />
            </IonItem> */}
            {/* <br />
            <IonButton hidden={haveUser} expand={'block'} onClick={sendRut}>
                {t('registre:buttonName')}
            </IonButton> */}
            {/* <IonButton color={'danger'} expand={'block'}>
                <IonIcon style={{ marginRight: 10 }} icon={logoGoogle}/> Google
            </IonButton>
            <br />
            <IonButton style={{ '--background': '#4267B2' }} expand={'block'}>
                <IonIcon style={{ marginRight: 10 }} icon={logoFacebook}/> Facebook
            </IonButton>
            <br /> */}
            <IonButton color={'secondary'} expand={'block'} onClick={() => { history.push(`/${t('routes:registre-form')}`)}}>
                <IonIcon style={{ marginRight: 10 }} icon={mail}/> Con su email
            </IonButton>
            <br />
            <IonButton color={'primary'} expand={'block'} onClick={() => {history.goBack()}}>
                <IonIcon style={{ marginRight: 10 }} icon={arrowBack}/> {t('registre:buttonBackName')}
            </IonButton>
        </div>
    )
}

export default RegistreContainer
