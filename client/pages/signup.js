import Layout from '../components/layout'
import SignupC from '../components/auth/signupC'
import Link from 'next/link'
import Head from 'next/head'

const SignUp =()=>{
    return(
        <Layout>
            <Head>
                <title>SEO BLOG SignUp</title>
            </Head>
            <h1 className="text-center pt-4 pb-4">SignUp</h1>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                     <SignupC />
                </div>
            </div>
            <Link href="/"><a className="text-center">Home</a></Link>
        </Layout>   
    )
}


export default SignUp;