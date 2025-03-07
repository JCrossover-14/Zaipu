import React, {useState} from "react";
import axios from "axios";

function Register({navigateToPage}){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password!==confirmPassword){
            alert("Password don't match");
            return;
        }

        try{
            const response = await axios.post("http://localhost:8000/register",{
                username,
                email,
                password,
            });

            console.log(response.data);
            navigateToPage("login");
        }  catch(error){
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                console.error("Registration error", error);
                alert("An error occured during registration.");
            }
        }
    };

    return (
        <div className = "register-container">
            <form onSubmit = {handleSubmit}>
                <h2> Register </h2>
                <input
                    type = "text"
                    placeholder = "Username"
                    value = {username}
                    onChange = {(e)=>setUsername(e.target.value)}
                />
                <input
                    type = "email"
                    placeholder = "Email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <input
                    type = "password"
                    placeholder = "Password"
                    value = {password}
                    onchange = {(e)=>setPassword(e.target.value)}
                />
                <input
                    type = "password"
                    placeholder = "Confirm Password"
                    value = {confirmPassword}
                    onchange = {(e) => setConfirmPassword(e.target.value)}
                />

                <button type = "submit"> Sign Up</button>
                <button type = "button" onClick = {()=> navigateToPage("welcome")}>
                    Back
                </button>

            </form>
        </div>
    );

}

export default Register;