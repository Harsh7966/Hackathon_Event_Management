import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Signup = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        type: "",
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({
            ...userData,
            [name]: value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("UserData", userData);
        try {
            const response = await fetch("http://localhost:8080/api/commonRoutes/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const msg = await response.json();

            if (response.status === 200) {
                Swal.fire({
                    title: msg.msg,
                    text: 'Do you want to continue',
                    icon: "success",
                    confirmButtonText: 'Cool'
                });
                navigate("/");
            } else if (response.status === 404) {
                Swal.fire({
                    title: msg.msg,
                    text: 'Do you want to continue',
                    icon: "error",
                    confirmButtonText: 'Cool'
                });
            }
            else if(response.status === 401){
                Swal.fire({
                    title: msg.msg,
                    text: 'Do you want to continue',
                    icon: "error",
                    confirmButtonText: 'Cool'
                });
            }
            else{
                Swal.fire({
                    title: msg,
                    text: 'Do you want to continue',
                    icon: "error",
                    confirmButtonText: 'Cool'
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1 className="signupHeading">Create Account</h1>
                    <p>Create an account on our hackathon event <br /> management platform</p>
                    <br />
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            onChange={handleInput}
                            value={userData.name}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleInput}
                            value={userData.email}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleInput}
                            value={userData.password}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <select
                            className="form-input"
                            name="type"
                            onChange={handleInput}
                            value={userData.type}
                            required
                        >
                            <option value="" >Sign Up as a </option>
                            <option value="Organizer">Signup as a Hackathon organizer</option>
                            <option value="Participant">Signup as a Hackathon participant</option>
                            {/* <option value="Admin">Admin</option> */}
                        </select>
                    </div>
                    <div className="signupbtn">
                        <button type="submit">Continue</button>
                    </div>
                    <div className="bottom-text">
                        <p>Already have an account? <Link to="/">Sign In</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
};


