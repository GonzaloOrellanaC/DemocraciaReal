import { IonContent } from "@ionic/react"
import { useState } from "react"

const FeedContainer = () => {
    const [feedList, setFeedList] = useState<any[]>([])


    return (
        <IonContent>
            {
                feedList.map((data, i) => {
                    return (
                        <div key={i}>

                        </div>
                    )
                })
            }
        </IonContent>
    )
}

export default FeedContainer