import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonRow, IonTextarea } from "@ionic/react"
import { t } from "i18next"
import { add, cameraOutline, close, pencilOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Organization, Role } from "../../../interfaces/Role.interface"
import { ExecutionAlertModal } from "../../../modals"
import { organizationRouter, roleRouter } from "../../../router"

const OrganizationDetailContainer = () => {
    const id: {id: string} = useParams()
    const history = useHistory()
    const [roles, setRoles] = useState<Role[]>([])
    const [logo, setLogo] = useState('./assets/logo/logo.png')
    const [nameOrg, setNameOrg] = useState<string>('')
    const [emailOrg, setEmailOrg] = useState<string>('')
    const [phoneOrg, setPhoneOrg] = useState<string>('')
    const [descripOrg, setDescripOrg] = useState<string>('')
    const [openLoading, setOpenLoading] = useState<boolean>(false)
    const [messageLoading, setMessageLoading] = useState<string>('')
    const [openOrgSuccess, setOpenOrgSuccess] = useState<boolean>(false)
    useEffect(() => {
      if (id.id) {
        getOrgById(id.id)
      }
    },[])
    const changeLogo = () => {
        alert('En desarrollo')
    }
    const getOrgById = async (id: string) => {
        setMessageLoading(`${t('organization-detail:reading-org:loading:title')}`)
        setOpenLoading(true)
        try {
            const response = await organizationRouter.getOrgById(id)
            const org : Organization = response.data
            /* console.log(org) */
            setNameOrg(org.name)
            setEmailOrg(org.email)
            setPhoneOrg(org.phone)
            setDescripOrg(org.description ? org.description : '')
            if (org.logoUrl)
            setLogo(org.logoUrl)
            if (response) {
                setOpenLoading(false)
            }
            const responseRoles = await roleRouter.getRolesByOrg(id)
            setRoles(responseRoles.data)
        } catch (error) {
            
        }
    }
    const createOrg = async () => {
        setMessageLoading(`${t('organization-detail:creting-org:loading:title')}`)
        setOpenLoading(true)
        const org = {} as Organization
        org.name = nameOrg
        org.phone = phoneOrg
        org.email = emailOrg
        org.description = descripOrg
        try {
            const res = await organizationRouter.createOrganization(org)
            /* console.log(res) */
            setTimeout(() => {
                setOpenLoading(false)
                setOpenOrgSuccess(true)
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                setOpenLoading(false)
                alert('error')
            }, 1000);
        }
    }
    const editOrg = async () => {
        setMessageLoading(`${t('organization-detail:edit-org:loading:title')}`)
        setOpenLoading(true)
        const org = {} as Organization
        org._id = id.id
        org.name = nameOrg
        org.phone = phoneOrg
        org.email = emailOrg
        org.description = descripOrg
        try {
            const res = await organizationRouter.editOrganization(org)
            /* console.log(res) */
            setTimeout(() => {
                setOpenLoading(false)
                setOpenOrgSuccess(true)
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                setOpenLoading(false)
                alert('error')
            }, 1000);
        }
    }
    const closeExecutionAlert = () => {
        setOpenOrgSuccess(false)
        setNameOrg('')
        setEmailOrg('')
        setPhoneOrg('')
        setDescripOrg('')
    }
    const back = () => {
        history.goBack()
    }
    return (
        <IonContent>
            <IonLoading
                isOpen={openLoading}
                message={messageLoading}
            />
            <ExecutionAlertModal
                open={openOrgSuccess}
                closeModal={closeExecutionAlert}
                title={(id.id) ? `${t('organization-detail:edit-org:success:title')}` : `${t('organization-detail:creating-org:success:title')}`}
                text={(id.id) ? `${t('organization-detail:edit-org:success:text')}` : `${t('organization-detail:creating-org:success:text')}`}
                someFunction={back}
                isOk={true}
            />
            <IonGrid>
                <IonRow>
                    <IonCol sizeXl="3" sizeLg="4" sizeMd="12" sizeSm="12" sizeXs="12">
                        <div className="organization-detail-logo-column">
                            <img src={logo} alt="logo" className="organization-detail-logo" />
                            <br />
                            <IonButton style={{minWidth: 200, marginTop: 20}} fill={'outline'} color={'secondary'} onClick={changeLogo} >
                                <IonIcon icon={cameraOutline} style={{marginRight: 10}} />
                                {t('organization-detail:buttons:change-logo')}
                            </IonButton>
                        </div>
                    </IonCol>
                    <IonCol sizeXl="9" sizeLg="8" sizeMd="12" sizeSm="12" sizeXs="12">
                        <IonRow>
                            <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                <IonLabel className="item-org-label">
                                    {t('organization-detail:inputs:name').toUpperCase()}
                                </IonLabel>
                                <IonItem fill="outline" counter={true}>
                                    <IonInput
                                        value={nameOrg}
                                        maxlength={50}
                                        onIonChange={(e) => { setNameOrg(e.target.value as string) }}
                                        type="text"
                                        name={t('organization-detail:inputs-names:name')}
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXl="2" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                <IonLabel className="item-org-label">
                                    {t('organization-detail:inputs:contact').toUpperCase()}
                                </IonLabel>
                                <IonItem fill="outline" counter={true}>
                                    <IonInput
                                        value={phoneOrg}
                                        maxlength={15}
                                        onIonChange={(e) => { setPhoneOrg(e.target.value as string) }}
                                        type="tel"
                                        name={t('organization-detail:inputs-names:contact')}
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXl="4" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                <IonLabel className="item-org-label" position={'floating'} >
                                    {t('organization-detail:inputs:email').toUpperCase()}
                                </IonLabel>
                                <IonItem fill="outline" counter>
                                    <IonInput
                                        value={emailOrg}
                                        maxlength={50}
                                        onIonChange={(e) => { setEmailOrg(e.target.value as string) }}
                                        type="email"
                                        name={t('organization-detail:inputs-names:email')}
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXl="6" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                <IonLabel className="item-org-label" position={'floating'} >
                                    {t('organization-detail:inputs:description').toUpperCase()}
                                </IonLabel>
                                <IonItem fill="outline" counter={true}>
                                    <IonTextarea
                                        value={descripOrg}
                                        maxlength={250}
                                        autoGrow
                                        onIonChange={(e) => { setDescripOrg(e.target.value as string) }}
                                        rows={5}
                                        name={t('organization-detail:inputs-names:description')}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <br />
                        <IonRow hidden={id.id ? false : true}>
                            <IonCol>
                                <IonRow>
                                    <IonCol size="0.7">
                                        Index
                                    </IonCol>
                                    <IonCol size="1">
                                        Name
                                    </IonCol>
                                    <IonCol size="3">
                                        Description
                                    </IonCol>
                                    <IonCol size="3">
                                        Actions
                                    </IonCol>
                                </IonRow>
                                {
                                    roles.map((role, i) => {
                                        return (
                                            <IonRow key={i}>
                                                <IonCol size="0.7">
                                                    {i + 1}
                                                </IonCol>
                                                <IonCol size="1">
                                                    {role.name}
                                                </IonCol>
                                                <IonCol size="3">
                                                    {(role.description.length > 0) ? role.description : 'No description'}
                                                </IonCol>
                                                <IonCol size="3">
                                                    <IonButtons>
                                                        <IonButton disabled={(role.name === 'admin') ? true : false} fill={'clear'} size={'small'}>
                                                            <IonIcon icon={pencilOutline} />
                                                        </IonButton>
                                                    </IonButtons>
                                                </IonCol>
                                            </IonRow>
                                        )
                                    })
                                }
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                <IonButton className="button-org-detail" fill={'outline'} color={'secondary'} onClick={(id.id) ? editOrg : createOrg}>
                                    <IonIcon icon={add} style={{marginRight: 10}} />
                                    {(id.id) ? t('organization-detail:buttons:edit-org') : t('organization-detail:buttons:create-org')}
                                </IonButton>
                            </IonCol>
                            <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                <IonButton className="button-org-detail" fill={'outline'} color={'danger'} onClick={() => { history.goBack() }}>
                                    <IonIcon icon={close} style={{marginRight: 10}} />
                                    {t('organization-detail:buttons:cancel')}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default OrganizationDetailContainer
