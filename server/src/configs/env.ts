const environment: string = process.env.NODE_ENV
const port: number = parseInt(process.env.PORT)
const locale: string = process.env.DEFAULT_LANGUAGE
const name: string = process.env.NAME
const lastName: string = process.env.LASTNAME
const run: string = process.env.RUN
const email: string = process.env.EMAIL
const password: string = process.env.PASSWORD
const url = process.env.URL || `http://localhost:${port}`
const platformName = process.env.PLATFORM_NAME

const ftpUrl = process.env.FTP_URL
const ftpUser = process.env.FTP_USER
const ftpPassword = process.env.FTP_PASSWORD

const env = { environment, port, locale, name, lastName, run, email, password, url, platformName, ftpUrl, ftpUser, ftpPassword }

export { environment, port, locale, name, lastName, run, email, password, url, platformName, ftpUrl, ftpUser, ftpPassword }
export default env
