import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react'
import { add, close } from 'ionicons/icons'
import { useState } from 'react'
import { roleRouter } from '../router'
import { Role } from '../interfaces/Role.interface'

const AddRoleModal = ({open, closeModal/* , init */}:{open: boolean, closeModal: () => void/* , init: () => void */}) => {
    const [roleName, setRoleName] = useState<string>('')
    const [roleDescription, setRoleDescription] = useState<string>('')
    /* const [globalRole, setGlobalRole] = useState<boolean>(true) */
    const createRole = async () => {
        const role = {} as Role
        role.name = roleName
        role.description = roleDescription
        try {
            const response = await roleRouter.createRole(role, true)
            /* console.log(response) */
            if (response) {
                closeModal()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <IonModal isOpen={open} trigger='open-modal' /* onWillDismiss={() => init()} */>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>Agregar Rol</IonTitle>
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
                                    value={roleName}
                                    onIonChange={(e) => { setRoleName(e.target.value as string) }}
                                />
                            </IonItem>
                        </IonCol>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position={'floating'}>
                                    Descripción
                                </IonLabel>
                                <IonTextarea
                                    rows={10}
                                    name='descripcion'
                                    value={roleDescription}
                                    onIonChange={(e) => { setRoleDescription(e.target.value as string) }}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <br />
                    <IonButton onClick={createRole} expand={'block'}>
                        <IonIcon icon={add} style={{ marginRigth: 10 }} />
                        Agregar Rol
                    </IonButton>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}

export default AddRoleModal
