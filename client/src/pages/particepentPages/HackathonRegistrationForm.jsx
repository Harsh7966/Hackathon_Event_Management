import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { UseContext } from "../../storage/auth";
import Swal from "sweetalert2";

export const HackathonRegistrationForm = () => {

    const {tokenAuthorization, User}= UseContext();
    const params= useParams();
    const navigate= useNavigate();
    const [register, setRegister] = useState({
        rName: "",
        rEmail: "",
        rPhone: "",
        rTotalexperience: "",
        skill_expertise: ""
    })
    
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setRegister({
            ...register,
            [name]: value
        });
    }


    const handleSubmit= async(e) =>{
        console.log("RegisterFormData", register);

        e.preventDefault();

        try{
            const response= await fetch(`http://localhost:8080/api/particepent/register-hackathon/${params.hToken}`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:tokenAuthorization
                },
                body: JSON.stringify(register)
            });

            const msg= await response.json();

            if(response.status===200){
                Swal.fire({
                    title: msg.msg,
                    text: "Do you want to continue",
                    icon: "success",
                    confirmButtonText: "Cool",
                })
                navigate(`/particepent/view_registered_hackathons/${User.uToken}`);
            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{

        if(User){
            setRegister({
                rName: User.name ,
                rEmail: User.email ,
                rPhone: "",
                rTotalexperience:"",
                skill_expertise:"",
            }) 
        }
    },[]);

    return (
        <>
            <div className="viewEvent">
                <div className="formContainer CreateHackathon">
                    <form id="contact" onSubmit={handleSubmit}>
                        <h1>Registration Form</h1>
                        <br />
                        <fieldset>
                            <input
                                placeholder="Enter your name"
                                type="text"
                                name="rName"
                                onChange={handleInput}
                                value={register.rName}
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Enter email address"
                                type="text"
                                name="rEmail"
                                onChange={handleInput}
                                value={register.rEmail}
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Phone number"
                                type="text"
                                name="rPhone"
                                onChange={handleInput}
                                value={register.rPhone}
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Experience"
                                type="text"
                                name="rTotalexperience"
                                onChange={handleInput}
                                value={register.rTotalexperience}
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Skills & Expertise"
                                type="text"
                                name="skill_expertise"
                                onChange={handleInput}
                                value={register.skill_expertise}
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">
                                Register
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}






