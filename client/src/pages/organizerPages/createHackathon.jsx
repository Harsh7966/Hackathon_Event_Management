import { useState } from "react"
import { UseContext } from "../../storage/auth"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const CreateHackathon= () =>{
    const {tokenAuthorization, User}= UseContext();
    const navigate= useNavigate();

    const [hackathon, setHackathon]= useState({
        eName:"",
        company:"",
        startDate:"",
        endDate:"",
        time:"",
        location:"",
        description:"",
        theme:""
    })

    const handleInput= (e) =>{
        const name= e.target.name;
        const value= e.target.value;

        setHackathon({
            ...hackathon,
            [name]:value
        });
    }


    const handleSubmit= async(e) =>{
        e.preventDefault();

        try{
            const response= await fetch("http://localhost:8080/api/organizer/create_hackathon",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify(hackathon),
            });

            const msg= await response.json();

            if(response.status===200){
                Swal.fire({
                    title: msg.msg,
                    text: 'Do you want to continue',
                    icon: "success",
                    confirmButtonText: 'Cool'
                });
                navigate(`/organizer/viewEvents/${User.uToken}`);
            }else{
                Swal.fire({
                    title: msg.msg,
                    text: 'Do you want to continue',
                    icon: "error",
                    confirmButtonText: 'Cool'
                });
            }
        }catch(err){
            console.log(err);
        }
    }


    return(
        <>
            <div className="formContainer CreateHackathon">
                <form id="contact" onSubmit={handleSubmit}>
                    <h1 >Create Hackathon Event</h1>

                    <fieldset>
                        <input placeholder="Event Name" type="text" name="eName" onChange={handleInput} required  />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Company Name" type="text" name="company" onChange={handleInput}  required />
                    </fieldset>
                    <fieldset >
                        <span>Start Date: </span><input placeholder="DOB" type="date" name="startDate" onChange={handleInput} required />
                    </fieldset>
                    <br/>
                    <fieldset>
                    <span>End Date: </span><input placeholder="DOB" type="date" name="endDate" onChange={handleInput} required />
                    </fieldset>
                    <br/>
                    <fieldset>
                        <input placeholder="Timing" type="text" name="time" onChange={handleInput} required />
                    </fieldset>
                    <fieldset>
                        <input placeholder="Location" type="text" name="location" onChange={handleInput} required />
                    </fieldset>
                    <fieldset>
                        <textarea placeholder="Enter description about hackathon event" type="text" name="description" onChange={handleInput} required />
                    </fieldset>
                    <div className="input-group">
                        <select
                            className="form-input"
                            name="theme"
                            onChange={handleInput}
                            required
                        >
                            <option value="" >Select Theme</option>
                            <option value="Artificial_Intelligence">Artificial Intelligence</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Financial_Technology_(FinTech)">Financial Technology (FinTech)</option>
                            <option value="Education_and_Learning">Education and Learning</option>
                            <option value="Healthcare_and_Medicine">Healthcare and Medicine</option>
                            <option value="Gaming_and_Entertainment">Gaming and Entertainment</option>
                        </select>
                    </div>
                    <fieldset>
                        <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                    </fieldset>
                </form>
            </div>
        </>
    )
}