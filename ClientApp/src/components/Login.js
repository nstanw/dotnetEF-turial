import React from "react";


function Login() {
    const handleSubmit = (e) =>{
        e.preventDefault();
        const value = e.target[0].value;
        console.log(value);
        //call api check passs. if match to run host/link 
        // else incorect


    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="txtPassword">
                    Password required to edit this document
                </label>
                <input required="required"
                    placeholder="Password"
                    className="form-control input-lg"
                    type="password"
                    id="txtPassword" />
                <button
                    class="btn btn-primary"
                    type="submit"
                    id="btnLogin">
                    Submit
                </button>
            </form>
        </>
    );
}

export default Login;