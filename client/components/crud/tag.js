import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth,getCookie} from '../../actions/auth'
import {create,getTag,removeTag} from '../../actions/tag'


const TagC = ()=>{
    const [values,setValues] = useState({
        name:'',
        error:false,
        success:false,
        tags:[],
        removed:false,
        reload:false
    })
    const {name,tags,success,error,removed,reload} = values;
    const token = getCookie('token')

    useEffect(()=>{
        loadTags()
    },[reload])

    const loadTags = ()=>{
        getTag().then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setValues({...values,tags:data})
                }        
                
        })
    }
    const showTags = ()=>{
        return tags?.map((item,i)=>{
            return <button onDoubleClick={()=> deleteConfirm(item.slug)} title="Double Click to delete" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">{item.name}</button>
        })
    }
    const deleteConfirm = (slug)=>{
        let answer = window.confirm('Are really want to delete this Category?')
        if(answer){
            removeTag(slug,token).then(data=>{
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

    const newTagForm  = () =>(
        <form onSubmit={submitHandle}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" placeholder="Create a Tag" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div>
            <button type="submit" className="btn btn-primary">Create</button>
            </div>
        </form>
    )
    const showSuccess = ()=>{
        if(success){
            return <p className="text-success">Tag is Created!</p>
        }
    }
    const showError = ()=>{
        if(error){
            return <p className="text-warning">Tag is Already Exists!</p>
        }
    }
    const showDeleted = ()=>{
        if(removed){
            return <p className="text-danger">Tag is Deleted!</p>
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
            {newTagForm()}
                {showTags()}
            </div>
        </React.Fragment>
    )
}



export default TagC;