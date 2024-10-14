import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');   
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace 'your-vercel-url' with your actual deployed Vercel URL
    axios.post('https://course-recom.vercel.app/signup', { name, email, password })
      .then(result => {
        console.log(result);
        if (result.status === 200) {
          navigate("/login");
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('Error: Unable to register. Please try again.');
      });
  }

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input 
              type="email" 
              placeholder="Enter your email"
              autoComplete="off"
              className="form-control rounded-0" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input 
              type="password" 
              placeholder="Enter your password"
              className="form-control rounded-0" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          )}

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
