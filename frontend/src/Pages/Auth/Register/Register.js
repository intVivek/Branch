import React from "react";
import {TextField, Button} from '@mui/material';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    return <div className="login">
        <div className="container">
            <TextField fullWidth id="outlined-basic" onChange={e=>setEmail(e.target.value)} label="UserName" variant="outlined" />
            <TextField fullWidth id="outlined-basic" onChange={e=>setEmail(e.target.value)} label="Email" variant="outlined" />
            <TextField fullWidth id="outlined-basic" onChange={e=>setEmail(e.target.value)} label="Password" variant="outlined" />
        </div>
        <Button bottom variant="contained">Register</Button>
    </div>;
};

export default Register;
