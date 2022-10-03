import "./Auth.scss"
import React,{useState} from "react";
import Login from "./Login";
import Register from "./Register";
import {Box, Tabs, Tab, TabPanel} from '@mui/material';

const Auth = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className='auth'>
      <div className='window'>
        <Tabs value={tab} onChange={()=>tab?setTab(0):setTab(1)} >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <div className='modal'>
          {tab==0?<Login/>:
          <Register/>}
        </div>
      </div>
    </div>
  );
};

export default Auth;