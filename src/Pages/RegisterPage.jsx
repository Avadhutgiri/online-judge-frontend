import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, eventAPI } from "../utils/api";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_junior: false,
    event_id: "",
  });
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };

  const validateUsername = (username) => {
    // Alphanumeric, 3-20 characters
    const re = /^[a-zA-Z0-9]{3,20}$/;
    return re.test(username);
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!validateUsername(userData.username)) {
      newErrors.username = "Username must be 3-20 characters and alphanumeric";
    }

    if (!validateEmail(userData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventAPI.getAllEvents();
        setEvents(response.events);
        if (response.events.length > 0) {
          setUserData(prev => ({ ...prev, event_id: response.events[0].id }));
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrors(prev => ({ ...prev, general: "Failed to load events. Please refresh the page." }));
      }
    };
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const navigateToTeamRegister = () => {
    navigate("/registerTeam");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, general: "" }));
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.register({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        is_junior: userData.is_junior,
        event_id: userData.event_id,
      });

      setSuccess("Registration Successful! Now You can Log In");
      // Clear form
      setUserData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        is_junior: false,
        event_id: events[0]?.id || "",
      });
    } catch (err) {
      if (err.response) {
        // Handle specific error cases
        switch (err.response.status) {
          case 400:
            setErrors(prev => ({ ...prev, general: err.response.data.error || "Invalid input data" }));
            break;
          case 409:
            setErrors(prev => ({ ...prev, general: "Username or email already exists" }));
            break;
          case 500:
            setErrors(prev => ({ ...prev, general: "Server error. Please try again later" }));
            break;
          default:
            setErrors(prev => ({ ...prev, general: "Registration failed. Please try again" }));
        }
      } else if (err.request) {
        setErrors(prev => ({ ...prev, general: "Network error. Please check your connection" }));
      } else {
        setErrors(prev => ({ ...prev, general: "An unexpected error occurred" }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] w-full flex justify-center items-center bg-[#121417] p-4">
      <div className="w-full max-w-md relative">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-16 h-16 border-t-2 border-l-2 border-[#86C232] opacity-70"></div>
        <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-2 border-r-2 border-[#86C232] opacity-70"></div>
        
        <form 
          onSubmit={handleRegister}
          className="backdrop-blur-lg bg-[#1A1D21]/80 rounded-lg shadow-xl overflow-hidden border border-gray-800"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#222629] to-[#1A1D21] p-6 border-b border-gray-800">
            <h1 className="text-3xl font-bold text-center text-white">
              <span className="text-[#86C232]">&lt;</span> REGISTER <span className="text-[#86C232]">/&gt;</span>
            </h1>
          </div>
          
          {/* Form body */}
          <div className="p-6 space-y-5">
            {errors.general && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm animate-pulse">
                {errors.general}
              </div>
            )}
            
            {success && (
              <div className="bg-green-900/30 border border-green-500/50 text-green-400 px-4 py-3 rounded-md text-sm animate-pulse">
                {success}
              </div>
            )}
            
            {/* Input fields */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={userData.username}
                  className={`w-full pl-10 pr-4 py-3 bg-[#222629] border ${errors.username ? 'border-red-500' : 'border-gray-700 focus:border-[#86C232]'} text-white rounded-md outline-none transition-colors duration-300`}
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={userData.email}
                  className={`w-full pl-10 pr-4 py-3 bg-[#222629] border ${errors.email ? 'border-red-500' : 'border-gray-700 focus:border-[#86C232]'} text-white rounded-md outline-none transition-colors duration-300`}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={userData.password}
                  className={`w-full pl-10 pr-4 py-3 bg-[#222629] border ${errors.password ? 'border-red-500' : 'border-gray-700 focus:border-[#86C232]'} text-white rounded-md outline-none transition-colors duration-300`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={userData.confirmPassword}
                  className={`w-full pl-10 pr-4 py-3 bg-[#222629] border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700 focus:border-[#86C232]'} text-white rounded-md outline-none transition-colors duration-300`}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Event Selection */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <select
                  onChange={handleChange}
                  value={userData.event_id}
                  className="w-full pl-10 pr-4 py-3 bg-[#222629] border border-gray-700 focus:border-[#86C232] text-white rounded-md outline-none transition-colors duration-300"
                  id="event_id"
                  name="event_id"
                  required
                >
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Junior Category Toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_junior"
                  name="is_junior"
                  checked={userData.is_junior}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#86C232] bg-[#222629] border-gray-700 rounded focus:ring-[#86C232]"
                />
                <label htmlFor="is_junior" className="text-white">
                  Junior Category
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#86C232] text-white rounded-md hover:bg-[#61892F] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>

              {/* Team Registration Button */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={navigateToTeamRegister}
                  className="w-full py-3 px-4 bg-[#222629] hover:bg-[#2C3033] text-[#86C232] font-bold rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#86C232] focus:ring-opacity-50"
                >
                  REGISTER AS TEAM
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
