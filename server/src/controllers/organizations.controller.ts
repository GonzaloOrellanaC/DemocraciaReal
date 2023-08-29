import { CreateOrgDto } from '@/dtos/organizations.dto'
import { RequestWithUser } from '@/interfaces/auth.interface'
import { Organization } from '@/interfaces/roles.interface'
import organizationsService from '@/services/organization.service'
import { NextFunction, Request, Response } from 'express'
import AccessControlServices from '@/services/accessControl.service'
import { admin, user, superAdmin, seller } from '@/configs/roles.config'
/**
 * Creates a new organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const createOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orgInfo: Organization/* CreateOrgDto */ = req.body
        const findAllOrgs: Organization[] = await organizationsService.getOrganizations()
        orgInfo.idOrg = findAllOrgs.length + 1
        const newOrganization = await organizationsService.createOrganization(orgInfo)
        await AccessControlServices.createRole(admin.adminRole, newOrganization._id.toString(), true)
        await AccessControlServices.createRole(user.userRole, newOrganization._id.toString(), true)
        res.status(201).json({ data: newOrganization, message: 'created' })
    } catch (error) {
        next(error)
    }
}

const editOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orgInfo: Organization/* CreateOrgDto */ = req.body
        const org = await organizationsService.editOrganization(orgInfo)
        res.status(201).json({ data: org, message: 'edited' })
    } catch (error) {
        next(error)
    }
}

/**
 * Get all existing organizations in the database
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getAllOrgs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findAllOrgs: Organization[] = await organizationsService.getOrganizations()
        res.status(200).json({ data: findAllOrgs, message: 'findOrganizations' })
    } catch (error) {
        next(error)
    }
}

/**
 * Get the organizations of a user
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getMyOrgs = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        let findAllOrgs = req.user.roles.map(role => {
            if (role.organizationId) {
                return role.organizationId
            } else return null
        })
        findAllOrgs = findAllOrgs.filter(organization => organization) // remove null from array
        res.status(200).json({ data: findAllOrgs, message: 'findOrganizations' })
    } catch (error) {
        next(error)
    }
}

/**
 * Updates an organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const updateOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = req.params.organizationId
        const organizationData = req.body
        const updatedOrganization: Organization = await organizationsService.updateOrgById(
            organizationId,
            organizationData
        )
        res.status(200).json({ data: updatedOrganization, message: 'updated' })
    } catch (error) {
        next(error)
    }
}

const getOrgById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {_id} = req.body
        const org: Organization = await organizationsService.getOrgById(_id)
        res.status(200).json({ data: org, message: 'organization' })
    } catch (error) {
        next(error)
    }
}

/**
 * Deletes an organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const deleteOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = req.params.organizationId
        const deletedOrg: Organization = await organizationsService.deleteOrgById(organizationId)
        res.status(200).json({ data: deletedOrg, message: 'deleted' })
    } catch (error) {
        next(error)
    }
}

export default { createOrg, getAllOrgs, updateOrganization, deleteOrganization, getMyOrgs, getOrgById, editOrg }
