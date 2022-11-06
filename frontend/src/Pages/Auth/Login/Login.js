import "./login.scss"
import React,{useState} from "react";
import {TextField, Button} from '@mui/material';
import { login } from '../../../Services';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = ()=>{
        setLoading(true);
        login({ email, pass })
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res))
            if(res.status==1) {
                toast.success(res.message);
                localStorage.setItem('User', JSON.stringify(res.user));
                navigate('/dashboard');
            }
            else toast.error(res.message);
            setLoading(false);
        })
        .catch(err => {
            toast.error("Some Error Occured");
            console.log(err);
            setError(true)
            setLoading(false);
        })
    }

    return <div className="login">
        <div className="container">
            <TextField error={error} fullWidth id="outlined-basic" onChange={e=>setEmail(e.target.value)} label="Email" variant="outlined" />
            <TextField error={error} fullWidth id="outlined-basic" onChange={e=>setPass(e.target.value)} label="Password" variant="outlined" />
        </div>
        <Button disabled={loading} variant="contained" onClick={handleLogin}>Login</Button>
    </div>;
};

export default Login;
