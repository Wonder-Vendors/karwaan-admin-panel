"use client"
import { useParams } from "next/navigation"
import styles from "./order.module.css"
import { useEffect, useState } from "react"
import useOrders from "@/hooks/useOrders"
import { useRouter } from "next/navigation"

interface UserDetails {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isEmailValid: boolean;
    phoneNumber: string | null;
    isPhoneNumberValid: boolean;
    role: string;
    image: string | null;
    phoneNumberOTP: string | null;
    phoneNumberOTPExpire: string | null;
    passwordResetToken: string | null;
    passwordResetTokenExpiry: string | null;
    verifyEmailToken: string | null;
    verifyEmailTokenExpire: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ProductDetails {
    _id: string;
    userId: string;
    name: string;
    tags: string[];
    description: string;
    price: number;
    url: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Product {
    productDetails: ProductDetails;
    quantity: number;
    size: '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"';
}

interface ShippingDetails {
    houseNumber: string;
    buildingName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    contactNumber: string;
}

interface Order {
    userDetails: UserDetails;
    razorpay_paymentid: string;
    products: Product[];
    paymentStatus: 'PAYMENT PENDING' | 'PAYMENT COMPLETE' | 'PAYMENT FAILED';
    shippingDetails: ShippingDetails;
    amount: number;
}[]

function page() {   
    const {orderid} = useParams()
    const {getSingleOrder}  = useOrders()
    const [order,setOrderData] = useState<Order>()
    
    const getOrderData = async(orderid:string)=>{
        let token = localStorage.getItem("token") as string;
        const res = await getSingleOrder(token,orderid);
        if(res.status !== "error"){
            setOrderData(res)
        }
       
    }
    useEffect(()=>{
        if (typeof window !== "undefined") {
            getOrderData(orderid as string)
          }
    },[])
    const router = useRouter()
  return (
    <div className={styles.container}>
        <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <h1 className={styles.heading}>Order</h1>
            <button className={styles.btn} onClick={()=>{router.back()}}>Back</button>
        </div>
        <h2>#{orderid}</h2>
        {order&&
        <>
        <span style={{marginBottom:"8px"}}>Products</span>
        <ul className={styles.productList}>
                {order.products.map((item, index) => (
                    <li key={index} className={styles.productItem}>
                        <img src={item.productDetails.url.startsWith("http")?item.productDetails.url:`https://${item.productDetails.url}`} alt={item.productDetails.name} className={styles.productImage} />
                        <div>
                            <span>{item.productDetails.name}</span>
                            <span>Quantity: {item.quantity}</span>
                            <span>Size: {item.size}</span>
                            <span style={{fontWeight:"bold"}}>₹{item.productDetails.price}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <h3>Shipping Details</h3>
            <p>
                {order.userDetails.firstName} {order.userDetails.lastName} <br />
                Email: {order.userDetails.email} <br />
                Phone: {order.shippingDetails.contactNumber} <br />
                House Number: {order.shippingDetails.houseNumber}, Building Name: {order.shippingDetails.buildingName} <br />
                {order.shippingDetails.street}, {order.shippingDetails.city} <br />
                {order.shippingDetails.state}, {order.shippingDetails.country} <br />
                PIN: {order.shippingDetails.pin}
            </p>
            <h3 style={{marginTop:"10px"}}>Total Amount Paid : ₹{order.amount}</h3>
            <span>Razorpay payment id : {order.razorpay_paymentid}</span>
            </>
            }
            
    </div>
  )
}

export default page