import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { t } from "i18next"
import { add, informationCircleOutline, pencilOutline, personAddOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getDateWithTime } from "../../../functions"
import { Organization } from "../../../interfaces/Role.interface"
import { AddNewUserModal, AddOrganizationModal } from "../../../modals"
import { organizationRouter } from "../../../router"
import { useOrganizationContext } from "../../../context/Organizations.context"

const OrganizationPage = () => {
    const {institutions} = useOrganizationContext()
    const [openNewOrganizationModal, setNewOrganizationModal] = useState(false)
    const [openAddNewUserModal, setAddNewUserModal] = useState(false)
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [organization, setOrganization] = useState<Organization>()
    const history = useHistory()
    useEffect(() => {
        console.log(institutions)
        setOrganizations(institutions)
        /* init() */
    }, [institutions])
    /* const init = async () => {
        const res = await organizationRouter.readAllOrgs()
        const orgs: Organization[] = res.data
        setOrganizations(orgs)
    } */
    const closeModalOrganization = () => {
        setNewOrganizationModal(false)
    }
    const closeModalNewUser = () => {
        setAddNewUserModal(false)
    }
    const openAddNewUser = (org: Organization) => {
        /* console.log(org) */
        setAddNewUserModal(true)
        setOrganization(org)
    }
    return (
        <IonContent>
            <AddNewUserModal open={openAddNewUserModal} closeModal={closeModalNewUser} org={organization} /* someFunction={init} */ />
            <AddOrganizationModal open={openNewOrganizationModal} closeModal={closeModalOrganization} /* init={init} */ />
            <IonToolbar>
                <IonTitle><strong>{t('organizations:title')}</strong></IonTitle>
            </IonToolbar>
            <IonToolbar>
                <IonButton slot="end" fill={'outline'} color={'secondary'} onClick={() => {history.push(`/${t('routes:organization-detail')}`)}}>
                    <IonIcon icon={add} />
                    {t('organizations:buttons:create-org')}
                </IonButton>
            </IonToolbar>
            <div className='padding-left-20'>
                <IonGrid>
                    <IonRow className='border-bottom-1'>
                        <IonCol size='1'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('organizations:organization-list:list:id').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='3'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('organizations:organization-list:list:name-org').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='2'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('organizations:organization-list:list:date-created').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='2'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('organizations:organization-list:list:date-updated').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('organizations:organization-list:list:users').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1.5'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('organizations:organization-list:list:status').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1.5'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('organizations:organization-list:list:action').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                    </IonRow>
                    <div className="organizations-list-container">
                    {
                        organizations.map((org, n) => {
                            return (
                                <IonRow key={n}>
                                    <IonCol size='1'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {org.idOrg}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='3'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {org.name}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='2'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {getDateWithTime(new Date(org.createdAt))}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='2'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {getDateWithTime(new Date(org.updatedAt))}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='1'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {org.users.length}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='1.5'>
                                        <div className='organization-list-titles'>
                                            {org.state
                                                ?
                                                <div className="state-org active-org">
                                                    {t('organizations:organization-list:list:active-org')}
                                                </div>
                                                :
                                                <div className="state-org inactive-org">
                                                    {t('organizations:organization-list:list:inactive-org')}
                                                </div>
                                            }
                                        </div>
                                    </IonCol>
                                    <IonCol size='1.5'>
                                        <div className='organization-list-titles'>
                                            <IonButtons className="organization-list-buttons-action">
                                                <IonButton size={'large'} onClick={() => { openAddNewUser(org) }}>
                                                    <IonIcon icon={personAddOutline} />
                                                </IonButton>
                                                <IonButton size={'large'}>
                                                    <IonIcon icon={informationCircleOutline} />
                                                </IonButton>
                                                <IonButton size={'large'} onClick={() => {history.push(`/${t('routes:organization-detail')}/${org._id}`)}}>
                                                    <IonIcon icon={pencilOutline} />
                                                </IonButton>
                                            </IonButtons>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            )
                        })
                    }
                    </div>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default OrganizationPage
