import axios from 'axios';
// getting admin data
export const startGetuser = () => {
    return (dispatch) => {
        axios.get("https://dct-billing-app.herokuapp.com/api/users/account", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                }
                else {
                    dispatch(admin_data(result))
                }

            })
            .catch((err) => {
                alert(err.message)
            })

    }
}
// action for admin data
export const admin_data = (user) => {
    return {
        type: "ADMIN_DATA",
        payload: user
    }

}