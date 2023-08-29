import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonRow } from '@ionic/react'
import { t } from 'i18next'
import { briefcaseOutline, clipboardOutline, fileTrayStackedOutline, peopleCircleOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { ExecutionAlertModal } from '../../../modals'
import { useAuthContext } from '../../../context/Auth.context'

const HomePage = () => {
    const {isAuth, user} = useAuthContext()
    const history = useHistory()
    const [typeUser, setTypeUser] = useState<string>('')
    
    useEffect(() => {
        if (isAuth) {
            if (user && user.roles && user.roles.length > 0) {
                init()
            }
        }
    }, [isAuth, user])

    const init = async () => {
        if (user) {
            setTypeUser(user.roles[0].name)
        }
    }
    
    const buttons = [
        { id: 0, name: t('routesName:organizations'), path: `/${t('routes:organizations')}`, title: t('routesName:organizations'), icon: briefcaseOutline, permissionRole: ['SuperAdmin'] },
        { id: 1, name: t('routesName:users'), path: `/${t('routes:users')}`, title: t('routesName:users'), icon: peopleCircleOutline, permissionRole: ['SuperAdmin', 'admin'] },
        { id: 2, name: t('routesName:surveys'), path: `/${t('routes:surveys')}`, title: t('routesName:surveys'), icon: clipboardOutline, permissionRole: ['SuperAdmin', 'admin'] },
        { id: 3, name: t('routesName:my-surveys'), path: `/${t('routes:my-surveys')}`, title: t('routesName:my-surveys'), icon: fileTrayStackedOutline, permissionRole: ['SuperAdmin', 'admin', 'user'] }
    ]

    return (
        <IonContent>
            <ExecutionAlertModal hidden={false} open={false} title={'Your Message was delivered!'} text={'You will receive support through email'} isOk={true}/>
            <IonGrid>
                <IonRow>
                    <IonCol sizeXl='1' sizeLg='1' sizeMd='0' sizeSm='0' sizeXs='0'>
                    </IonCol>
                    <IonCol sizeXl='10' sizeLg='10' sizeMd='12' sizeSm='12' sizeXs='12'>
                        <IonRow>
                            {
                                buttons.map((button, index) => {
                                    const el = button.permissionRole.find(element => typeUser === element)
                                    if (el) {
                                        return (
                                            <IonCol key={index} sizeXl='4' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12'>
                                                <div style={{ padding: 5 }}>
                                                    <IonCard button onClick={() => { history.push(button.path) }} title={button.title}>
                                                        <IonCardContent style={{textAlign: 'center', paddingTop: 50, paddingBottom: 30, height: '35vh'}}>
                                                            <IonIcon color='primary' icon={button.icon} style={{fontSize: 80}}/>
                                                            <p style={{fontSize: 18, marginTop: 40}}><strong>{button.name}</strong></p>
                                                        </IonCardContent>
                                                    </IonCard>
                                                </div>
                                            </IonCol>
                                        )
                                    } else {
                                        return ( null )
                                    }
                                })
                            }
                        </IonRow>
                    </IonCol>
                    <IonCol sizeXl='1' sizeLg='1' sizeMd='0' sizeSm='0' sizeXs='0'>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default HomePage
