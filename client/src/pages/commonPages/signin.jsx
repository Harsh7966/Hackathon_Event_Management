import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UseContext } from "../../storage/auth";
import { WebSpinner } from "./webspinner";

export const Signin = () => {
    const navigate = useNavigate();
    const { setTokenInLs, userAuth, User } = UseContext();
    const [loading, setLoading] = useState(true); // Initially set loading to true

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting

        try {
            const response = await fetch("http://localhost:8080/api/commonRoutes/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const msg = await response.json();

            if (response.status === 200) {
                setTokenInLs(msg.token);
                Swal.fire({
                    title: msg.msg,
                    text: "Do you want to continue",
                    icon: "success",
                    confirmButtonText: "Cool",
                });

                if (msg.type==="Organizer") {
                    navigate("/organizer");
                } else {
                    navigate("/participant"); 
                }
            } else if (response.status === 404) {
                Swal.fire({
                    title: msg.msg,
                    text: 'Do you want to continue',
                    icon: "error",
                    confirmButtonText: 'Cool'
                });
            }
            else {
                Swal.fire({
                    title: msg,
                    text: 'Do you want to continue',
                    icon: "error",
                    confirmButtonText: 'Cool'
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // Set loading to false after submission
        }
    };

    useEffect(() => {
        const JWT = localStorage.getItem("jwtToken");

        if (JWT) {
            userAuth();
            if (User.isOrganizer) {
                navigate("/organizer");
            } else {
                navigate("/participant"); // Corrected spelling
            }
        } else {
            setLoading(false); // Only set loading to false if no JWT is found
        }
    }, [userAuth, User, navigate]);

    return (
        <>
            {loading ? (
                <WebSpinner />
            ) : (
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h1 className="signupHeading">Sign In</h1>
                        <br />

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

                        <div className="signupbtn">
                            <button type="submit">Continue</button>
                        </div>
                        <div className="bottom-text">
                            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
