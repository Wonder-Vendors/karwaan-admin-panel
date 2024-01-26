'use client'
import {redirect} from 'next/navigation';
import {useEffect} from 'react';
export default function withAuth(Component :any){
    return function withAuth(props:any){
        useEffect(()=>{
        var token =(localStorage.getItem("token")as string);
        if(!token){
            redirect("/signup");
        }
    },[]);
    if(typeof(window)!=="undefined"&& !(localStorage.getItem("token")as string)){
        return null;
    }
    return <Component {...props}/>
    }
}