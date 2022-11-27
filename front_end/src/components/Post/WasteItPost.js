import "../../styles/post.css"
import React, { useState, useEffect } from "react"
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import data from '../../data/CityData'
import axios from "axios";

let districtid = 'Chọn quận'
let wardid = 'Chọn phường'
let imageExt = false
let imageB64, finalcontent;


const WasteItPost = () => {
    const [fileB64, setFileB64] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");

    const [Districts, setDistrict] = useState([])
    const [Wards, setWard]= useState([{
        "name":"Chọn phường",
        "pre" : ""
    }]);


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

    const onFileChange = event => {

        // Update the state
        var file = event.target.files[0];

        var reader = new FileReader();
        reader.onloadend = function () {
            setFileB64(reader.result)
        }
        reader.readAsDataURL(file);

        const fileB64Pos = fileB64.search("base64") + 7

        setFileB64(fileB64.substring(fileB64Pos))
        //imageB64 = fileB64.substring(fileB64Pos)
        imageExt = true;
    };

    const onTitleChange = event => {
        setContent(event.target.value)
    }

    const onDescriptionChange = event => {
        setDescription(event.target.value)
    }

    // const onSubmitClick = event => {

    // }

    const sendPostData = () => {
        let signUpData =
        {
            title: content,
            image_url: fileB64.substring(fileB64.search("base64") + 7),
            description: description,
            ward: wardid,
            district: districtid,
            city: "TP.HCM",
            extra_info: ""
        }
        // axios({
  
        //     // Endpoint to send files
        //     url: "https://smarthomesonnguyen.ddns.net/problem/api/create_problem",
        //     method: 'POST',
        //     withCredentials: false,
        //     headers: {
        //         'Content-Type': "application/json",
        //         'Access-Control-Allow-Origin': '*'
        //       // Add any auth token here
              
        //     },
        
        //     // Attaching the form data
        //     data: signUpData,
        //   })
      
        fetch("http://localhost:8000/problem/api/create_problem",  {
            mode: 'cors',
            method: "POST",
            headers: [['Content-Type', 'application/json']],  
            // {
            //     "Content-Type": "application/json",
            // },
            // headers: {
            //     "Content-Type": "application/json",
            //     "Accept": "application/json",
            // },
            body: JSON.stringify(signUpData),
        })
            .catch((data) => {
                console.log(data)
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
            window.location.href='http://localhost:3000/'
    }

    return (
        <div className="wasteit-bg">
            <div className="draft-shadow"></div>
            <div className="wasteit-post">
                <div className="wasteit-title">
                    <h2 sx={{ mt: 10 }}>
                        File Upload!
                    </h2>
                </div>
                <form className="wasteit-form" action="#">
                    <div className="wasteit-content">
                        <label className="wasteit-label-item">Tiêu đề</label>
                        <input class="wasteit--item" type="text" placeholder="Vấn đề của mình là ..." onChange={onTitleChange} />
                    </div>
                    <div className="wasteit-content">
                        <label className="wasteit-label-item">Thêm hình ảnh</label>
                        <div className="wasteit-label-attachDoc">
                            <label className="wasteit-label-attachDoc-inside-label">
                                <div className="wasteit-label-attachDoc-inside-label-inside-div">

                                    <p className="wasteit-label-attachDoc-inside-label-inside-div-inside-p">
                                        <span sx={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}>
                                            {imageExt ? "Đăng ảnh thành công." : "Chọn hình ảnh từ máy bạn."}
                                        </span>
                                        <br />

                                        <input className="inputHidden" type="file" onChange={onFileChange} />
                                    </p>
                                </div>
                            </label>
                        </div>

                    </div>
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
                    <div className="wasteit-content">
                        <label className="wasteit-label-item">Mô tả</label>
                        <input class="wasteit--item" type="text" placeholder="Nơi này đối diện ..." onChange={onDescriptionChange} />
                    </div>
                    <div>
                        <button component={Link} to='/' className="bbbbbutton" type="button" onClick={sendPostData}>Submit</button>
                    </div>
                </form>
            </div>

            {/* 
                <div class="text-center">
                    <h2 class="mt-5 text-3xl font-bold text-gray-900">
                        File Upload!
                    </h2>
                    <p class="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p>
                </div>
                <form class=>
                    <div class="grid grid-cols-1 space-y-2">
                        <label class="text-sm font-bold text-gray-500 tracking-wide">Title</label>
                            
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                        <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                        <div class="flex items-center justify-center w-full">
                            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                                    
                                    <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img class="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image"/>
                                    </div>
                                    <p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" class="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                </div>
                                <input type="file" class="hidden"/>
                            </label>
                        </div>
                    </div>
                    <p class="text-sm text-gray-300">
                        <span>File type: doc,pdf,types of images</span>
                    </p>
                    <div>
                        <button type="submit" class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Upload
                        </button>
                    </div>
                </form>
            </div>
        </div> */}
        </div>
    )
}

export default WasteItPost