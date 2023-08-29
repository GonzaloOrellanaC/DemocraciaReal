import { IonHeader, IonIcon, IonRippleEffect, IonToolbar } from "@ionic/react"
import { chevronDownOutline } from "ionicons/icons"
import { useEffect, useRef, useState } from "react"
import userIndexedDb from "../../indexedDb/user.indexedDb"
import { User } from "../../interfaces/User.interface"
import { UserPopover } from "../../popovers"

const HeaderContainer = () => {
    const popover = useRef<HTMLIonPopoverElement>(null)
    const [popoverOpen, setPopoverOpen] = useState(false)
    const activateUserPopover = () => {
        if (popoverOpen) {
            setPopoverOpen(false)
        } else {
            setPopoverOpen(true)
        }
    }

    return (
        <IonHeader className="ion-no-border" style={{zIndex: 1}}>
            <UserPopover trigger='click-trigger' popover={popover} popoverOpen={popoverOpen} activateUserPopover={activateUserPopover}/>
            <IonToolbar className="data-header">
                <div id='click-trigger' className="user-data-header ion-activatable ripple-parent" onClick={activateUserPopover}>
                    <div className="user-data-header-container">
                        <div className="user-data-header-container-left">
                            <img src="./assets/images/image-profile.png" width={30} alt={'profile'} />
                        </div>
                        <div className="user-data-header-container-right">
                            <IonIcon className="user-data-header-container-right-icon" slot="icon-only" icon={chevronDownOutline} />
                        </div>
                    </div>
                    <IonRippleEffect></IonRippleEffect>
                </div>
            </IonToolbar>
        </IonHeader>
    )
}

export default HeaderContainer
