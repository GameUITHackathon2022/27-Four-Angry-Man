import * as React from 'react';
import { useState, useEffect } from 'react';
import {Box, IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import CardVerify from '../components/CardVerify'
import data from '../data/CityData'

import '../styles/role3.css'
let districtid = 'Chọn quận'
let wardid = 'Chọn phường'
const Role3 = () => {
  const [Districts, setDistrict] = useState([])
  const [Wards, setWard]= useState([{
    "name":"Chọn phường",
    "pre" : ""
}]);

const [card, setCard] = useState(<div></div>)

    
useEffect(() => {async function initial() { 
    const response = await fetch("http://localhost:8000/problem/api/get_multiple_problem",  {
        mode: 'cors',
        method: "GET",
    });
    const json = await response.json()
        //console.log(json)
            const cardTmp = json["data"].map((data1) => {
                console.log(data1)
                return (
                    <CardVerify key={data1["id"]}
                    status={data1["status"]}
                    id={data1["id"]}
                    ward={data1["ward"]} 
                    district={data1["district"]}
                    description={data1["description"]}
                    image_url={data1["image_url"]}></CardVerify>
                )
            })
            setCard(cardTmp)
        
    }initial();
}
    ,[]);
        
    //update_status




async function handleFilter()
{
    console.log(wardid)
    console.log(districtid)

    const response = await fetch(`http://localhost:8000/problem/api/get_multiple_problem?ward=${wardid}&district=${districtid}`,  {
        mode: 'cors',
        method: "GET",
    });
    const json = await response.json()
    //console.log(json)
    const cardTmp = json["data"].map((data1) => {
        console.log(data1)
        return (
            <CardVerify 
            key={data1["id"]}
            id={data1["id"]}
            status={data1["status"]}
            ward={data1["ward"]} 
            district={data1["district"]}
            description={data1["description"]}
            image_url={data1["image_url"]}></CardVerify>
        )
    })
    setCard(cardTmp)
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
      console.log(wardid)
  }


    return (
    <div className="wasteit-bg">
    <Box sx={{display: 'flex', m: '5px', flexDirection:'column', justifyContent: 'space-evenly'}}>
    <Box className='input-box-role3'>
      <input className='input-select-role3' type="text" disabled={true} value='TP Hồ Chí Minh'/>
      <select className="form-select input-select-role3" onChange={(e)=>handleDistrict(e)}>
      {
          Districts.map( (district)=>(
          <option key={district["name"]} value={district["name"]}>{district["name"]} </option>
          )) 
      }                  
      </select>
      <select className="form-select input-select-role3"  onChange={(e)=>handleWard(e)}>
      {
            Wards.map((Ward)=>(
            <option key={Ward["name"]} value={Ward["name"]}>{Ward["name"].length < 3 ? Ward["pre"] + ' ' + Ward["name"] : Ward["name"]} </option>
            )) 
        }                    
      </select>
      <IconButton color="primary" aria-label="add to shopping cart" sizeLarge sx={{marginTop:'10px'}}>
        <SearchIcon />
      </IconButton>
    </Box>
    <Box sx={{display: 'flex', mt: '30px', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
        <>{card}</>
    </Box>
    
  </Box>
  </div>
  );
  };
  
  export default Role3;