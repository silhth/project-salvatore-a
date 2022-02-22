import React, { useState } from "react";


import { signup } from "../../libs/firebaseAuth";
import style from "./Signup.module.scss";



const Signup = (props) => {
    const [user,setUser] = useState({})

    const handleSignup = (e)=>{
        e.preventDefault();
        signup(user)
    }
    function handleComeBack(){
        props.setter(false)
    }
    return(
        
        <div className={style.wrapper}>
        <div className={style.wrapper_reg}>
                <form onSubmit={handleSignup}>
                    
                    <div className={style.wrapper_item}>
                        <label htmlFor="name"> Nome </label>
                        <input onChange={(e)=> setUser({...user,name:e.target.value})} type="text" placeholder="name" id="name" required />
                    

                    
                        <label htmlFor="surname"> Cognome </label>
                        <input onChange={(e)=> setUser({...user,lastname:e.target.value})} type="text" placeholder="lastname" id="surname" required />
                    
                    
                    
                        <label htmlFor="email"> E-mail </label>
                        <input onChange={(e)=> setUser({...user,email:e.target.value})} type="email" placeholder="email" id="email" required />
                    
            
                    
                        <label htmlFor="password"> Password </label>
                        <input onChange={(e)=> setUser({...user,password:e.target.value})} type="password" placeholder="password" id="password" required/>
                    
                    </div>
                    
                    <button>Registrati</button>
                </form>
                <p onClick={()=> handleComeBack()}>Torna al Login </p>
                </div>
            </div>
        
        
    )
}


export default Signup