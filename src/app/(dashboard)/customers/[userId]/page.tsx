'use client'
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { useParams, useRouter } from 'next/navigation';
import { useUsers } from '@/hooks/useUsers';
import { ClipLoader } from 'react-spinners';
import toast from "react-hot-toast";

function page() {
    const {userId}=useParams<{userId:string}>();
    const { handleGetCustomer, handleDeleteUser } = useUsers({_id:userId});
    const router = useRouter();
    const [formData, setFormData] = useState<formType|string>("");

        var { firstName, lastName, email, isEmailValid, isPhoneNumberValid, phoneNumber } = JSON.parse(localStorage.getItem("user") as string);

    useEffect(() => {
     ( async()=> { 
       const data= await handleGetCustomer();
      data&& setFormData({
        token: data?.token,
        _id: data?._id,
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        isEmailValid:data?.isEmailValid,
        isPhoneNumberValid:data?.isPhoneNumberValid,
    });
    })();
    }, []);

    type formType = {
        token: string,
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        isEmailValid:boolean,
        isPhoneNumberValid:boolean,
    }
    // {
    //     token: token,
    //     _id: _id,
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     phoneNumber: phoneNumber
    // }
    const [modalOpen, setModalOpen] = useState<any>(false);
  

    // delete open and close logic
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);

    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (

        <div className={styles.myAccountContainer} >
            {/* <div className={styles.myAccountContainer} style={isOpen?{background:"rgba(0,0,0,0.8)"}:{background:"rgba(0,0,0,0)"}}> */}
            <h1 className={styles.heading}>{typeof(formData)==="string"?"User":formData.firstName+" 's"} Account</h1>
            <div className={styles.myAccount} style={modalOpen ? { filter: "blur(3px)", height: "100svh" } : { background: "black" }} onClick={() => (modalOpen ? close() : "")}>

                {/* change fields */}
                <form className={styles.myAccountForm} >

                    <div className={styles.info}> <div className={styles.infoType}>User Id: </div>{typeof(formData)==="string"?"":formData._id}</div>
                    {/* <h2>view fields</h2> */}
                    <div className={styles.userName}>
                        <input className={styles.inputField} type="text" name='userFirstName' id='userFirstName'
                            value={typeof(formData)==="string"?"":formData.firstName} />
                        <label className={`${styles.nameLable}${styles.lables}`}>First Name</label>
                    </div>
                    <div className={styles.userName}>
                        <input className={styles.inputField} type="text" name='userLastName' id='userLastName'
                            value={typeof(formData)==="string"?"":formData.lastName}/>
                        <label className={`${styles.nameLable}${styles.lables}`}>Last Name</label>
                    </div>
    
                </form>

                {/* Change Phone Number */}
                <div className={styles.changePhoneNo}>
                    {/* <h2>change Phone number</h2> */}
                    <div className={styles.email}>
                        <input className={styles.inputField} type={typeof(formData)==="string"?"text":formData.phoneNumber?"number":"text"} name='phone' id='phone'
                            value={typeof(formData)==="string"?"Null":(formData.phoneNumber?formData.phoneNumber:"Null")}  />
                        <label className={`${styles.emailLable}${styles.lables}`}>Phone Number</label>
                    </div>
                    <div className={styles.info}> <div className={styles.infoType}>Is phone number verified: </div>{typeof(formData)==="string"?"":(formData.isPhoneNumberValid?formData.isPhoneNumberValid:"false")}</div>

                </div>
                {/* change email */}
                <div className={styles.changeEmail}>
                    {/* <h2>change email</h2> */}
                    <div className={styles.email}>
                        <input className={styles.inputField} type="text" name='email' id='email'
                            value={typeof(formData)==="string"?"":formData.email} />
                        <label className={`${styles.emailLable}${styles.lables}`}>Email</label>
                    </div>
                    <div className={styles.info}> <div className={styles.infoType}>Is email number verified: </div>{typeof(formData)==="string"?"":(formData.isEmailValid?formData.isEmailValid:" false")}</div>
                </div>

                {/* delete account*/}

                <div className={styles.deleteAccount}>
                    <h2>delete account</h2>
                    {/* <Button className={styles.submitButton} style={{ width: "50px", height: "140px" }} onPress={onOpen}>Delete My Account</Button> */}
                    {/* <Modal
                        style={{ filter: "brightness(0.6)" }}
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}

                    >
                        <ModalContent className={styles.deletePopUp}>
                            {(onClose:any) => (
                                <div >
                                    <ModalHeader className={styles.modalTittle}>This action cannot be undone.</ModalHeader>
                                    <ModalBody>
                                        <p>You will lose access to all your account, teams, credits, dataset, models, and plans. If you have an active subscription you will lose access to it. There are no refunds.SavePlease make sure you are certain about this action.</p>
                                    </ModalBody>
                                    <ModalFooter className={styles.deletePopUpButtons}>
                                        <Button className={styles.deletePopUpButton} variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button className={styles.deletePopUpButton} onPress={onClose} onClick={handleDeleteUser}>
                                            Delete
                                        </Button>
                                    </ModalFooter>
                                </div>
                            )}
                        </ModalContent>
                    </Modal> */}
                </div>
            </div>

        </div >
    )
}

export default page;