import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userFound = users.find(
      user => user.email === email && user.password === password
    );

    if (userFound) {
      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 500);
    } else {
      toast.error('Invalid email or password.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3f1eb] text-black">
      <ToastContainer />
      <div className="flex space-x-8 mb-6">
        <button className="border-b-2 border-black text-lg italic">Login</button>
        <button
          className="text-lg italic"
          onClick={handleRegisterRedirect}
        >
          Register
        </button>
      </div>
      <form
        className="w-full max-w-sm"
        onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
      >
        {/* Email Field */}
        <div className="mb-4 flex items-center border-b border-black relative h-10">
          <label
            className={`absolute transition-all duration-300 text-sm whitespace-nowrap 
              ${emailFocused || email ? 'right-0' : 'left-0'}`}
            htmlFor="email"
          >
            Email address*
          </label>
          <input
            className={`absolute transition-all duration-300 py-2 px-1 text-black leading-tight focus:outline-none 
              ${emailFocused || email ? 'left-0' : 'right-0'}`}
            style={{ width: 'calc(100% - 80px)' }} // optional: adjust width so label & input don't overlap
            id="email"
            type="email"
            value={email}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 flex items-center border-b border-black relative h-10">
          <label
            className={`absolute transition-all duration-300 text-sm whitespace-nowrap 
              ${passwordFocused || password ? 'right-0' : 'left-0'}`}
            htmlFor="password"
          >
            Password*
          </label>
          <input
            className={`absolute transition-all duration-300 py-2 px-1 text-black leading-tight focus:outline-none 
              ${passwordFocused || password ? 'left-0' : 'right-0'}`}
            style={{ width: 'calc(100% - 80px)' }}
            id="password"
            type="password"
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-6 text-right">
          <a href="#" className="text-sm underline" onClick={handleRegisterRedirect}>Create an account</a>
        </div>
        <button
          className="w-full border border-black rounded-full py-2 px-4 text-black font-medium hover:bg-gray-100"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
