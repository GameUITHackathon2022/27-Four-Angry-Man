
import { Box, Button, Card, CardMedia, CardContent, Typography} from "@mui/material";
import * as React from 'react';

import img from "../assets/example.jpg"
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const CardInfo = (Prop) => {
    const index = Prop.status;
    const colorDes = ['#BCBCBC', '#ff4c4c', '#e1d51b', '#43aa3a']
    const process = ['Chờ xác nhận','Đã tiếp nhận vấn đề', 'Đang được xử lí', 'Hoàn tất']


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
                    {'Phường ' +Prop.ward + ', ' + Prop.district + ', TP.HCM' }
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align='justify'>
                    {Prop.description}
                    </Typography>
                </CardContent>
                <Box sx={{display:'flex', width:'100%', flexDirection:'row-reverse'}}>
                    <Box sx={{ display:'flex',color:'#fff', backgroundColor:colorDes[index], m:'15px', p:'5px', borderRadius:'10px',  justifyContent: 'center', width:'165px'}}>{process[index]}</Box>
                </Box>
        
            </Card>
    
    )
}

export default CardInfo;