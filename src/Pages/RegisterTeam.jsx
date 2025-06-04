import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { teamAPI, eventAPI } from "../utils/api";

const RegisterTeam = () => {
  const [teamData, setTeamData] = useState({
    username1: "",
    username2: "",
    team_name: "",
    event_id: "",
    is_junior: false,
  });
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventAPI.getAllEvents();
        setEvents(response.events);
        if (response.events.length > 0) {
          setTeamData(prev => ({ ...prev, event_id: response.events[0].id }));
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please refresh the page.");
      }
    };
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleRegisterTeam = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await teamAPI.registerTeam(teamData);
      setSuccess("Team registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Team registration failed. Try again.");
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
          onSubmit={handleRegisterTeam}
          className="backdrop-blur-lg bg-[#1A1D21]/80 rounded-lg shadow-xl overflow-hidden border border-gray-800"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#222629] to-[#1A1D21] p-6 border-b border-gray-800">
            <h1 className="text-3xl font-bold text-center text-white">
              <span className="text-[#86C232]">&lt;</span> CREATE TEAM <span className="text-[#86C232]">/&gt;</span>
            </h1>
          </div>
          
          {/* Form body */}
          <div className="p-6 space-y-5">
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm animate-pulse">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-900/30 border border-green-500/50 text-green-400 px-4 py-3 rounded-md text-sm animate-pulse">
                {success}
              </div>
            )}
            
            {/* Input fields */}
            <div className="space-y-4">
              {/* Event Selection */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <select
                  onChange={handleChange}
                  value={teamData.event_id}
                  className="w-full pl-10 pr-4 py-3 bg-[#222629] border border-gray-700 focus:border-[#86C232] text-white rounded-md outline-none transition-colors duration-300"
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

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={teamData.username1}
                  className="w-full pl-10 pr-4 py-3 bg-[#222629] border border-gray-700 focus:border-[#86C232] text-white rounded-md outline-none transition-colors duration-300"
                  id="username1"
                  name="username1"
                  type="text"
                  placeholder="First User's Username"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={teamData.username2}
                  className="w-full pl-10 pr-4 py-3 bg-[#222629] border border-gray-700 focus:border-[#86C232] text-white rounded-md outline-none transition-colors duration-300"
                  id="username2"
                  name="username2"
                  type="text"
                  placeholder="Second User's Username"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={teamData.team_name}
                  className="w-full pl-10 pr-4 py-3 bg-[#222629] border border-gray-700 focus:border-[#86C232] text-white rounded-md outline-none transition-colors duration-300"
                  id="team_name"
                  name="team_name"
                  type="text"
                  placeholder="Team Name"
                  required
                />
              </div>

            </div>
                        
            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 ${isLoading ? 'bg-gray-700 cursor-not-allowed' : 'bg-[#86C232] hover:bg-[#7BB62C]'} text-black font-bold rounded-md transition-colors duration-300 shadow-md relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#86C232] focus:ring-opacity-50 flex justify-center items-center`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : "REGISTER TEAM"}
            </button>
            
            {/* Individual Registration Link */}
            <div className="pt-2 text-center">
              <p className="text-sm text-gray-400">
                Want to register as an individual?{" "}
                <a 
                  href="/register" 
                  className="text-[#86C232] hover:text-[#a7e959] hover:underline transition-colors duration-300"
                >
                  Register Here
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeam;