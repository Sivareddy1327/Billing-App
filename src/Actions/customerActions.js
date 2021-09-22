import axios from "axios";
import swal from "sweetalert";
// using post method reading customer data
export const startPostcustomer = (formData, resetForm) => {
  return (dispatch) => {
    axios
      .post("https://dct-billing-app.herokuapp.com/api/customers", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(add_customerdata(result));
          resetForm();
          swal("Success", "New Product Added Successfully ", "success");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
// action for getting customers
const get_customersdata = (customers) => {
  return {
    type: "GET_CUSTOMERSDATA",
    payload: customers,
  };
};
// api call for get customer data
export const startGetcustomer = () => {
  return (dispatch) => {
    axios
      .get(" https://dct-billing-app.herokuapp.com/api/customers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(get_customersdata(result));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
// action for adding customer
export const add_customerdata = (data) => {
  return {
    type: "ADD_CUSTOMERDATA",
    payload: data,
  };
};
// Api call for delete customer
export const StartRemoveCustomer = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://dct-billing-app.herokuapp.com/api/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(remove_customer(result));
          swal("Product Deleted Successfully", {
            icon: "success",
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
// action for customer removing
export const remove_customer = (removedata) => {
  return {
    type: "REMOVE_CUSTOMER",
    payload: removedata,
  };
};

export const edit_Customer = (data) => {
  return {
    type: "EDIT_CUSTOMER",
    payload: data,
  };
};
// api call for editing customer using put method
export const startEditcustomer = (id, data) => {
  return (dispatch) => {
    axios
      .put(`https://dct-billing-app.herokuapp.com/api/customers/${data}`, id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(edit_Customer(result));
          swal("Changes Saved Successfully", {
            icon: "success",
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
