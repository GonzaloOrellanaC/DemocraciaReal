import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, /* IonLoading,  */IonNote } from '@ionic/react'
import { t } from 'i18next'
import { eyeOutline, eyeOffOutline } from 'ionicons/icons'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { useAuthContext } from '../../../context/Auth.context'

const LoginPage = () => {
    const {login} = useAuthContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [iconLookPassw, setIconLookPassw] = useState(eyeOutline)
    const [isTouched, setIsTouched] = useState(false)
    const [isValid, setIsValid] = useState<boolean>()
    const history = useHistory()

    const openPassw = () => {
        if (iconLookPassw === eyeOutline) {
            setIconLookPassw(eyeOffOutline)
        } else {
            setIconLookPassw(eyeOutline)
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

    const loginUser = async (e: any) => {
        e.preventDefault();
        const response: any = await login(email, password)
        if (response.response) {
            alert(response.response.data.message)
        }
    }

    return (
        <div className='login-container'>
            {/* <IonLoading
                isOpen={openLoading}
            /> */}
            <IonList>
                <form onSubmit={loginUser}>
                    <IonLabel style={{ marginRight: 10, textAlign: 'left' }}>
                        Email
                    </IonLabel>
                    <IonItem fill="outline" className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                        <IonInput
                            onIonBlur={markTouched}
                            style={{
                                textAlign: 'center',
                                fontSize: 18,
                                color: 'var(--ion-color-primary)'
                            }}
                            maxlength={45}
                            type={'email'}
                            onIonChange={(e) => {validate(e)}}
                            value={email}
                        />
                        <IonNote slot="helper">Enter a valid email</IonNote>
                        <IonNote slot="error">Invalid email</IonNote>
                    </IonItem>
                    <br />
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
                            maxlength={12}
                            type={(iconLookPassw === eyeOutline) ? 'password' : 'text'}
                            onIonChange={(e) => {setPassword(e.target.value as string)}}
                            value={password}
                        />
                        <IonButton color={'medium'} style={{position:'absolute', right:0, zIndex:2}} onClick={openPassw} fill={'clear'} slot={'end'} size={'default'}>
                            <IonIcon icon={iconLookPassw} />
                        </IonButton>
                    </IonItem>
                    <br />
                    <button style={{display: 'none'}} type={'submit'}>
                        {t('login:buttonName')}
                    </button>
                    <IonButton expand={'block'} onClick={loginUser}>
                        {t('login:buttonName')}
                    </IonButton>
                </form>
                <br />
                <IonButton color={'secondary'} expand={'block'} onClick={() => { history.push(`/${t('routes:registre')}`) }}>
                    {t('login:buttonRegistreName')}
                </IonButton>
                <br />
                <div style={{ textAlign: 'center', marginTop: 20, width: '100%', marginBottom: 0 }} >
                    <a className='to-restore-pss-link' onClick={() => { history.push(`/${t('routes:forgot-password')}`) }}>
                        {t('login:restore-password-link')}
                    </a>
                </div>
            </IonList>
        </div>
    )
}

export default LoginPage
