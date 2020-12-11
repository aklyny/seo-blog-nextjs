import fetch from 'isomorphic-fetch'
import {API} from '../config'

export const createBlog =(blog,token)=> {
    return fetch(`${API}/blog`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization: `Bearer ${token}`
        },
        body:blog
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err)) 
}

export const getCategory =()=> {
    return fetch(`${API}/categories`,{
        method:'GET',
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}
export const SingleCategory =(slug)=> {
    return fetch(`${API}/category/${slug}`,{
        method:'GET',
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const removeCategory =(slug,token)=> {
    return fetch(`${API}/category/${slug}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}