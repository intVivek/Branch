import React,{useState} from "react";
import {TextField, Button} from '@mui/material';
import { register } from '../../../Services';
import { toast } from 'react-toastify'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(false);

    const handleRegister = ()=>{
        setLoading(true);
        register({ name, email, pass })
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res))
            if(res.status==1) toast.success(res.message);
            else toast.error(res.message);
            setLoading(false);
        })
        .catch(err => {
            toast.error("Some Error Occured");
            setError(true)
            setLoading(false);
        })
    }
    return <div className="login">
        <div className="container">
            <TextField error={error} fullWidth id="outlined-basic" onChange={e=>setName(e.target.value)} label="UserName" variant="outlined" />
            <TextField error={error} fullWidth id="outlined-basic" onChange={e=>setEmail(e.target.value)} label="Email" variant="outlined" />
            <TextField error={error} fullWidth id="outlined-basic" onChange={e=>setPass(e.target.value)} label="Password" variant="outlined" />
        </div>
        <Button disabled={loading} bottom variant="contained" onClick={handleRegister}>Register</Button>
    </div>;
};

export default Register;
