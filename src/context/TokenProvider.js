import React, {useState} from "react";
import tokenContext from "./tokenContext";

const TokenProvider = (props) => {
  
    const [token, setToken] = useState("");

    return(
        <tokenContext.Provider value={{token, setToken}}>
            {props.children}
        </tokenContext.Provider>
    )
}

export default TokenProvider;