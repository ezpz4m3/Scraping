import React, { Component} from "react";
import axiosInstance from "./axiosApi";
import Nav from "./components/Nav";
import './App.css'

class App extends Component {

    constructor() {
        super();
        this.state = {
          logged_in: localStorage.getItem('access_token') ? true : false,
          username: ''
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            })
            .then((response) => {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('email');
              localStorage.removeItem('type');
              axiosInstance.defaults.headers['Authorization'] = null;
              this.setState({ logged_in: false, username: '' });
              return response;
            });
            
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div className="library">
              {this.state.logged_in?"":<h1 className="heading1">Libary Management System</h1>}
              <Nav
                logged_in={this.state.logged_in}
                handle_logout={this.handleLogout}
              />
               <h3 className="heading3">
                {this.state.logged_in
                  ?""
                  : 'Please Log In or Sign up'}
              </h3>
            </div>
        );
    }
}

export default App;