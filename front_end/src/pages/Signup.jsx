import * as React from 'react';
import { useState, useEffect } from 'react';
import {Box, Typography, Alert, AlertTitle, Snackbar, CssBaseline} from '@mui/material'
import axios from 'axios'

import data from '../data/CityData'

import '../styles/signup.css'
let districtid = 'Chọn quận'
let wardid = 'Chọn phường'
let count = 0
const Signup = ({user, setUser}) => {
    const pattern_email = /(\S+@\w+\.\w+)/;
    const pattern_special_character = /(\W)/;


    const id_textField = ['username', 'email', 'password_1', 'password_2', 'username_login', 'password'];
    const [username, setUsername] = React.useState('');
    const [password_1, setPassword_1] = React.useState('');
    const [password_2, setPassword_2] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username_login, setUsernameLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessageUsername, setErrorMessageUsername] = React.useState('');
    const [errorMessagePassword, setErrorMessagePassword] = React.useState('');
    const [errorMessageEmail, setErrorMessageEmail] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [token, setToken] = React.useState("")

    const [Districts, setDistrict] = useState([])
    const [Wards, setWard]= useState([{
        "name":"Chọn phường",
        "pre" : ""
    }]);

    const [open1, setOpen1] = React.useState(false);
    const handleClick1 = () => {
    setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

    setOpen1(false);
    };
  

    
    
    
    function checkDistrict(district) {
        return district['name'].localeCompare(districtid)===0;
    }

    

    useEffect(()=>{
        const getDistrict = async() => 
        {
            setDistrict(await data["district"])
        }
        getDistrict();
    },[]);

    const handleDistrict=(event)=>{

        districtid = event.target.value
        setWard(Districts.find(checkDistrict)["ward"])
    }

    

    const handleWard = (event) =>{
        wardid = event.target.value;
    }




    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const handleChange = (event) => {

        switch(id_textField.indexOf(event.target.id)){
        case 0:
            setUsername(event.target.value)
            break;
        case 2:
            setPassword_1(event.target.value)
            break;
        case 3:
            setPassword_2(event.target.value)
            break;
        case 1:
            setEmail(event.target.value)
            break;
        case 4:
            setUsernameLogin(event.target.value)
            break;
        case 5:
            setPassword(event.target.value)
            break;
        default:
            break;
        }
        
    }
    
    
    const handleSubmit = (event) => {
        event.preventDefault()

        let errorMessageTmp = ''
        let errorInputTmp = false
   

        setErrorMessageUsername(errorMessageTmp)
        errorMessageTmp = ''

        if (password_1.length < 6)
        {
        errorInputTmp = true
        errorMessageTmp += 'Password should be large than 6 character.\n'
        }

        if (password_1.localeCompare(password_2) !== 0)
        {
        errorInputTmp = true
        errorMessageTmp += 'Your passwords are not match.\n'
        }

        setErrorMessagePassword(errorMessageTmp)
        errorMessageTmp = ''

        if (!pattern_email.test(email))
        {
        errorInputTmp = true
        errorMessageTmp += 'Your email is incorrect.\n'
        }
        setErrorMessageEmail(errorMessageTmp)
        if (errorInputTmp)
        {   
            handleClick()
        }
        console.log(errorInputTmp)
        if (!errorInputTmp)
        {
            console.log(1)
            sendSignupData();
            reset();
        }
    }

    const sendSignupData = () => {
        let checkSuccess = false;
        let signUpData = 
        {"email": email,
        "password": password_1,
        "confirm_password": password_2,
        "ward": wardid,
        "district": districtid,
        "city": "TP.HCM"
        }
        fetch("http://localhost:8000/auth_api/sign_up",  {
            mode: 'cors',
            method: "POST",
            headers: [['Content-Type', 'application/json']],  
            body: JSON.stringify(signUpData),
        })
            .catch((data) => {
                console.log(data)
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        
        checkSuccess = true
        if (checkSuccess)
            handleClick1()
        
    }
    
    const reset = () =>
    {
        window.location.href='http://localhost:3000/'
    }

    const sendLoginData = () => {

        let loginData = 
        {
         "username": username_login,
         "password": password
        }

        console.log(`login data ${JSON.stringify(loginData)}`)


        async function fetchLogin(){
            const response = await fetch("http://localhost:8000/auth_api/login",  {
            mode: 'cors',
            method: "POST",
            headers: [['Content-Type', 'application/json']],  
            body: JSON.stringify(loginData),
        })
            const json = await response.json()
        
            console.log(`token ${json.token}`)
            setToken(json.token)
        }
        fetchLogin()
        
        

        async function fetchToken(){
            const response = await fetch("http://localhost:8000/auth_api/get_user",  {
            mode: 'cors',
            method: "GET",
            headers: [['Authorization', 'token' + ' ' + token]]
        })
            const json = await response.json()
            console.log(`json ${json}`)
            setUser(json)
        }
        
         fetchToken()
       



       
    }
    return (
    <>
    <CssBaseline />
    <Box className = 'body' sx={{display: 'flex', justifyContent: 'center', minHeight:'100vh'}}>
        <div className="main">  	
            <input className='input' type="checkbox" id="chk" aria-hidden="true"/>

                <div className="signup">
                    <form>
                        <label className='label' htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className='input' id={id_textField[1]} type="email"  placeholder="Email" required="" onChange={handleChange} value={email} autoComplete='on'/>
                        <input className='input' id={id_textField[2]} type="password"  placeholder="Password" required="" onChange={handleChange} value={password_1} autoComplete='on'/>
                        <input className='input' id={id_textField[3]} type="password"  placeholder="Confirm Password" required="" onChange={handleChange} value={password_2} autoComplete='on'/>
                        <input className='input' type="text" disabled={true} value='TP Hồ Chí Minh'/>
                        <Box className='input-box'>
                            <select className="form-select input-select" onChange={(e)=>handleDistrict(e)}>
                            {
                                Districts.map( (district)=>(
                                <option key={district["name"]} value={district["name"]}>{district["name"]} </option>
                                )) 
                            }                  
                            </select>
                            <select className="form-select input-select"  onChange={(e)=>handleWard(e)}>
                            {/* {districtid.localeCompare("Chọn quận") === 0 ? <option key="Chọn phường" value="Chọn phường" >Chọn phường</option>: null} */}
                            {
                                Wards.map((Ward)=>(
                                <option key={Ward["name"]} value={Ward["name"]}>{Ward["name"].length < 3 ? Ward["pre"] + ' ' + Ward["name"] : Ward["name"]} </option>
                                )) 
                            }                  
                            </select>
                        </Box>
                        
                        
                        <button type="button" className='button' onClick={(e) => handleSubmit(e)}>Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form>
                        <label className='label' htmlFor="chk" aria-hidden="true">Login</label>
                        <input className='input' id={id_textField[4]} type="text" placeholder="Email/Username" required="" autoComplete='on' value={username_login} onChange={handleChange}/>
                        <input className='input' id={id_textField[5]} type="password" placeholder="Password" required=""  autoComplete='on' value={password} onChange={handleChange}/>
                        <button type="button" className='button' onClick={sendLoginData}>Login</button>
                    </form>
                </div>
        </div>
        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                <AlertTitle>Xác nhận thành công</AlertTitle>
                </Alert>
        </Snackbar>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <AlertTitle>Error</AlertTitle>
            <Typography align='justify' variant='body2'>
              {errorMessageUsername}
            </Typography>
            <Typography align='justify' variant='body2'>
              {errorMessagePassword}
            </Typography>
            <Typography align='justify' variant='body2'>
              {errorMessageEmail}
            </Typography>
            <Typography align='justify' variant='body2'>
              — <strong>Please type again!</strong>   
            </Typography>
            </Alert>
      </Snackbar>
    </Box>
    </>);
  };
  
  export default Signup;