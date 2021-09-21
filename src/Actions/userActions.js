import axios from 'axios'

// API call for adding data for register using post method
export const startPostuser = (formData, resetForm, redirectToLogin) => {

    return (dispatch) => {
        axios.post("https://dct-billing-app.herokuapp.com/api/users/register", formData)
            .then((response) => {
                const user = response.data
                if (user.hasOwnProperty('errors')) {
                    alert(user.message)
                }
                else {
                    dispatch(add_users(user))
                    alert('successfully registered')
                    resetForm()
                    redirectToLogin()

                }

            })
            .catch((err) => {
                alert(err.message)
            })
    }

}

// API call for adding data for login using post method
export const startPostlogin = (formData, handleAuth, resetForm, redirectToAdmin) => {

    return (dispatch) => {
        axios.post("https://dct-billing-app.herokuapp.com/api/users/login", formData)
            .then((response) => {
                const result = response.data

                if (result.hasOwnProperty('errors')) {
                    alert(result.errors)
                }
                else {
                    alert("sucessfully logged in")
                    resetForm()
                    localStorage.setItem('token', result.token)
                    handleAuth()
                    redirectToAdmin()
                }

            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

// action for adding register data
export const add_users = (user) => {
    return {
        type: "ADD_USERS",
        payload: user
    }
}