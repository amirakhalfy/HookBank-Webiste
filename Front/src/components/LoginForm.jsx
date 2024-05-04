import "./LoginForm.css";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


function LoginForm({ onLoginSuccess }) {
  const initialValues = {
    emailOrUsername: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    // Check if there are no validation errors
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/get_user_by_email_password/${formValues.emailOrUsername}/${formValues.password}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the response from the server
        setUserData(data); // Update state with user data
        onLoginSuccess(data); // Call the onLoginSuccess function with user data
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    if (!values.emailOrUsername) {
      errors.emailOrUsername = "Email or Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

    return (
      <>
        <div className="boddy">
         <video autoPlay loop muted playsInline>
          <source src="Video.mp4"  type="video/mp4" className="Background-video"/>
        </video>
        <form onSubmit={handleSubmit}>
            <h3>Login Here</h3>

            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                placeholder="Email or Phone" 
                id="username" 
                name="emailOrUsername" 
                value={formValues.emailOrUsername}
                onChange={handleChange} 
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                placeholder="Password" 
                id="password" 
                name="password" 
                value={formValues.password}
                onChange={handleChange} 
            />

            <button type="submit">Log In</button>
            <div className="social">
                <div className="go"><i className="fab fa-google"></i> Google</div>
                <div className="fb"><i className="fab fa-facebook"></i>
                    <Link to={`/`} className="hover:text-gray-300">
                        Back 
                    </Link>
                </div>
                <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
            </div>
        </form>
        </div>
      </>
    );
}

export default LoginForm;
