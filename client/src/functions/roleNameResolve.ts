const roleNameResolve = (value: string) => {
    if (value === 'SuperAdmin') {
        return 'Súper Administrador'
    } else if (value === 'admin') {
        return 'Administrador'
    } else if (value === 'user') {
        return 'Usuario'
    } else {
        return value
    }
}

export default roleNameResolve
