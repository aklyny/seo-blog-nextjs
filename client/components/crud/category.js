import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth,getCookie} from '../../actions/auth'
import {create,getCategory,removeCategory} from '../../actions/category'

const Category = ()=>{
    const [values,setValues] = useState({
        name:'',
        error:false,
        success:false,
        categories:[],
        removed:false,
        reload:false
    })
    const {name,categories,success,error,removed,reload} = values;
    const token = getCookie('token')

    useEffect(()=>{
        loadCategories()
    },[reload])

    const loadCategories = ()=>{
        getCategory().then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setValues({...values,categories:data})
                }        
                
        })
    }
    const showCategory = ()=>{
        return categories?.map((item,i)=>{
            return <button onDoubleClick={()=> deleteConfirm(item.slug)} title="Double Click to delete" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">{item.name}</button>
        })
    }
    const deleteConfirm = (slug)=>{
        let answer = window.confirm('Are really want to delete this Category?')
        if(answer){
            removeCategory(slug,token).then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setValues({...values,name:'',success:false,error:false,reload:!reload,removed:true})
                }
            })
        }
    }
    const submitHandle = (e)=>{
        e.preventDefault()
        create({name},token).then((data)=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({...values,name:'',success:!success,error:false,reload:!reload,removed:removed})
            }
        })
    }
    const handleChange = (e)=>{
        setValues({...values,name:e.target.value,error:false,success:false,removed:''})
    }

    const newCategoryForm  = () =>(
        <form onSubmit={submitHandle}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div>
            <button type="submit" className="btn btn-primary">Create</button>
            </div>
        </form>
    )
    const showSuccess = ()=>{
        if(success){
            return <p className="text-success">Category is Created!</p>
        }
    }
    const showError = ()=>{
        if(error){
            return <p className="text-warning">Category is Already Exists!</p>
        }
    }
    const showDeleted = ()=>{
        if(removed){
            return <p className="text-danger">Category is Deleted!</p>
        }
    }
    const mouseMoveHandle = e=>{
        setValues({...values,error:false,success:false,removed:''})
    }
    return(
        <React.Fragment>
            {showSuccess()}
            {showDeleted()}
            {showError()}
            <div onMouseMove = {mouseMoveHandle}>
            {newCategoryForm()}
                {showCategory()}
            </div>
        </React.Fragment>
    )
}



export default Category;