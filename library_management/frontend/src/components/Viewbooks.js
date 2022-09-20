import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import './Viewbooks.css';

class Viewbooks extends Component{
    constructor(props){
        super(props);
        this.state = {
            message:"",
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
            const response = await axiosInstance.get('books/')
            .then((response)=>{
                const message = JSON.stringify(response.data.message);
                this.setState({
                message: message,
            });
            })
            .catch(err =>{
                alert(JSON.stringify(err.response.data.message))
            });
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
            <div classname="view-books">
                <div className="button1">
                <button  onClick={this.handleSubmit}>View all books</button>
                </div>
                <div className="para">
                <p >{this.state.message}</p>
                </div>
            </div>
        )
    }
}

export default Viewbooks;