import React from 'react'
import Layout from '../../../components/layout'
import Admin from '../../../components/auth/admin'
import TagC from '../../../components/crud/tag'

class Tag extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Admin>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <TagC /> 
                            </div>
                        </div>
                    </div>
                </Admin>
            </React.Fragment>
        )
    }
}


export default Tag;