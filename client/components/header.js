import React,{ useState } from 'react';
import Link from 'next/link'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import {signOut,isAuth} from '../actions/auth'
import Router  from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="light" light expand="md">
        <Link href="/"><NavLink style={{cursor:'pointer'}}>NEXT SEO BLOG</NavLink></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <React.Fragment>
              <NavItem>
              <Link href="/blogs">
                <NavLink style={{cursor:'pointer'}}>Blogs</NavLink>
              </Link>
            </NavItem>
              </React.Fragment>
            {!isAuth() && (
              <React.Fragment>
              <NavItem>
              <Link href="/signup">
                <NavLink style={{cursor:'pointer'}}>SignUp</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/signin"><NavLink style={{cursor:'pointer'}}>SignIn</NavLink></Link>
            </NavItem>
              </React.Fragment>
            )}
            {isAuth() && (
              <NavItem>
              <NavLink style={{cursor:'pointer'}} onClick={()=>signOut(()=>Router.replace('/signin'))}>SignOut</NavLink>
            </NavItem>
            )}
            {isAuth() && isAuth().role===0 && (
              <NavItem>
              <Link href="/user">
                 <NavLink style={{cursor:'pointer'}}>{isAuth().name}'s DashBoard</NavLink>
              </Link>
            </NavItem> 
            )}
            {isAuth() && isAuth().role===1 && (
              <NavItem>
              <Link href="/admin">
                 <NavLink style={{cursor:'pointer'}}>{isAuth().name}'s DashBoard</NavLink>
              </Link>
            </NavItem> 
            )}
          </Nav>
        </Collapse>
        <style>
          {
            `
            #nprogress .bar {
              background: red !important;
}
            `
          }
        </style>
      </Navbar>
  );
}

export default Header;