// import { useEffect } from "react";
// import { UseContext } from "../../storage/auth";
// import { useNavigate } from "react-router-dom";

// export const Logout= () =>{

//     const {logoutAccount} = UseContext();
//     const navigate= useNavigate();
    
//     useEffect(()=>{
//         logoutAccount();
//     }, [logoutAccount]);

//     navigate("/signin");
// }


import { useEffect } from "react";
import { UseContext } from "../../storage/auth";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const { logoutAccount } = UseContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        logoutAccount();
        navigate("/");
    }, [logoutAccount, navigate]);

    return null; // or you could return a loading indicator or some UI if needed
};
