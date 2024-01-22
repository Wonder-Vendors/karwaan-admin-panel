import styles from './GetUser.module.css';
import React, {FC, useEffect, useState } from 'react'
import { useUsers } from '@/hooks/useUsers'
import { ClipLoader } from 'react-spinners';
import { usePathname, useRouter } from 'next/navigation';
interface GetUserProps {
  role: 'admin'|'user'|'customer';
}
import SearchComponent from '@/components/shared/searchBar/Search';

const GetUser: FC<GetUserProps> = ({ role }) => {
   const {handleGetUsers}=useUsers({role:role});
    const [response,setResponse]=useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>([]);

  // const allData = ["Item 1", "Item 2", "Item 3", /* ... */];
  
  const handleSearch = (filteredData: any) => {
    setFilteredData(filteredData);
  };
  
   
    useEffect(()=>{
    ( async()=>{
       const data=await handleGetUsers();
       setResponse(data);
    setFilteredData(data);
    })();
    },[]);
    // // date that user created an account
    // const createData=data.createdAt
    const router=useRouter();
    const pathName=usePathname();
    const handleClick=(data:any)=>{
      if(pathName.includes('customers')){
        router.push(`/customers/${data._id}`);
      } 
      if(pathName.includes('users')){
        router.push(`/users/${data._id}`);
      } 
     }
     console.log(filteredData,"res")
  return (
    <div id={styles.container}>
    <span id={styles.heading}>{role} details  <SearchComponent data={response} onSearch={handleSearch} /></span>
    <div className={styles.getUser}>
     {
       Array.isArray(filteredData)?filteredData.length?
       filteredData.map((data:any)=>{
       return(
           <div className={styles.userCard} key={data._id} onClick={()=>handleClick(data)}>
           <img src='/user.png' className={styles.userAvtar} alt='not found'/>
           <div className={styles.userInfo}>
            <div><span className={styles.userDetails}>Name: </span>{data.firstName+" "+data.lastName}</div>
            <div><span className={styles.userDetails}>Email: </span>{data.email?data.email:"Null"}</div>
            <div><span className={styles.userDetails}>Phone number: </span>{data.phoneNumber?data.phoneNumber:"nil"}</div>
            <div><span className={styles.userDetails}>Created at: </span> {data.createdAt.split('-').reverse().slice(1).join("/")}</div>
           </div>
           
           </div>)
            })
        :
        <p>No {role} are available </p>
        :<div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
        <ClipLoader color="blue" size={60} speedMultiplier={0.5} />
        <div>loading</div>
    </div>
     }
    </div>
    </div>
  );
};

export default GetUser;