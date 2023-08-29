import { Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import i18next, {t} from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resources from './locales'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './App.style.css'
import { LoginPage, RestorePasswordPage, HomePage, OrganizationPage, UsersPage, NoPermissionPage, OrganizationDetailPage, UserDetailPage, SurveysPage, SurveysDetailPage, RegistrePage, RegistreFormPage, ResetPasswordPage, MySurveysPage, MySurveyDetailPage, SurveyResultsPage } from './pages'
import { useEffect } from 'react'
import { HeaderContainer, SideMenuContainer } from './components'
import socketConnection from './connections/socket.connection'
import { AuthProvider, useAuthContext } from './context/Auth.context'
import { OrganizationProvider } from './context/Organizations.context'
import { UsersProvider } from './context/Users.context'
import { SurveysProvider } from './context/Surveys.context'

setupIonicReact()

const ReactIonApp = () => {
  return (
    <IonApp>
      <AuthProvider>
        <OrganizationProvider>
          <UsersProvider>
            <SurveysProvider>
              <RouterApp />
            </SurveysProvider>
          </UsersProvider>
        </OrganizationProvider>
      </AuthProvider>
    </IonApp>
  )
}

const RouterApp = () => {
  const {isAuth} = useAuthContext()
  useEffect(() => {
    const routerEl = document.getElementById('main')
    if (isAuth) {
      if (routerEl) {
        routerEl.className = 'margin-left-100 margin-top-98 margin-right-20'
      }
      socketConnection.sendIsActive()
    } else {
      if (routerEl) {
        routerEl.className = ''
      }
    }
  },[isAuth])
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        ns: [],
        defaultNS: 'common',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        }
    })

  return (
    <IonReactRouter>
      {isAuth && <HeaderContainer />}
      {isAuth && <SideMenuContainer />}
      <IonRouterOutlet id='main'>
        <Route exact path="/">
          {isAuth ? <HomePage/> : <LoginPage />}
        </Route>
        <Route exact path={`/${t('routes:registre')}`}>
          <RegistrePage />
        </Route>
        <Route exact path={`/${t('routes:registre-form')}`}>
          <RegistreFormPage />
        </Route>
        <Route exact path={`/${t('routes:forgot-password')}`}>
          <RestorePasswordPage />
        </Route>
        <Route exact path={`/reset-password/:id`}>
          <ResetPasswordPage />
        </Route>
        <Route exact path={`/${t('routes:organizations')}`}>
          {isAuth ? <OrganizationPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:organization-detail')}`}>
          {isAuth ? <OrganizationDetailPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:organization-detail')}/:id`}>
          {isAuth ? <OrganizationDetailPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:users')}`}>
          {isAuth ? <UsersPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:user-detail')}`}>
          {isAuth ? <UserDetailPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:user-detail')}/:id`}>
          {isAuth ? <UserDetailPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:surveys')}`}>
          {isAuth ? <SurveysPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:survey-detail')}`}>
          {isAuth ? <SurveysDetailPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:survey-detail')}/:id`}>
          {isAuth ? <SurveysDetailPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:survey-results')}/:id`}>
          {isAuth ? <SurveyResultsPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:my-surveys')}`}>
          {isAuth ? <MySurveysPage /> : <NoPermissionPage />}
        </Route>
        <Route exact path={`/${t('routes:my-survey-detail')}/:id`}>
          {isAuth ? <MySurveyDetailPage /> : <NoPermissionPage />}
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => (
  <ReactIonApp />
);

export default App;
