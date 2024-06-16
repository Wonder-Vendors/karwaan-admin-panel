"use client";

import useOrders from "@/hooks/useOrders";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import style from "./style.module.css";
import { useRouter } from "next/navigation";

const page = () => {
  const { getOrders } = useOrders();
  const state = useSelector((state: RootState) => state.order);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("token") as string;
      getOrders(token);
    }
  }, []);
  const headers = [
    { id: 0, title: "Order id" },
    { id: 1, title: "Client name" },
    { id: 2, title: "Email" },
    { id: 3, title: "Total Price" },
    { id: 4, title: "Date" },
    { id: 5, title: "Action" },
  ];
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const router = useRouter();
  return (
    <div className={style.container}>
      <span className={style.heading}>Orders</span>
      {/* <div className={style.headerContainer}>
      {headers.map((item)=>{
        return(
          <span key={item.id} className={style.header}>
            {item.title}
          </span>
        )
      })}
      </div>
      
      {state.map((item)=>{
        return(
          <div key={item._id} className={style.headerContainer}>
          <span className={style.header}>
            {item._id}
          </span>
          <span className={style.header}>
            {item.userDetails.clientName}
          </span>
          <span className={style.header}>
            {item.userDetails.email}
          </span>
          <span className={style.header}>
            {item.amount}
          </span>
          <span className={style.header}>
            29
          </span>
          
          <span className={style.header}>
            View Order
          </span>

          </div>
        )
      })} */}
      <table className={style.ordersTable}>
        <thead>
          <tr className={style.tableHeader}>
            <th>S.No</th>
            <th>Order ID</th>
            <th>Client Name</th>
            <th>Email</th>
            <th>Total Price</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.map((order, index) => (
            <tr key={index} className={style.tableRow}>
              <td>{index + 1}</td>
              <td>{order._id}</td>
              <td>{order.userDetails.clientName}</td>
              <td>{order.userDetails.email}</td>
              <td>₹{order.amount}</td>
              <td>{formatDate(order.updatedAt)}</td>
              <td
                style={{ color: "#007BFF", cursor: "pointer" }}
                onClick={() => {
                  router.push(`orders/${order._id}`);
                }}
              >
                View
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default page;
