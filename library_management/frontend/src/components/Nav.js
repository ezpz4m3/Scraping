import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Createbooks from './Createbooks';
import Deletebooks from './Deletebooks';
import Editbooks from './Editbooks';
import Viewbooks from './Viewbooks';
import './Nav.css';

function Nav(props) {
  const logged_out_nav = (
    <div>
    <div className='links'>
        {/* <Link className={"nav-link"} to={"/"}>Home</Link> */}
        <Link className={"link1"} to={"/login/"}>Login</Link>
        <Link className={"link2"} to={"/signup/"}>Signup</Link>
    </div>
    <div>
    <Switch>
            <Route exact path={"/login/"} component={Login}/>
            <Route exact path={"/signup/"} component={Signup}/>
    </Switch>
    </div>
    </div>
    
  );

  const logged_in_nav = (
  <div >
    <div className='button'>
        <button classname="logout" onClick={props.handle_logout}>Logout</button>
    </div>
    <div className='links'>
        {/* <Link className={"nav-link"} to={"/"}>Home</Link> */}
        <Link className={"link3"} to={"/dashboard/"}>Dashboard</Link>
        <Link className={"link4"} to={"/view-books/"}>View Books</Link>
        <Link className={"link5"} to={"/edit-books/"}>Edit Books</Link>
        <Link className={"link6"} to={"/create-books/"}>Create Books</Link>
        <Link className={"link7"} to={"/delete-books/"}>Delete Books</Link>
    </div>
    <div>
        <Switch>
            <Route exact path={"/dashboard/"} component={Dashboard}/>
            <Route exact path={"/create-books/"} component={Createbooks}/>
            <Route exact path={"/edit-books/"} component={Editbooks}/>
            <Route exact path={"/delete-books/"} component={Deletebooks}/>
            <Route exact path={"/view-books/"} component={Viewbooks}/>
        </Switch>
    </div>
    </div>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};