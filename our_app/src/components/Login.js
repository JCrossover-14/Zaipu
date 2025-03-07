import React, {useState, useEffect} from "react";
import axios from "axios";

function Login({navigateToPage}){
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(
                "http://localhost:8000/login",
                {
                    username,
                    password,
                },
                {
                    withCredentials:true,
                }
            )

            navigateToPage("guest");
        } catch(error){
            if(error.response && error.response.status == 401){
                alert("Invalid email, username or password");
            }
            else {
                console.error("Login error", error);
                alert("An error occured during login.");
            }
        }
    }
    return(
        <div className = "login-container">
            <form onSubmit = {handleSubmit}>
                <h2>Login</h2>
                <input
                    type = "username"
                    placeholder = "userxyz"
                    value = {username}
                    onchange = {(e)=> setEmail(e.target.value)}
                />
                <input
                    type = "password"
                    placeholder = "123456"
                    value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}
                />
                <button type = "submit">Login</button>
                <button type="button" onClick = {()=>navigateToPage("welcome")}>
                    Back
                </button>
            </form>
        </div>
    );
}

export default Login;