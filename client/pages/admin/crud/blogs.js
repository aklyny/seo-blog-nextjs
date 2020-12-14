import Layout from '../../../components/layout';
import Admin from '../../../components/auth/admin';
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';

const Blog = () => {
    return ( 
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2 className="text-center">Manage blogs</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;