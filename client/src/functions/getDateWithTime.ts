const getDateWithTime = (time: Date | undefined) => {
    if (time) {
        console.log(time)
        const dateTest = new Date(time).toISOString()
        const date = new Date(dateTest)
        return date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES')
        /* const toDay = Date.now()
        let hr = (new Date(time).getHours().toString())
        let min = (new Date(time).getMinutes()).toString()
        if (Number(hr) < 10) {
            hr = '0' + hr
        }
        if (Number(min) < 10) {
            min = '0' + min
        }
        const day = new Date(time).getDay()
        let dayName = ''
        console.log(day === new Date(toDay).getDay())
        console.log(toDay - 259200000)
        if ((day === new Date(toDay).getDay()) && (day < (toDay - 259200000))) {
            dayName = 'Hoy'
        } else if ((day === (new Date(toDay).getDay() - 1)) && (day < (toDay - 259200000))) {
            dayName = 'Ayer'
        } else {
            if (day === 1) {
                dayName = 'Lunes'
            } else if (day === 2) {
                dayName = 'Martes'
            } else if (day === 3) {
                dayName = 'Miercoles'
            } else if (day === 4) {
                dayName = 'Jueves'
            } else if (day === 5) {
                dayName = 'Viernes'
            } else if (day === 6) {
                dayName = 'Sabado'
            } else if (day === 0) {
                dayName = 'Domingo'
            }
        }
        const date = new Date(time).getDate()
        const month = new Date(time).getMonth()
        let monthName
        if (month === 0) {
            monthName = 'Enero'
        } else if (month === 1) {
            monthName = 'Febrero'
        } else if (month === 2) {
            monthName = 'Marzo'
        } else if (month === 3) {
            monthName = 'Abril'
        } else if (month === 4) {
            monthName = 'Mayo'
        } else if (month === 5) {
            monthName = 'Junio'
        } else if (month === 6) {
            monthName = 'Julio'
        } else if (month === 7) {
            monthName = 'Agosto'
        } else if (month === 8) {
            monthName = 'Septiembre'
        } else if (month === 9) {
            monthName = 'Octubre'
        } else if (month === 10) {
            monthName = 'Noviembre'
        } else if (month === 11) {
            monthName = 'Diciembre'
        }
        if (!time) {
            return 'Sin información'
        } else {
            if ((dayName === 'Hoy') || (dayName === 'Ayer')) {
                return (dayName + ' ' + hr + ':' + min)
            } else {
                return (dayName + ' ' + date + ' de ' + monthName + ' ' + hr + ':' + min)
            }
        } */
    } else {
        return ('No data')
    }
}

export default getDateWithTime
