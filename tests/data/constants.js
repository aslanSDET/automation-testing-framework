const projectConstants = {
    ROUTES: {
        TODO: `/todomvc/`
    },
    TIMEOUTS: {
        MINUTES: {
            1: 1 * 60 * 1000
        }
    },
    API: {
        validUser:     
        {
            id: 4,
            email: 'eve.holt@reqres.in',
            first_name: 'Eve',
            last_name: 'Holt',
            avatar: 'https://reqres.in/img/faces/4-image.jpg'
        },
        loginUser:{
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        }
    }
}

export default projectConstants;