import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link'
import Private from '../../components/auth/private'

class UserIndex extends React.Component{
    render(){
        return(
            <Layout>
               <Private>
                <h1 className="text-center">User DashBoard</h1>
               </Private>
            </Layout>
        )
    }
}


export default UserIndex;