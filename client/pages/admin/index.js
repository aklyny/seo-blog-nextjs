import React from 'react'
import Layout from '../../components/layout';
import Link from 'next/link'
import Admin from '../../components/auth/admin'

class AdminIndex extends React.Component{
    render(){
        return(
            <Layout>
                <Admin>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 pt-5 pb-5">
                                <h2> DashBoard</h2>
                            </div>
                            <div className="col-md-4">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <Link href="/admin/crud/category-tag"><a>Create Category</a></Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link href="/admin/crud/category-tag"><a>Create Tag</a></Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link href="/admin/crud/blog"><a>Create Blog</a></Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link href="/admin/crud/blogs">
                                            <a>Update/Delete Blog</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-8">right</div>
                        </div>
                    </div>
                </Admin>
            </Layout>
        )
    }
}


export default AdminIndex;