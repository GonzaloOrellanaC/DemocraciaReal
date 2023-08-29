"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seller = exports.superAdmin = exports.user = exports.admin = void 0;
const superAdmin = {
    name: 'SuperAdmin',
    resources: {
        User: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        RolePermission: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        OrganizationPermission: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    description: ''
};
exports.superAdmin = superAdmin;
const admin = {
    adminRole: {
        name: 'admin',
        resources: {
            User: {
                'create:any': ['*'],
                'read:any': ['*'],
                'update:any': ['*'],
                'delete:any': ['*']
            },
            RolePermission: {
                'create:any': ['*'],
                'read:any': ['*'],
                'update:any': ['*'],
                'delete:any': ['*']
            }
        },
        description: ''
    }
};
exports.admin = admin;
const user = {
    userRole: {
        name: 'user',
        resources: {
            User: {
                'create:own': ['*'],
                'read:own': ['*'],
                'update:own': ['*'],
                'delete:own': ['*']
            }
        },
        description: ''
    }
};
exports.user = user;
const seller = {
    name: 'seller',
    resources: {
        User: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        RolePermission: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        OrganizationPermission: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    description: ''
};
exports.seller = seller;
//# sourceMappingURL=roles.config.js.map