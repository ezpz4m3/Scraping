import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import './Editbooks.css'

class Editbooks extends Component{
    constructor(props){
        super(props);
        this.state = {
            book_name: "",
            book_content: "",
            book_author_email:"",
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
            const response = await axiosInstance.put('books/', {
                book_name: this.state.book_name,
                book_content: this.state.book_content,
                book_author_email: localStorage.getItem('email'),
            })
            .then((response) => {
                alert(JSON.stringify(response.data.message))
            })
            .catch(err=>{
                alert(JSON.stringify(err.response.data.message));
            });;
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
                        Book Name:
                        <input className="form_input" name="book_name" type="text" value={this.state.book_name} onChange={this.handleChange}/>
                        { this.state.errors.book_name ? this.state.errors.book_name : null}
                    </label>
                    <label className="form__label">
                        Book Content:
                        <input className="form_input" name="book_content" type="text" value={this.state.book_content} onChange={this.handleChange}/>
                        { this.state.errors.book_content ? this.state.errors.book_content : null}
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

export default Editbooks;