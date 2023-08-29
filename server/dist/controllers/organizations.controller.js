"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const organization_service_1 = (0, tslib_1.__importDefault)(require("../services/organization.service"));
const accessControl_service_1 = (0, tslib_1.__importDefault)(require("../services/accessControl.service"));
const roles_config_1 = require("../configs/roles.config");
/**
 * Creates a new organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const createOrg = async (req, res, next) => {
    try {
        const orgInfo = req.body;
        const findAllOrgs = await organization_service_1.default.getOrganizations();
        orgInfo.idOrg = findAllOrgs.length + 1;
        const newOrganization = await organization_service_1.default.createOrganization(orgInfo);
        await accessControl_service_1.default.createRole(roles_config_1.admin.adminRole, newOrganization._id.toString(), true);
        await accessControl_service_1.default.createRole(roles_config_1.user.userRole, newOrganization._id.toString(), true);
        res.status(201).json({ data: newOrganization, message: 'created' });
    }
    catch (error) {
        next(error);
    }
};
const editOrg = async (req, res, next) => {
    try {
        const orgInfo = req.body;
        const org = await organization_service_1.default.editOrganization(orgInfo);
        res.status(201).json({ data: org, message: 'edited' });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get all existing organizations in the database
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getAllOrgs = async (req, res, next) => {
    try {
        const findAllOrgs = await organization_service_1.default.getOrganizations();
        res.status(200).json({ data: findAllOrgs, message: 'findOrganizations' });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get the organizations of a user
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getMyOrgs = async (req, res, next) => {
    try {
        let findAllOrgs = req.user.roles.map(role => {
            if (role.organizationId) {
                return role.organizationId;
            }
            else
                return null;
        });
        findAllOrgs = findAllOrgs.filter(organization => organization); // remove null from array
        res.status(200).json({ data: findAllOrgs, message: 'findOrganizations' });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Updates an organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const updateOrganization = async (req, res, next) => {
    try {
        const organizationId = req.params.organizationId;
        const organizationData = req.body;
        const updatedOrganization = await organization_service_1.default.updateOrgById(organizationId, organizationData);
        res.status(200).json({ data: updatedOrganization, message: 'updated' });
    }
    catch (error) {
        next(error);
    }
};
const getOrgById = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const org = await organization_service_1.default.getOrgById(_id);
        res.status(200).json({ data: org, message: 'organization' });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Deletes an organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const deleteOrganization = async (req, res, next) => {
    try {
        const organizationId = req.params.organizationId;
        const deletedOrg = await organization_service_1.default.deleteOrgById(organizationId);
        res.status(200).json({ data: deletedOrg, message: 'deleted' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = { createOrg, getAllOrgs, updateOrganization, deleteOrganization, getMyOrgs, getOrgById, editOrg };
//# sourceMappingURL=organizations.controller.js.map