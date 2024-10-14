import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`${window.location.origin}/signup`, {
        name,
        email,
        password,
      });
      console.log(result);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white rounded w-50">
        <h2>Register Here!!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <strong>Name</strong>
            </label>
            <input 
              type="text" 
              placeholder="Enter your name"
              autoComplete="off"
              className="form-control rounded-0" 
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>                     
            </label>
            <input 
              type="email" 
              placeholder="Enter your email"
              autoComplete="off"
              className="form-control rounded-0" 
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>                     
            </label>
            <input 
              type="password" 
              placeholder="Enter your password"
              className="form-control rounded-0" 
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form> 

        <p>Already have an account?</p>
        <Link to="/login" className="btn btn-default border w-100 rounded-0 text-decoration-none">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
