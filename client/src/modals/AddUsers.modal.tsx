import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { add, close, eye, eyeOff } from 'ionicons/icons'
import { useState } from 'react'
import { User } from '../interfaces/User.interface'
import { format } from 'rut.js'
import { usersRouter } from '../router'

const AddUserModal = ({open, closeModal/* , init */}:{open: boolean, closeModal: () => void/* , init: () => void */}) => {
    const [nombre, setNombre] = useState<string>('')
    const [apellido, setApellido] = useState<string>('')
    const [run, setRun] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordType, setPasswordType] = useState<any>('password')
    const [iconName, setIconName] = useState<any>(eye)
    const createUser = async () => {
        const user = {} as User
        user.name = nombre
        user.lastName = apellido
        user.run = run
        user.email = email
        user.password = password
        user.phone = tel
        const response = await usersRouter.createUser(user)
        if (response) {
            closeModal()
        }
    }
    const changeRunFormat = (value: string) => {
        /* console.log(format(value)) */
        setRun((value.length > 0) ? format(value) : '')
    }
    const changeTypePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
            setIconName(eyeOff)
        } else {
            setPasswordType('password')
            setIconName(eye)
        }
    }
    return (
        <IonModal isOpen={open} trigger='open-modal' /* onWillDismiss={() => init()} */>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>Agregar Usuario</IonTitle>
                    <IonButtons slot='end'>
                    <IonButton strong={true} onClick={() => closeModal()}>
                        <IonIcon icon={close} />
                    </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonGrid>
                    <IonRow>
                        <IonCol size='6'>
                            <IonItem>
                                <IonLabel position={'floating'}>
                                    Nombre
                                </IonLabel>
                                <IonInput
                                    type={'text'}
                                    name='nombre'
                                    value={nombre}
                                    onIonChange={(e) => { setNombre(e.target.value as string) }}
                                />
                            </IonItem>
                        </IonCol>
                        <IonCol size='6'>
                            <IonItem>
                                <IonLabel position={'floating'}>
                                    Apellido
                                </IonLabel>
                                <IonInput
                                    type={'text'}
                                    name='apellido'
                                    value={apellido}
                                    onIonChange={(e) => { setApellido(e.target.value as string) }}
                                />
                            </IonItem>
                        </IonCol>
                        <IonCol size='6'>
                            <IonItem>
                                <IonLabel position={'floating'}>
                                    Run
                                </IonLabel>
                                <IonInput
                                    type={'text'}
                                    name='run'
                                    value={(run.length > 0) ? format(run) : ''}
                                    maxlength={12}
                                    onIonChange={(e) => { changeRunFormat(e.target.value as string) }}
                                />
                            </IonItem>
                        </IonCol>
                        <IonCol size='6'>
                            <IonItem>
                                <IonLabel position={'floating'}>
                                    Telefono
                                </IonLabel>
                                <IonInput
                                    type={'text'}
                                    name='telefono'
                                    value={tel}
                                    onIonChange={(e) => { setTel(e.target.value as string) }}
                                />
                            </IonItem>
                        </IonCol>
                        <IonCol size='6'>
                            <IonItem>
                                <IonLabel position={'floating'}>
                                    Email
                                </IonLabel>
                                <IonInput
                                    type={'text'}
                                    name='email'
                                    value={email}
                                    maxlength={12}
                                    onIonChange={(e) => { setEmail(e.target.value as string) }}
                                />
                            </IonItem>
                        </IonCol>
                        <IonCol size='6'>
                            <IonItem>
                                <IonLabel position={'floating'}>
                                    Password
                                </IonLabel>
                                <IonInput
                                    type={passwordType}
                                    name='password'
                                    onIonChange={(e) => { setPassword(e.target.value as string) }}
                                />
                                <IonButton fill={'clear'} size={'small'} slot='end' onClick={changeTypePassword}>
                                    <IonIcon icon={iconName} />
                                </IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <br />
                    <IonButton onClick={createUser} expand={'block'}>
                        <IonIcon icon={add} style={{ marginRigth: 10 }} />
                        Agregar Usuario
                    </IonButton>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}

export default AddUserModal
