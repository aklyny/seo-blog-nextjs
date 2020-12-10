import React,{useState,useEffect} from 'react'
import {signIn,authenticate,isAuth} from '../../actions/auth'
import Router from 'next/router'
const SigninC = ()=>{
    useEffect(()=>{
        isAuth() && Router.push('/')
    },[])
    const [values,setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showFrom:true
    })
    const {email,password,error,loading,message,showFrom} = values;
    const handleSubmit = (e) =>{
        e.preventDefault()
        setValues({...values,loading:true,error:false})
        const user = {email,password}
        signIn(user)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }else{
                console.log(data)
                authenticate(data,()=>{
                    if(isAuth() && isAuth().role === 1){
                        Router.push('/admin')
                    }else{
                        Router.push('/user')
                    }
                })
            }
        })
    }
const handleChange = name=>e=>{
    setValues({...values,error:false,[name]:e.target.value})
}    
    const signInForm = ()=>{
        return(
            <form onSubmit={handleSubmit} className="text-center">
                <div className=" container form-group mt-4">
                    <input type="email" value={email} onChange={handleChange('email')} name="email" className="form-control" placeholder="Type your Email" />
                </div>
                <div className=" container form-group mt-4">
                    <input type="password" value={password} onChange={handleChange('password')} name="password" className="form-control" placeholder="Type your Password" />
                </div>
                <div>
                    <button className="btn btn-primary">SignIn</button>
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
            {showFrom && signInForm()}
        </React.Fragment>
    )
}


export default SigninC;