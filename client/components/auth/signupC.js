import  Router  from 'next/router'
import React,{useEffect, useState} from 'react'
import {signUp,isAuth} from '../../actions/auth'
const SignupC = ()=>{
useEffect(()=>{
    isAuth() && Router.push('/')
},[])
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showFrom:true
    })
    const {name,email,password,error,loading,message,showFrom} = values;
    const handleSubmit = (e) =>{
        e.preventDefault()
        setValues({...values,loading:true,error:false})
        const user = {name,email,password}
        signUp(user)
        .then(data=>{
            console.log(data)
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }else{
                setValues({...values,name:'',email:'',password:'',error:'',loading:false,message:data.message,showFrom:false})
            }
        })
    }
const handleChange = name=>e=>{
    setValues({...values,error:false,[name]:e.target.value})
}    
    const signUpForm = ()=>{
        return(
            <form onSubmit={handleSubmit} className="text-center">
                <div className=" container form-group mt-4">
                    <input type="text" value={name} onChange={handleChange('name')} name="name" className="form-control" placeholder="Type your Name" />
                </div>
                <div className=" container form-group mt-4">
                    <input type="email" value={email} onChange={handleChange('email')} name="email" className="form-control" placeholder="Type your Email" />
                </div>
                <div className=" container form-group mt-4">
                    <input type="password" value={password} onChange={handleChange('password')} name="password" className="form-control" placeholder="Type your Password" />
                </div>
                <div>
                    <button className="btn btn-primary">SignUp</button>
                </div>
            </form>
        )
    }
    const showLoading = ()=>(loading ? <div className="alert alert-info">Loading...</div> :'')
    const showError = ()=>(error ? <div className="alert alert-danger">{error}</div> :'')
    const showMessage = ()=>(message ? <div className="alert alert-info">{message}</div> :'')

    
    return(
        <React.Fragment>
            {showLoading()}
            {showError()}
            {showMessage()}
            {showFrom && signUpForm()}
        </React.Fragment>
    )
}


export default SignupC;