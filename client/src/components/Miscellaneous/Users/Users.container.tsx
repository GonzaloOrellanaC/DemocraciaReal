import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonRow, IonSkeletonText, IonTitle, IonToolbar } from "@ionic/react"
import { t } from "i18next"
import { informationCircleOutline, pencilOutline } from 'ionicons/icons'
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getDateWithTime } from "../../../functions"
import { AddRoleModal, AddUserModal } from "../../../modals"
import { useUsersContext } from "../../../context/Users.context"

const UsersPage = () => {
    const {users} = useUsersContext()
    const [openCreateUser, setOpenCreateUser] = useState(false)
    const [openCreateRole, setOpenCreateRole] = useState(false)
    const [noData, setNoData] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if (users.length > 0) {
            setNoData(true)
        }
    }, [users])

    const closeModal = () => {
        setOpenCreateUser(false)
    }

    const closeRoleModal = () => {
        setOpenCreateRole(false)
    }

    const translateRole = (value: string) => {
        return t(`translate-from-database:${value}`)
    }

    /* const upFile = () => {
        const button = document.getElementById('excel');
        if (button != null) {
            button.click()
        }
    } */

    /* const uploadExcel = async (file: false | File | null) => {
        if(file) {
            const response = await preUsersRouter.loadPreUserExcel(file)
        }
    } */

    return (
        <IonContent>
            <AddUserModal open={openCreateUser} closeModal={closeModal} /* init={init} *//>
            <AddRoleModal open={openCreateRole} closeModal={closeRoleModal} /* init={init} */ />
            <IonToolbar>
                <IonTitle><strong>{t('users:title')}</strong></IonTitle>
            </IonToolbar>
            <div className='padding-left-20'>
                <IonGrid>
                    <IonRow className='border-bottom-1'>
                        <IonCol size='0.5'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('users:users-list:list:id').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='2'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('users:users-list:list:name').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('users:users-list:list:run').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1.5'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('users:users-list:list:role').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('users:users-list:list:organization').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1.5'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('users:users-list:list:date-created').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1.5'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('users:users-list:list:date-updated').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('users:users-list:list:status').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                        <IonCol size='1'>
                            <div className='organization-list-titles'>
                                <p>
                                    {t('users:users-list:list:action').toUpperCase()}
                                </p>
                            </div>
                        </IonCol>
                    </IonRow>
                    <div className="organizations-list-container">
                        {
                                ((users.length === 0) && noData)
                                &&
                                <IonRow>
                                    <IonCol>
                                        <IonLabel>
                                            <p>
                                                No hay datos
                                            </p>
                                        </IonLabel>
                                    </IonCol>
                                </IonRow>
                        }
                        {
                            ((users.length === 0) && !noData)
                            &&
                            <div>
                                <IonRow>
                                    <IonCol>
                                        <IonSkeletonText style={{ height: 48 }} animated={true}></IonSkeletonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonSkeletonText style={{ height: 48 }} animated={true}></IonSkeletonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonSkeletonText style={{ height: 48 }} animated={true}></IonSkeletonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonSkeletonText style={{ height: 48 }} animated={true}></IonSkeletonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonSkeletonText style={{ height: 48 }} animated={true}></IonSkeletonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonSkeletonText style={{ height: 48 }} animated={true}></IonSkeletonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonSkeletonText style={{ height: 48 }} animated={true}></IonSkeletonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonSkeletonText style={{ height: 48 }} animated={true}></IonSkeletonText>
                                    </IonCol>
                                </IonRow>
                            </div>
                        }
                    {
                        users.map((user, n) => {
                            return (
                                <IonRow key={n}>
                                    <IonCol size='0.5'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {user.idUser}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='2'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {user.name} {user.lastName}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='1'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {user.run}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='1.5'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {translateRole(user.roles[0].name)}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='1'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {user.organization[0] ? user.organization[0].name : 'Kauel'}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='1.5'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {getDateWithTime(new Date(user.createdAt))}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='1.5'>
                                        <div className='organization-list-titles'>
                                            <p>
                                                {getDateWithTime(new Date(user.updatedAt))}
                                            </p>
                                        </div>
                                    </IonCol>
                                    <IonCol size='1'>
                                        <div className='organization-list-titles'>
                                            {user.state
                                                ?
                                                <div className="state-org active-org">
                                                    {t('users:users-list:list:active-user')}
                                                </div>
                                                :
                                                <div className="state-org inactive-org">
                                                    {t('users:users-list:list:inactive-user')}
                                                </div>
                                                
                                            }
                                        </div>
                                    </IonCol>
                                    <IonCol size='1'>
                                        <div className='organization-list-titles'>
                                            <IonButtons className="organization-list-buttons-action">
                                                <IonButton size={'large'}>
                                                    <IonIcon icon={informationCircleOutline} />
                                                </IonButton>
                                                <IonButton size={'large'} onClick={() => {history.push(`/${t('routes:user-detail')}/${user._id}`)}}>
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

export default UsersPage
