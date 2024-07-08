
import { createContext, useContext, useState, useCallback } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const setTokenInLs = (JWT) => {
        setJWT(JWT);
        localStorage.setItem("jwtToken", JWT);
    };

    const [JWT, setJWT] = useState(localStorage.getItem("jwtToken"));
    const [User, setUser] = useState("");
    const [hackathon, setHackathon] = useState([]);
    const [hackathonbyid, setHackathonbyid] = useState({});
    const [hackathonbytheme, setHackathonbytheme] = useState([]);
    const [isregister, setIsregister] = useState({ status: false });
    const [participants, setParticipants] = useState([]);
    const tokenAuthorization = `Bearer ${JWT}`;
    const isLogin = !!JWT;

    const userAuth = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/commonRoutes/userAuth`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            const userData = await response.json();

            if (response.status === 200) {
                setUser(userData);
            } else {
                console.log("data not found");
            }

        } catch (err) {
            console.log(err);
        }
    }, [tokenAuthorization]);

    const logoutAccount = () => {
        try {
            setJWT("");
            setUser("");
            localStorage.removeItem("jwtToken");
        } catch (err) {
            console.log(err);
        }
    };

    const getAllEventsOfLoginUser = useCallback(async (uToken) => {
        try {
            const response = await fetch(`http://localhost:8080/api/organizer/getAllEventsOfLoginOrganizer/${uToken}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization,
                }
            });

            const events = await response.json();

            if (events) {
                setHackathon(events);
            } else {
                console.log("events not found");
            }

        } catch (err) {
            console.log(err);
        }
    }, [tokenAuthorization]);

    const hackathonDelete = useCallback(async (hToken) => {
        try {
            const response = await fetch(`http://localhost:8080/api/organizer/hackathonDelete/${hToken}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            const msg = await response.json();

            if (response.status === 200) {
                Swal.fire({
                    title: msg.msg,
                    text: 'Do you want to continue',
                    icon: "error",
                    confirmButtonText: 'Cool'
                });

                // getAllEventsOfLoginUser();
            }

        } catch (err) {
            console.log(err);
        }
    }, [tokenAuthorization]);

    const getHackathonById = useCallback(async (hToken) => {
        try {
            const response = await fetch(`http://localhost:8080/api/organizer/getHackathonById/${hToken}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            const data = await response.json();
            if (response.status === 200) {
                setHackathonbyid(data);
            }

        } catch (err) {
            console.log(err);
        }
    }, [tokenAuthorization]);

    const HackathonListByTheme = useCallback(async (theme) => {
        try {
            const response = await fetch(`http://localhost:8080/api/particepent/HackathonListByTheme/${theme}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setHackathonbytheme(data);
            }
        } catch (err) {
            console.log(err);
        }
    }, [tokenAuthorization]);

    const isRegisterOrNot = useCallback(async (hToken) => {
        try {
            const response = await fetch(`http://localhost:8080/api/particepent/isRegisterOrNot/${hToken}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            const status = await response.json();

            if (response.status === 200) {
                setIsregister(status);
            } else {
                console.log("isRegister", status);
                setIsregister(status);
            }
        } catch (err) {
            console.log(err);
        }
    }, [tokenAuthorization]);


    const getParticipantByEachHackathon = async(hToken) => {
        try {
            const response= await fetch(`http://localhost:8080/api/organizer/viewParticepentInEachHackathon/${hToken}`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
            })

            if(response.status===200){
                const participants= await response.json();
                setParticipants(participants);
            }

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <AuthContext.Provider value={{
            setTokenInLs,
            userAuth,
            User,
            logoutAccount,
            isLogin,
            tokenAuthorization,
            getAllEventsOfLoginUser,
            hackathon,
            hackathonDelete,
            getHackathonById,
            hackathonbyid,
            HackathonListByTheme,
            hackathonbytheme,
            isRegisterOrNot,
            isregister,
            getParticipantByEachHackathon,
            participants
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseContext = () => {
    return useContext(AuthContext);
};
