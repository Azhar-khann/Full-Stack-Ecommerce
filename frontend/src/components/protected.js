import {React, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { selectstatus} from "../slices/loginstatus";
import { useSelector } from "react-redux";

function Protected(props){
    const {Component} = props;
    const {LoggedIn} = useSelector(selectstatus);
    const navigate = useNavigate()

    useEffect(() =>{
        if (!LoggedIn){
            navigate('/login')
        }
    },[])

    return(
        <Component/>
    )
}

export default Protected