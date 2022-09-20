import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "",
        logged_in: localStorage.getItem('access_token') ? true : false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmitWThen(event){
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
                email: this.state.email,
                password: this.state.password
                }).then((response) => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                this.setState({ logged_in: false, username: '' });
                return response;
                })
                .catch(err=>{
                    alert(JSON.stringify(err.response.data.detail));
                });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                email: this.state.email,
                password: this.state.password
            })
            .then((response) => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                this.setState({ logged_in: false, username: '' });
                localStorage.setItem('email', this.state.email);
                window.location.replace("http://localhost:3000/dashboard/");
                return response;
        })
        .catch(err=>{
            alert(JSON.stringify(err.response.data));
        });   
        } catch (error) {
            alert(error.response.data);
        }
    }

    render() {
        return (
            <div className="body">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-body">
                        <label className="form__label">
                            Email:
                            <input className="form_input" name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                        </label>
                        <label className="form__label">
                            Password:
                            <input className="form_input" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                        </label>
                        <footer className="footer">
                            <input type="submit" value="Submit"/>
                        </footer>
                    </div>
                </form>
            </div>
        )
    }
}
export default Login;