import { createSlice } from "@reduxjs/toolkit";


type Products = {
    productId: string;
    quantity: string;
    size: '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"';
};
type InitialState = {
    products: Products[];
    userId: string;
    _id: string;
    updatedAt: string;
    userDetails:{email: string,clientName: string}
    status: "PAYMENT PENDING" | "PAYMENT COMPLETE" | "PAYMENT FAILED" | null;
    amount: number;
    payment_id: string;
    shipping_details:{
        houseNumber: string;
        buildingName: string;
        country: string;
        state: string;
        city: string;
        street: string;
        contactNumber?: string;
        pin: string;
    }
}[]

const initialState: InitialState = []

export const orders = createSlice({
    name:"orders",
    initialState,
    reducers:{
        updateOrders:(state,action)=>{
            return action.payload
        }
    }
})

export const {updateOrders} = orders.actions;
export default orders.reducer;
