import axios from "axios";
import swal from "sweetalert";
// api call for adding products using post method
export const startPostproducts = (formData, resetForm) => {
  return (dispatch) => {
    axios
      .post("https://dct-billing-app.herokuapp.com/api/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(add_products(result));
          resetForm();
          swal("Success", "New Product Added Successfully ", "success");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
// action for adding products
export const add_products = (data) => {
  return {
    type: "ADD_PRODUCTS",
    payload: data,
  };
};
// action for getting products
export const get_productsdata = (data) => {
  return {
    type: "GET_PRODUCTSDATA",
    payload: data,
  };
};
// api call for getting products using get method
export const startGetproduct = () => {
  return (dispatch) => {
    axios
      .get("https://dct-billing-app.herokuapp.com/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(get_productsdata(result));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
// action for removing product
export const remove_product = (removeitem) => {
  return {
    type: "REMOVE_PRODUCT",
    payload: removeitem,
  };
};
// api call for removing product using delete method
export const startRemoveproduct = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://dct-billing-app.herokuapp.com/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(remove_product(result));
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
// action for update product
export const edit_product = (data) => {
  return {
    type: "EDIT_PRODUCT",
    payload: data,
  };
};
// API call for update product using put method
export const startPutProduct = (id, formData) => {
  return (dispatch) => {
    axios
      .put(
        `https://dct-billing-app.herokuapp.com/api/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          dispatch(edit_product(result));
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
