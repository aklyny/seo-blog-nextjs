import Link from 'next/link'
import {useEffect,useState} from 'react'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import {withRouter} from 'next/router'
import {isAuth,getCookie} from '../../actions/auth'
import {getTag} from '../../actions/tag'
import {getCategory} from '../../actions/category'
import {createBlog} from '../../actions/blog'
const ReactQuill = dynamic(()=>import('react-quill'),{ssr:false})
import {QuillFormats,QuillModules} from '../../helpers/quill'

const BlogCreate = ({router})=>{
    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [body,setBody] = useState(blogFromLS())
    const [values,setValues] = useState({
        error:'',
        sizeError:'',
        success:false,
        formData:'',
        title:'',
        hidePublishButton:false
    })
    const {error,sizeError,success,formData,title,hidePublishButton} = values;
    const token = getCookie('token');
    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initCategories();
        initTags();
    }, [router]);
    const initCategories = () => {
        getCategory().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTag().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };
    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };
    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };
    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checked.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };
    const createBlogForm = ()=>{
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>
                <div className="form-group">
                    <ReactQuill modules={QuillModules} formats={QuillFormats}
                     value={body} 
                     placeholder="write something amazing..."
                      onChange={handleBody} 

                      />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Publish</button>
                </div>
            </form>
        )
    }
    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };
    const handleChange = name=>e=>{
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    }
    const publishBlog =(e)=>{
        e.preventDefault()
        createBlog(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', error: '', success: `A new blog titled "${data.title}" is created` });
                setBody('');
                setCategories([]);
                setTags([]);
            }
        });
    } 
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );
    return(
       <div className="container-fluid pb-5"> 
        <div className="row">
            <div className="col-md-8">
                <h1>BlogCreate</h1>
                {createBlogForm()}
                <div className="pt-3">
                {showError()}
                {showSuccess()}
                </div>
            </div>
            <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Featured image</h5>
                            <hr />

                            <small className="text-muted mr-2">Max size: 1mb</small>
                            <label className="btn btn-outline-info">
                                Upload featured image
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <hr />

                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
                    </div>
                </div>
                </div>    
                <style>{`
                    .ql-editor{
                        min-height:300px;
                    }
                `}</style>     
            </div>
        
    )
}


export default withRouter(BlogCreate);