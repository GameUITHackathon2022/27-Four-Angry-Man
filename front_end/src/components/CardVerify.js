
import { Box, Button, Card, CardMedia, CardContent, Typography, DialogActions, Dialog, DialogTitle, Alert, AlertTitle, Snackbar} from "@mui/material";
import * as React from 'react';

import img from "../assets/example.jpg"
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/cardverify.css'
//let id = ''
const CardVerify = (Prop) => {
    const index = Prop.status;
    const process = ['Chờ xác nhận','Đã tiếp nhận vấn đề', 'Đang được xử lí', 'Hoàn tất']
    const [id, setId] = useState(process[index])

    const [open, setOpen] = React.useState(false);

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
  

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccess = () => {
        console.log(id);
        handleClick1();
        
        sendVerifyData();
        handleClose();
    }



    const sendVerifyData = () => {
        async function handleVerifyData(){
        const response = await fetch(`http://localhost:8000/problem/api/update_status/${Prop.id}?status=${process.indexOf(id)}`,  {
            mode: 'cors',
            method: "GET",
        });
    };
        handleVerifyData()
    }






    const handSelection = async (event) => {
        await setId(event.target.value);
        handleClickOpen();
    }
    return (
            <Card sx={{ width: 300 , my:'10px', borderRadius: '15px', boxShadow:" rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}} >
                <CardMedia
                    component="img"
                    height="200"
                    image={Prop.image_url}
                    alt="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                    {'Phường ' + Prop.ward + ', ' + Prop.district + ', TP.HCM' }
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align='justify'>
                    {Prop.description}
                    </Typography>
                </CardContent>
                <Box sx={{display:'flex', width:'100%', flexDirection:'row-reverse'}}>
                <select className="form-select input-select-role3-card"  value={id} onChange={(e)=>handSelection(e)}>
                    {
                        process.map((proc)=>(
                        <option key={proc} value={proc}> {proc} </option>
                        )) 
                    }                  
                </select>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {"Vui lòng xác nhận lại"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color='error'>Hủy bỏ</Button>
                        <Button onClick={handleSuccess} autoFocus>
                        Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                        <AlertTitle>Xác nhận thành công</AlertTitle>
                        </Alert>
                </Snackbar>
            </Card>
    
    )
}

export default CardVerify;