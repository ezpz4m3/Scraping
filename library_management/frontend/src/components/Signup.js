import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import './Signup.css';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            type:"",
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('signup/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                type:this.state.type,
            })
            .then((response) => {
                alert(JSON.stringify(response.data.message))
                return response;
        })
        .catch(err=>{
            alert(JSON.stringify(err.response.data.message));
        });   ;
            return response;
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
    }

    render() {
        return (
            <div className="body">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-body">
                        <label className="form__label">
                            Username:
                            <input className="form_input" name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                            { this.state.errors.username ? this.state.errors.username : null}
                        </label>
                        <label className="form__label">
                            Email:
                            <input className="form_input" name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                            { this.state.errors.email ? this.state.errors.email : null}
                        </label>
                        <label className="form__label">
                            Password:
                            <input className="form_input" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                            { this.state.errors.password ? this.state.errors.password : null}
                        </label>
                        <label className="form__label">
                            Type:
                            <input className="form_input" name="type" type="text" value={this.state.type} onChange={this.handleChange}/>
                            { this.state.errors.type ? this.state.errors.type : null}
                        </label>
                        <footer className="footer2">
                        <input type="submit" value="Submit"/>
                        </footer>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;