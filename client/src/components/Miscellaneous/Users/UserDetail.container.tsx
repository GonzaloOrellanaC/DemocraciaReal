import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonRow, IonSelect, IonSelectOption } from "@ionic/react"
import { t } from "i18next"
import { add, cameraOutline, close, eyeOutline, eyeOffOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Organization, Role } from "../../../interfaces/Role.interface"
import { User } from "../../../interfaces/User.interface"
import { ExecutionAlertModal } from "../../../modals"
import { organizationRouter, roleRouter, usersRouter } from "../../../router"
import { format } from "rut.js"
import socketConnection from "../../../connections/socket.connection"
import logos from "../../../general/logos"
import { useRolesContext } from "../../../context/Roles.context"

const UserDetailContainer = ({org, closeModal, isRegistre}:{org?:Organization, closeModal?: () => void, isRegistre?: boolean}) => {
    /* const {roles} = useRolesContext() */
    const {getRolesByOrg} = useRolesContext()
    const id: {id: string} = useParams()
    const history = useHistory()
    const [profileImage, setProfileImage] = useState<string>('./assets/images/image-profile.png')
    const [userData, setUserData] = useState<User>()
    const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [run, setRun] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [role, setRole] = useState<string>()
    const [roles, setRoles] = useState<Role[]>([])
    const [institutions, setInstitutions] = useState<Organization[]>([])
    const [organization, setOrganization] = useState<string>()
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordType, setPasswordType] = useState<any>('password')
    const [confirmPasswordType, setConfirmPasswordType] = useState<any>('password')
    const [openLoading, setOpenLoading] = useState<boolean>(false)
    const [messageLoading, setMessageLoading] = useState<string>('')
    const [openOrgSuccess, setOpenOrgSuccess] = useState<boolean>(false)
    useEffect(() => {
        if (id.id) {
            setOpenLoading(true)
            initFromData(id.id)
        } else if (!isRegistre) {
            setProfileImage('./assets/images/image-profile.png')
            /* init() */
        } else if (isRegistre) {
            const rutCache = localStorage.getItem('rut')
            setRun(rutCache ? rutCache : '')
            getOrganization()
        }
    },[])

    useEffect(() => {
        if (userData) {

        }
    },[userData])

    const initFromData = async (id: string) => {
        const resolve = await usersRouter.getUserById(id)
        const user : User = resolve.data
        setUserData(user)
    }
    const changeProfileImage = () => {
        alert('En desarrollo')
    }


    useEffect(() => {
        if (userData) {
            init(userData)
        }
    },[userData])

    useEffect(() => {
        console.log(org)
        if (org) {
            getRoles()
        }
    },[org])

    useEffect(() => {
        if (roles.length > 0) {
            if (userData) {
                setProfileImage(userData.profileImage ? userData.profileImage : profileImage)
                setName(userData.name)
                setLastName(userData.lastName)
                setRun(userData.run)
                setEmail(userData.email)
                setPhone(userData.phone)
                setRole(userData.roles[0]._id)
                setOpenLoading(false)
            }
        }
    },[roles])

    const getRoles = async () => {
        let res: any
        if (org) {
            res = await getRolesByOrg(org)
            setRoles(res)
        }
    }

    const init = async (user: User) => {
        const res = (org) ? await roleRouter.getRolesByOrg(org._id) : ((user?.organization[0]) ? await roleRouter.getRolesByOrg(user?.organization[0]._id) : await roleRouter.getRolesAdmin())
        setRoles(res.data)
    }
    const getOrganization = async () => {
        const response = await organizationRouter.readAllOrgs()
        setInstitutions(response.data)
    }
    const saveUser = async () => {
        if (
            name &&
            lastName &&
            run &&
            email
        ) {
            const user = {} as User
            if (id.id) {
                user._id = id.id
            }
            if (isRegistre && organization) {
                user.organization = [{_id: organization} as Organization]
                const responseRoles = await roleRouter.getRolesByOrg(organization)
                const roleListCache: Role[] = responseRoles.data
                roleListCache.forEach(role => {
                    if (role.name === 'user') {
                        user.roles = [{_id: role._id} as Role]
                    }
                })
            } else if (org) {
                user.organization = [org]
            }
            const roleSelected = roles.filter((roleItem) => {
                if (roleItem._id === role) {
                    return role
                }
            })
            user.name = name
            user.lastName = lastName
            user.run = run
            user.phone = phone
            if (!isRegistre) {
                user.roles = role ? roleSelected : []
            } else {

            }
            user.email = email
            if (id.id) {
                const messageEdit : string = t('userDetail:editUser:loading:title')
                setMessageLoading(messageEdit)
                setOpenLoading(true)
                const resolve = await usersRouter.editUser(user)
                if (resolve) {
                    setTimeout(() => {
                        setOpenLoading(false)
                        setOpenOrgSuccess(true)
                        if (!isRegistre) {
                            socketConnection.nuevoUsuarioCreado()
                        }
                    }, 1000)
                }
            } else {
                user.password = password
                if (password === confirmPassword) {
                    const messageCreate: string = t('userDetail:creatingUser:loading:title')
                    setMessageLoading(messageCreate)
                    setOpenLoading(true)
                    const resolve = await usersRouter.createUser(user)
                    if (resolve) {
                        setTimeout(() => {
                            setOpenLoading(false)
                            setOpenOrgSuccess(true)
                            if (!isRegistre) {
                                socketConnection.nuevoUsuarioCreado()
                            }
                        }, 1000)
                    }
                } else {
                    alert(t('userDetail:creatingUser:confirmPasswordError:text'))
                }
            }
        } else {
            alert('Faltan datos')
        }
    }
    const translateRole = (value: string) => {
        return t(`translate-from-database:${value}`)
    }
    const setRunFormat = (value: string) => {
        if (value.length > 1) {
            setRun(format(value))
        } else if(value === '-') {
            setRun('')
        } else {
            setRun('')
        }
    }
    const closeExecutionAlert = () => {
        setOpenOrgSuccess(false)
        setName('')
        setLastName('')
        setRole(undefined)
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }
    const back = () => {
        if(!org) {
            closeExecutionAlert()
            if (isRegistre) {
                history.replace('/')
            } else {
                history.goBack()
            }
        } else {
            if (closeModal) closeModal()
        }
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
                title={(id.id) ? t('userDetail:editUser:success:title') :t('userDetail:creatingUser:success:title')}
                text={(id.id) ? t('userDetail:editUser:success:text') : t('userDetail:creatingUser:success:text')}
                someFunction={back}
                isOk={true}
            />
            <IonGrid>
                <IonRow>
                    {isRegistre && <IonCol size={'12'}>
                        <div className="login-title">
                            <img src={logos.logo} width={70} alt={'logo'} />
                            <h1 style={{fontSize:32}}><strong>Registro de usuario</strong></h1>
                        </div>
                    </IonCol>}
                    {!isRegistre && <IonCol sizeXl='3' sizeLg='4' sizeMd='12' sizeSm='12' sizeXs='12'>
                        <div className='organization-detail-logo-column'>
                            <img src={profileImage} alt='logo' className='organization-detail-logo' />
                            <br />
                            <IonButton style={{minWidth: 200, marginTop: 20}} fill={'outline'} color={'secondary'} onClick={changeProfileImage} >
                                <IonIcon icon={cameraOutline} style={{marginRight: 10}} />
                                {t('userDetail:buttons:change-image-profile')}
                            </IonButton>
                        </div>
                    </IonCol>}
                    <IonCol sizeXl={!isRegistre ? '9' : '12'} sizeLg={!isRegistre ? '8' : '12'} sizeMd={'12'} sizeSm='12' sizeXs='12'>
                        <IonRow>
                            <IonCol sizeXl='3' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <p>(*) Datos obligatorios</p>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeXl='4' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonLabel className='item-user-label'>
                                    {t('userDetail:inputs:name').toUpperCase()}*
                                </IonLabel>
                                <IonItem fill='outline' counter={true}>
                                    <IonInput
                                        value={name}
                                        maxlength={15}
                                        onIonChange={(e) => { setName(e.target.value as string) }}
                                        type='text'
                                        name={t('userDetail:inputs-names:name')}
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXl='4' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonLabel className='item-user-label'>
                                    {t('userDetail:inputs:lastname').toUpperCase()}*
                                </IonLabel>
                                <IonItem fill='outline' counter={true}>
                                    <IonInput
                                        value={lastName}
                                        maxlength={15}
                                        onIonChange={(e) => { setLastName(e.target.value as string) }}
                                        type='text'
                                        name={t('userDetail:inputs-names:lastname')}
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXl='4' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonLabel className='item-user-label'>
                                    {t('userDetail:inputs:run').toUpperCase()}
                                </IonLabel>
                                <IonItem fill='outline' counter={true}>
                                    <IonInput
                                        disabled={isRegistre}
                                        value={run}
                                        maxlength={13}
                                        onIonChange={(e) => { setRunFormat(e.target.value as string) }}
                                        type='text'
                                        name={t('userDetail:inputs-names:run')}
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonLabel className='item-user-label'>
                                    {t('userDetail:inputs:phone').toUpperCase()}
                                </IonLabel>
                                <IonItem fill='outline' counter={true}>
                                    <IonInput
                                        value={phone}
                                        maxlength={15}
                                        onIonChange={(e) => { setPhone(e.target.value as string) }}
                                        type={'tel'}
                                        name={t('userDetail:inputs-names:phone')}
                                    />
                                </IonItem>
                            </IonCol>
                            {!isRegistre && <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonLabel className='item-user-label'>
                                    {t('userDetail:inputs:role').toUpperCase()}*
                                </IonLabel>
                                <IonItem fill='outline' counter={true}>
                                    <IonSelect value={role} onIonChange={(e) => { setRole(e.detail.value) }} interface={'alert'} name={t('userDetail:inputs-names:role')}>
                                        {
                                            roles.map((rol, i) => {
                                                return (
                                                    <IonSelectOption value={rol._id} key={i}>
                                                        {translateRole(rol.name)}
                                                    </IonSelectOption>
                                                )
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                            </IonCol>}
                            {isRegistre && <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonLabel className='item-user-label'>
                                    {t('userDetail:inputs:institution').toUpperCase()}*
                                </IonLabel>
                                <IonItem fill='outline' counter={true}>
                                    <IonSelect value={organization} interfaceOptions={
                                        {
                                            header: 'Seleccione la institución',
                                            subHeader: 'Elija a la cual pertenece',
                                            message: 'Elija solo una',
                                            cssClass: 'select-org',
                                            translucent: true
                                        }
                                    } onIonChange={(e) => { setOrganization(e.detail.value) }} interface={'alert'} name={t('userDetail:inputs-names:role')}>
                                        {
                                            institutions.map((organization, i) => {
                                                return (
                                                    <IonSelectOption value={organization._id} key={i}>
                                                        {organization.name}
                                                    </IonSelectOption>
                                                )
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                            </IonCol>}
                            <IonCol sizeXl='4' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                                <IonLabel className='item-user-label' position={'floating'} >
                                    {t('userDetail:inputs:email').toUpperCase()}*
                                </IonLabel>
                                <IonItem fill='outline' counter={true}>
                                    <IonInput
                                        value={email}
                                        type={'email'}
                                        maxlength={50}
                                        onIonChange={(e) => { setEmail(e.target.value as string) }}
                                        name={t('userDetail:inputs-names:email')}
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol hidden={id.id ? true : false} sizeXl='4' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonLabel className='item-user-label' position={'floating'} >
                                    {t('userDetail:inputs:password').toUpperCase()}*
                                </IonLabel>
                                <IonItem fill='outline' counter>
                                    <IonInput
                                        value={password}
                                        type={passwordType}
                                        maxlength={10}
                                        onIonChange={(e) => { setPassword(e.target.value as string) }}
                                        name={t('userDetail:inputs-names:password')}
                                    />
                                    <IonButton fill={'clear'} size={'default'} onClick={() => { (passwordType === 'text') ? setPasswordType('password') : setPasswordType('text') }}>
                                        <IonIcon icon={(passwordType === 'text') ? eyeOutline : eyeOffOutline} />
                                    </IonButton>
                                </IonItem>
                            </IonCol>
                            <IonCol hidden={id.id ? true : false} sizeXl='4' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonLabel className='item-user-label' position={'floating'} >
                                    {t('userDetail:inputs:confirm-password').toUpperCase()}*
                                </IonLabel>
                                <IonItem fill='outline' counter>
                                    <IonInput
                                        value={confirmPassword}
                                        type={confirmPasswordType}
                                        maxlength={10}
                                        onIonChange={(e) => { setConfirmPassword(e.target.value as string) }}
                                        name={t('userDetail:inputs-names:confirm-password')}
                                    />
                                    <IonButton fill={'clear'} size={'default'} onClick={() => { (confirmPasswordType === 'text') ? setConfirmPasswordType('password') : setConfirmPasswordType('text') }}>
                                        <IonIcon icon={(confirmPasswordType === 'text') ? eyeOutline : eyeOffOutline} />
                                    </IonButton>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeXl='3' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <p>(*) Datos obligatorios</p>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeXl='3' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonButton expand={'block'} className='button-userDetail' fill={'outline'} color={'secondary'} onClick={saveUser}>
                                    <IonIcon icon={add} style={{marginRight: 10}} />
                                    {(id.id) ? t('userDetail:buttons:editUser') : t('userDetail:buttons:createUser')}
                                </IonButton>
                            </IonCol>
                            <IonCol sizeXl='3' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12'>
                                <IonButton expand={'block'} className='button-userDetail' fill={'outline'} color={'danger'} onClick={back}>
                                    <IonIcon icon={close} style={{marginRight: 10}} />
                                    {t('userDetail:buttons:cancel')}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default UserDetailContainer
