import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import Sidebar from "./Sidebar";
import './Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: localStorage.getItem('access_token') ? true : false,
            type: '',
          };
    }

async componentDidMount(){
        this.state.type=await axiosInstance.get(`get-type/`,{
            params: {
            email: localStorage.getItem('email')
        }
        }).then((response)=>{
            localStorage.setItem('type',response.data.message);
        })
    }

    render(){
        return (
            <div>
                <h1 className="greet">Welcome !!!</h1>
            </div>
        )
    }
}

export default Dashboard;