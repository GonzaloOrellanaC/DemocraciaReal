declare const superAdmin: {
    name: string;
    resources: {
        User: {
            'create:any': string[];
            'read:any': string[];
            'update:any': string[];
            'delete:any': string[];
        };
        RolePermission: {
            'create:any': string[];
            'read:any': string[];
            'update:any': string[];
            'delete:any': string[];
        };
        OrganizationPermission: {
            'create:any': string[];
            'read:any': string[];
            'update:any': string[];
            'delete:any': string[];
        };
    };
    description: string;
};
declare const admin: {
    adminRole: {
        name: string;
        resources: {
            User: {
                'create:any': string[];
                'read:any': string[];
                'update:any': string[];
                'delete:any': string[];
            };
            RolePermission: {
                'create:any': string[];
                'read:any': string[];
                'update:any': string[];
                'delete:any': string[];
            };
        };
        description: string;
    };
};
declare const user: {
    userRole: {
        name: string;
        resources: {
            User: {
                'create:own': string[];
                'read:own': string[];
                'update:own': string[];
                'delete:own': string[];
            };
        };
        description: string;
    };
};
declare const seller: {
    name: string;
    resources: {
        User: {
            'create:own': string[];
            'read:own': string[];
            'update:own': string[];
            'delete:own': string[];
        };
        RolePermission: {
            'create:own': string[];
            'read:own': string[];
            'update:own': string[];
            'delete:own': string[];
        };
        OrganizationPermission: {
            'create:any': string[];
            'read:any': string[];
            'update:any': string[];
            'delete:any': string[];
        };
    };
    description: string;
};
export { admin, user, superAdmin, seller };
