import { Dispatch, SetStateAction } from "react";

export interface  PassingData {
    setIsAuth: Dispatch<SetStateAction<boolean>>
    /* setUserType: Dispatch<SetStateAction<string | undefined>> */
}