import React, { useState, useContext, useEffect } from "react";
import tokenContext from "../context/tokenContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();
    const { token, setToken } = useContext(tokenContext);

    const [name, setName] = useState("");
    const [joke, setJoke] = useState("");

    useEffect(() => {
       if(token == "")
       {
        if(localStorage.getItem("token"))
        {
            setToken(localStorage.getItem("token"));
        }
        else
        {
            navigate("/login");
        }
       }
       getJoke();
    }, [token])

    async function getJoke() {
        try {
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setJoke(response.data.data.message);
            setName(response.data.data.user.name);
        }
        catch(err)
        {
            console.log(err);
            console.log(token);
        }
       
    }

    async function logOut() {
        try {
            let response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            
            setJoke("");
            setToken("");
            localStorage.removeItem("token")
            alert(response.data.message);
        }
        catch (err) {
            alert(err.response.data.message);
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h1>{`Welcome ${name}`}</h1>
            <p>{joke}</p>

            <button onClick={logOut}>Logout</button>
        </div>
    )
}

export default Dashboard;