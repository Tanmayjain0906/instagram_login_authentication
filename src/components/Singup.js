import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import tokenContext from "../context/tokenContext";

const SingUp = () => {

    const navigate = useNavigate();
    const {setToken} = useContext(tokenContext);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    })

    const { name, email, password, cpassword } = userData;

    function handleSubmit(event)
    {
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    async function handleForm(event)
    {
        event.preventDefault();
        
        if(!name || !email || !password || !cpassword)
        {
            alert("Fill all the feilds")
        }
        else if(password !== cpassword)
        {
            alert("Password not matched");
        }
        else if(!email.includes("@"))
        {
            alert("Enter Valid Email");
        }
        else
        {
            // axios.post("https://instagram-express-app.vercel.app/api/auth/signup", {name,email,password,cpassword})
            // .then(response => console.log(response.data.data.token))
            // .catch(err => console.log(err.response.data.message))

            try{
                    let response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup/", {name,email,password,cpassword});

                    setToken(response.data.data.token);
                    localStorage.setItem("token", response.data.data.token);
                    alert("Sign-up SuccessFull")
                    navigate("/dashboard");
            }
            catch(err)
            {
                alert(err.response.data.message);
            }


            setUserData({
                name: "",
                email: "",
                password: "",
                cpassword: "",
            })
        }
    }

    return (
        <div>
            <h1>Sing up</h1>
            <form onSubmit={handleForm}>
                <input type="text" placeholder="Enter Name" name="name" value={name} onChange={handleSubmit} />
                <input type="email" placeholder="Enter Mail" name="email" value={email} onChange={handleSubmit} />
                <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleSubmit} />
                <input type="password" placeholder="Re-enter Password" name="cpassword" value={cpassword} onChange={handleSubmit} />
                <button type="submit">Submit</button>
            </form>

            <div>
                <p>Do you want to <NavLink to="/login">Login</NavLink></p>
            </div>
        </div>
    )
}

export default SingUp;