import { UserDatabase, UserIndexedDatabase } from "../interfaces/indexedDb.interface"
import { User } from "../interfaces/User.interface"

const init = () => {
    const indexedDb: IDBFactory = window.indexedDB
    const conexion = indexedDb.open('User', 1)
    return new Promise<UserDatabase>(resolve => {
        conexion.onsuccess = () =>{
            let db: IDBDatabase = conexion.result
            resolve(
                {
                    message: "Base de datos abierta",
                    database: db,
                    error: null,
                    state: 'abierta'
                }
            )
        }
    
        conexion.onupgradeneeded = (e) =>{
            let db = (e.target as IDBOpenDBRequest).result
            const coleccionObjetos = db.createObjectStore('UserData',{
                keyPath: 'id'
            })
            coleccionObjetos.transaction.oncomplete = (event) => {
                resolve(
                    {
                        message: "Base de datos creada / actualizada",
                        database: db,
                        error: null,
                        state: 'actualizada'
                    }
                )
            }
            
        }
    
        conexion.onerror = (error) =>{
            resolve(
                {
                    message: "Error",
                    error: error,
                    state: 'error'
                } as UserDatabase
            )
        }
    })
}

const actualizar = (data: User, database: IDBDatabase) => {
    return new Promise(resolve => {
        try {
            const trasaccion = database.transaction(['UserData'],'readwrite')
            const coleccionObjetos = trasaccion.objectStore('UserData')
            const conexion = coleccionObjetos.put(data)

            conexion.onsuccess = (ev) =>{
                resolve({
                    data: ev,
                    state: true
                })
            }

            conexion.onerror = (ev) =>{
                resolve({
                    data: ev,
                    state: false
                })
            }

        } catch (err) {
            resolve({
                data: err,
                state: false
            })
        }
    }) 
}

const eliminar = (clave: string | number, database: IDBDatabase) =>{      
    return new Promise(resolve => {
        const trasaccion = database.transaction(['UserData'],'readwrite')
        const coleccionObjetos = trasaccion.objectStore('UserData')
        const conexion = coleccionObjetos.delete(clave)

        conexion.onsuccess = (ev) =>{
            resolve({
                data: ev,
                state: true
            })
        }

        conexion.onerror = (ev) =>{
            resolve({
                data: ev,
                state: false
            })
        }
    })
}


const consultar = (database: IDBDatabase) => {
    return new Promise<UserIndexedDatabase>(resolve => {
        const trasaccion = database.transaction(['UserData'],'readonly')
        const coleccionObjetos = trasaccion.objectStore('UserData')
        const conexion = coleccionObjetos.openCursor()
    
        conexion.onsuccess = () =>{
            const allObject: IDBRequest<any[]> = coleccionObjetos.getAll()
            allObject.onsuccess = (ev: any) => {
                resolve({
                    user: ev.target.result[0],
                    state: true,
                    error: null
                })
            }
            allObject.onerror = (err) => {
                resolve({
                    state: false,
                    error: err
                } as UserIndexedDatabase)
            }
        }
    
        conexion.onerror = (err) =>{
            resolve({
                state: false,
                error: err
            } as UserIndexedDatabase)
        }
    })
}

const userIndexedDb = {
    init,
    actualizar,
    eliminar,
    consultar
}

export default userIndexedDb