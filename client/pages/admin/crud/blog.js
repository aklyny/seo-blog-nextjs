import React from 'react'
import Layout from '../../../components/layout'
import Link from 'next/link'
import Admin from '../../../components/auth/admin'
import BlogCreate from '../../../components/crud/blogCreate'



class Blog extends React.Component{
    render(){
        return(
            <Layout>
                <Admin>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 pt-5 pb-5">
                                <h2 className="text-center">Create a new Blog</h2>
                            </div>
                            <div className="col-md-12   ">
                                <BlogCreate />
                            </div>
                        </div>
                    </div>
                </Admin>
            </Layout>
        )
    }
}


export default Blog;