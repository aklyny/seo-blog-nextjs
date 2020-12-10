import React from 'react'
import Layout from '../../../components/layout'
import Admin from '../../../components/auth/admin'
import TagC from '../../../components/crud/tag'

class Tag extends React.Component{
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
                                <TagC /> 
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


export default Tag;