import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetuser } from "../Actions/adminActions";
import { startgetbillsdata } from "../Actions/billsAction";
import { startGetproduct } from "../Actions/productActions";
import { startGetcustomer } from "../Actions/customerActions";
import Charts from "./Charts";
const Admin = (props) => {
  useEffect(() => {
    dispatch(startGetuser());
    dispatch(startGetcustomer());
    dispatch(startGetproduct());
    dispatch(startgetbillsdata());
  }, []);
  const data = useSelector((state) => {
    return state.admindata;
  });
  const customerdata = useSelector((state) => {
    return state.customers;
  });
  const productdata = useSelector((state) => {
    return state.products;
  });
  const billsdata = useSelector((state) => {
    return state.bills;
  });

  const dispatch = useDispatch();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            border: "1px solid green",
            backgroundColor: "green",
            color: "white",
            borderRadius: "4px",
            width: "20%",
            marginTop: "20px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Customers</h1>
          <hr />
          <h1 style={{ textAlign: "center" }}>Total Customers</h1>
          <h1 style={{ textAlign: "center" }}>{customerdata.length}</h1>
        </div>
        <div
          style={{
            border: "1px solid green",
            borderRadius: "4px",
            backgroundColor: "blue",
            color: "white",
            width: "20%",
            marginTop: "10px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Products</h1>
          <hr />
          <h1 style={{ textAlign: "center" }}>Total Products</h1>
          <h1 style={{ textAlign: "center" }}>{productdata.length}</h1>
        </div>
        <div
          style={{
            border: "1px solid green",
            borderRadius: "4px",
            backgroundColor: "Pink",
            color: "white",
            width: "20%",
            marginTop: "10px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Bills</h1>
          <hr />
          <h1 style={{ textAlign: "center" }}>Total Bills</h1>
          <h1 style={{ textAlign: "center" }}>{billsdata.length}</h1>
        </div>
        <div
          style={{
            border: "1px solid green",
            borderRadius: "4px",
            textAlign: "center",
            backgroundColor: "red",
            color: "white",
            width: "25%",
            marginTop: "10px",
          }}
        >
          <h1>Admin</h1>
          <hr />
          <h1>{data.businessName}</h1>
          <h1>{data.email}</h1>
          <h1>{data.username}</h1>
        </div>
      </div>
      <div>
        <Charts />
      </div>
    </div>
  );
};

export default Admin;
