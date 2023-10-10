import { InputChangeEventDetail, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react"
import { useEffect, useState } from "react"
import { User } from "../../../interfaces/User.interface"

const RegistreContainer2 = () => {
    const [user, setUser] = useState<User>({name: '', lastName: '', email: ''} as User)

    useEffect(() => {
        console.log(user)
    }, [user])

    const inputChange = (e: any) => {
        console.log(e)
        const userCache : any = user
        if (e)
        userCache[e.target.name] = e.target.value
        console.log(userCache)
        setUser(userCache)
    }

    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        
                    </IonCol>
                    <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="10" sizeXs="12">
                        <form action="">
                            <IonItem>
                                <IonLabel position={'floating'}>Nombre</IonLabel>
                                <IonInput name="name" onIonChange={inputChange}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position={'floating'}>Apellido</IonLabel>
                                <IonInput name="lastName" onIonChange={inputChange}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position={'floating'}>Email</IonLabel>
                                <IonInput name="email" onIonChange={inputChange}/>
                            </IonItem>
                        </form>
                    </IonCol>
                    <IonCol>
                        
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default RegistreContainer2