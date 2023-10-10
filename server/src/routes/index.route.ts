import { Router } from 'express'
import AuthRouter from './auth.route'
import UsersRouter from './users.route'
import OrganizationRouter from './organizations.route'
import RolesRouter from './roles.route'
import PreUsersRouter from './pre-users.route'
import SurveysRouter from './surveys.route'
import SurveysResponseRouter from './surveys-response.route'
import FtpResponseRouter from './ftp.route'

const router = Router()

router.use('/api', AuthRouter)
router.use('/api/users', UsersRouter)
router.use('/api/organizations', OrganizationRouter)
router.use('/api/roles', RolesRouter)
router.use('/api/preUsers', PreUsersRouter)
router.use('/api/survey', SurveysRouter)
router.use('/api/survey-response', SurveysResponseRouter)
router.use('/api/ftp', FtpResponseRouter)

export default router
