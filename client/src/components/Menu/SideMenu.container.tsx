import { IonButton, IonContent, IonIcon } from "@ionic/react"
import { t } from "i18next"
import { briefcaseOutline, clipboardOutline, fileTrayStackedOutline, homeOutline, logOutOutline, peopleCircleOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { SideMenuButton } from "../../interfaces/Buttons.interface"
import { useAuthContext } from "../../context/Auth.context"
import { Logo } from "../../icons"

const SideMenuContainer = () => {
    const buttonList: SideMenuButton[] = [
        {
            id: 0,
            icon: homeOutline,
            url: '/',
            isActive: true,
            name: t('routesName:home'),
            permissionRole: ['SuperAdmin', 'admin', 'user']
        },
        {
            id: 1,
            icon: briefcaseOutline,
            url: `/${t('routes:organizations')}`,
            isActive: false,
            name: t('routesName:organizations'),
            permissionRole: ['SuperAdmin']
        },
        {
            id: 2,
            icon: peopleCircleOutline,
            url: `/${t('routes:users')}`,
            isActive: false,
            name: t('routesName:users'),
            permissionRole: ['SuperAdmin', 'admin']
        },
        {
            id: 3,
            icon: clipboardOutline,
            url: `/${t('routes:surveys')}`,
            isActive: false,
            name: t('routesName:surveys'),
            permissionRole: ['SuperAdmin', 'admin']
        },
        {
            id: 4,
            icon: fileTrayStackedOutline,
            url: `/${t('routes:my-surveys')}`,
            isActive: false,
            name: t('routesName:my-surveys'),
            permissionRole: ['SuperAdmin', 'admin', 'user']
        }
    ]
    
    const [buttons, setButtons] = useState<SideMenuButton[]>([])
    const {logout, user} = useAuthContext()
    const [typeUser, setTypeUser] = useState<string>('')
    const history = useHistory()

    useEffect(() => {
        if (user && user.roles && user.roles.length > 0) {
            init()
            setButtons(buttonList)
        }
    }, [user])
    
    const detectAndChangeStateButton = (pathname: string) => {
        const buttonListCache = [...buttonList]
        buttonListCache.forEach(button => {
            if (button.url === pathname) {
                button.isActive = true
            } else {
                button.isActive = false
            }
        })
        setButtons(buttonListCache)
    }
            
    const init = async () => {
        if (user) {
            setTypeUser(user.roles[0].name)
            detectAndChangeStateButton(history.location.pathname)
            history.listen(location => {
                detectAndChangeStateButton(location.pathname)
                const buttonsCache = [...buttonList]
            })
        }
    }

    const changeStateButton = (index: number) => {
        const buttonListCache = [...buttons]
        buttonListCache.forEach(button => {
            button.isActive = false
        })
        buttonListCache[index].isActive = true
        setButtons(buttonListCache)
    }
    
    return (
        <IonContent
            className="side-menu"
        >
            <div className="logo-side-menu-container" onClick={() => { history.push('/') }}>
                <img src={Logo} width={40} alt={'logo'} />
            </div>
            {
                buttons.map((button, n) => {
                    const el = button.permissionRole.find(element => typeUser === element)
                    if (el) {
                        return(
                            <IonButton title={button.name} key={n} fill={'clear'} size={'small'} className='side-menu-button' onClick={() => {history.replace(button.url); changeStateButton(n)}}>
                                <IonIcon color={button.isActive ? 'primary' : 'secondary'} icon={button.icon} />
                            </IonButton>
                        )
                    } else {
                        return ( null )
                    }
                })
            }
            <IonButton fill={'clear'} size={'small'} className='side-menu-button' onClick={logout}>
                <IonIcon color={'secondary'} icon={logOutOutline} />
            </IonButton>
        </IonContent>
    )
}

export default SideMenuContainer
