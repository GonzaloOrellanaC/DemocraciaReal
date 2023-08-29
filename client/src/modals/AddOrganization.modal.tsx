import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import { add, close } from "ionicons/icons"
import { useState } from "react"
import { Organization } from "../interfaces/Role.interface"
import { organizationRouter } from "../router"

const AddOrganizationModal = ({open, closeModal}:{open: boolean, closeModal: () => void}) => {
    const [organizationName, setOrganizationName] = useState<string>('')
    const [organizationDescription, setOrganizationDescription] = useState<string>('')
    const createOrganization = async () => {
        const organization = {} as Organization
        organization.name = organizationName
        organization.description = organizationDescription
        const response = await organizationRouter.createOrganization(organization)
        if (response) {
            closeModal()
        }
    }
    return (
        <IonModal isOpen={open} trigger='open-modal' /* onWillDismiss={() => init()} */>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>Agregar Organización</IonTitle>
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
                                    value={organizationName}
                                    onIonChange={(e) => { setOrganizationName(e.target.value as string) }}
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
                                    value={organizationDescription}
                                    onIonChange={(e) => { setOrganizationDescription(e.target.value as string) }}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <br />
                    <IonButton onClick={createOrganization} expand={'block'}>
                        <IonIcon icon={add} style={{ marginRigth: 10 }} />
                        Agregar Organización
                    </IonButton>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}

export default AddOrganizationModal
