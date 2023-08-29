import { IonContent, IonPopover } from '@ionic/react'
import { Ref } from 'react'
import { roleNameResolve } from '../functions'
import { User } from '../interfaces/User.interface'
import './css/popovers.css'
import { useAuthContext } from '../context/Auth.context'

const UserPopover = ({trigger, popover, popoverOpen, activateUserPopover}:{trigger: string, popover: Ref<HTMLIonPopoverElement> | undefined, popoverOpen: boolean, activateUserPopover: () => void}) => {
    const {user} = useAuthContext()
    return (
        <IonPopover trigger={trigger} ref={popover} isOpen={popoverOpen} onIonPopoverWillDismiss={activateUserPopover}>
            <IonContent class='ion-padding'>
                <div className='user-popover-container'>
                    <img src='./assets/images/image-profile.png' width={100} style={{ borderRadius: '50%' }} alt={'profile'} />
                    <br />
                    <h3>{user?.name} {user?.lastName}</h3>
                    <h4>{roleNameResolve(user ? user.roles[0].name : '')}</h4>
                    {
                        (user?.organization[0])
                        &&
                        <p>{user.organization[0].name}</p>
                    }
                </div>
            </IonContent>
        </IonPopover>
    )
}

export default UserPopover
