import axios from "axios";
import swal from "sweetalert";
// API call for adding bills using post method
export const startPostbills = (formData, resetForm, setGenerateBill) => {
  return (dispatch) => {
    axios
      .post("https://dct-billing-app.herokuapp.com/api/bills", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        setGenerateBill(result);
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(post_bills(result));
          resetForm();
          swal("Success", "New Product Added Successfully ", "success");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
// action for adding bills
export const post_bills = (data) => {
  return {
    type: "POST_BILLS",
    payload: data,
  };
};

// action for getting bills data

export const get_bills = (data) => {
  return {
    type: "GET_BILLS",
    payload: data,
  };
};

// API call for getting bills data

export const startgetbillsdata = () => {
  return (dispatch) => {
    axios
      .get("https://dct-billing-app.herokuapp.com/api/bills", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(get_bills(result));
        }
      });
  };
};
// action for remove bills
const remove_bill = (data) => {
  return {
    type: "REMOVE_BILL",
    payload: data,
  };
};
// API call for removing bills using delete
export const startRemovebill = (id) => {
  return (dispatch) => {
    axios
      .delete(` https://dct-billing-app.herokuapp.com/api/bills/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(remove_bill(result));
          swal("Product Deleted Successfully", {
            icon: "success",
          });
        }
      });
  };
};

// API for view bills
export const startViewbill = (id, setView) => {
  return (dispatch) => {
    axios
      .get(`https://dct-billing-app.herokuapp.com/api/bills/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          setView(result);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
