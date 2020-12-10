import SigninC from '../components/auth/signInC'
import Layout from '../components/layout'
import Head from 'next/head'
const SignIn = ()=>{
    return(
        <Layout>
            <Head>
                <title>SEO Blog SignIn</title>
            </Head>
            <h1 className="text-center pt-4 pb-4 ">SignIn</h1>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SigninC />
                </div>
            </div>
        </Layout>
    )
}



export default SignIn;