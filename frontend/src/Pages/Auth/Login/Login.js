import "./login.scss"
import React,{useState} from "react";
import {TextField, Button} from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return <div className="login">
        <div className="container">
            <TextField fullWidth id="outlined-basic" onChange={e=>setEmail(e.target.value)} label="Email" variant="outlined" />
            <TextField fullWidth id="outlined-basic" onChange={e=>setPass(e.target.value)} label="Password" variant="outlined" />
        </div>
        <Button bottom variant="contained" onClick={()=>{
            console.log(email, pass);
        }}>Login</Button>
    </div>;
};

export default Login;
