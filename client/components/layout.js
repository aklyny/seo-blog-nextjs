import React from 'react'
import Head from 'next/head'
import Header from './header'
const Layout = ({children})=>{
    return(
        <React.Fragment>
            <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"  />
            <title>Home Page</title>
            </Head>
            <Header />
                {children}
            <p>Footer</p>    
        </React.Fragment>
    )
}


export default Layout;