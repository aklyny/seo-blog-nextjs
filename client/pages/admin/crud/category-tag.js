import React from 'react'
import Layout from '../../../components/layout'
import Link from 'next/link'
import Admin from '../../../components/auth/admin'
import Category from '../../../components/crud/category'

class CategoryTag extends React.Component{
    render(){
        return(
            <Layout>
                <Admin>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 pt-5 pb-5">
                                <h2>Manage Categories and Tags</h2>
                            </div>
                            <div className="col-md-6">
                                <Category />
                            </div>
                            <div className="col-md-6">
                                <p>tag</p>
                            </div>
                        </div>
                    </div>
                </Admin>
            </Layout>
        )
    }
}


export default CategoryTag;