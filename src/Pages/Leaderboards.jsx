import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Users, Target, Calendar } from 'lucide-react';
import { leaderboardAPI, eventAPI } from '../utils/api';

const useAuthStore = (selector) => selector({ user: { name: "Demo User" } });

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [isJunior, setIsJunior] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventAPI.getAllEvents();
        setEvents(response.events || []);
        if (response.events && response.events.length > 0) {
          setSelectedEventId(response.events[0].id);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError("Failed to load events");
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!selectedEventId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await leaderboardAPI.getLeaderboard(selectedEventId, isJunior.toString());
        setLeaderboardData(response.data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError("Failed to load leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedEventId, isJunior]);

  const handleEventChange = (e) => {
    setSelectedEventId(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setIsJunior(e.target.value === "junior");
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <div className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-400">#{rank}</div>;
    }
  };

  const getScoreColor = (score, maxScore = 100) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "text-green-400";
    if (percentage >= 70) return "text-yellow-400";
    if (percentage >= 50) return "text-orange-400";
    return "text-red-400";
  };

  if (loading && !leaderboardData) {
  return (
      <div className="flex flex-col items-center justify-center h-[85vh] w-full bg-gray-900">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-green-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-green-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
        <div className="text-center">
          <p className="text-green-500 font-mono tracking-wider text-lg font-bold mb-2">LOADING LEADERBOARD</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[85vh] w-full bg-gray-900 p-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-400 mb-6">{error}</p>
          </div>
          <button 
            className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] w-full bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center mb-4">
            <Trophy className="w-10 h-10 text-green-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Leaderboard
            </h1>
        </div>
          <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full"></div>
          {leaderboardData && (
            <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 inline-block border border-gray-700">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-white font-medium">{leaderboardData.event_name}</span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-300">{isJunior ? "Junior" : "Senior"} Division</span>
          </div>
              </div>
            </div>
          )}
              </div>

        {/* Enhanced Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedEventId}
              onChange={handleEventChange}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-750 transition-colors duration-200"
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
            </div>

          <div className="relative flex-1">
            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={isJunior ? "junior" : "senior"}
              onChange={handleCategoryChange}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-750 transition-colors duration-200"
            >
              <option value="senior">Senior Division</option>
              <option value="junior">Junior Division</option>
            </select>
              </div>
            </div>

        {/* Enhanced Leaderboard Table */}
        {leaderboardData && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-800 to-gray-700">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-green-500" />
                        Rank
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-green-500" />
                        Team
                      </div>
                    </th>
                    {leaderboardData.problems?.map((problem, index) => (
                      <th key={problem.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-200 uppercase tracking-wider">
                        <div className="flex flex-col items-center">
                          <Target className="w-4 h-4 mb-1 text-green-500" />
                          <span className="truncate max-w-24">{problem.title}</span>
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-200 uppercase tracking-wider">
                      <div className="flex flex-col items-center">
                        <Award className="w-4 h-4 mb-1 text-green-500" />
                        Total
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaderboardData.users?.map((team, index) => (
                    <tr 
                      key={team.teamname} 
                      className={`hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-[1.01] ${
                        team.rank <= 3 ? 'bg-gray-800/30' : ''
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(team.rank)}
                          <span className={`text-sm font-bold ${team.rank <= 3 ? 'text-white' : 'text-gray-300'}`}>
                            {team.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            team.rank === 1 ? 'bg-yellow-400' : 
                            team.rank === 2 ? 'bg-gray-300' : 
                            team.rank === 3 ? 'bg-amber-600' : 'bg-gray-500'
                          }`}></div>
                          <span className={`text-sm font-semibold ${team.rank <= 3 ? 'text-white' : 'text-gray-200'}`}>
                            {team.teamname}
                          </span>
                        </div>
                      </td>
                      {leaderboardData.problem_columns?.map((col, colIndex) => (
                        <td key={col} className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex flex-col items-center">
                            <span className={`text-sm font-medium ${getScoreColor(team[col] || 0)}`}>
                              {team[col] || 0}
                            </span>
                            <div className="w-full bg-gray-700 rounded-full h-1 mt-1 max-w-16">
                              <div 
                                className={`h-1 rounded-full ${
                                  (team[col] || 0) >= 90 ? 'bg-green-400' :
                                  (team[col] || 0) >= 70 ? 'bg-yellow-400' :
                                  (team[col] || 0) >= 50 ? 'bg-orange-400' : 'bg-red-400'
                                }`}
                                style={{ width: `${Math.min((team[col] || 0), 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-lg font-bold ${
                            team.rank === 1 ? 'text-yellow-400' :
                            team.rank === 2 ? 'text-gray-300' :
                            team.rank === 3 ? 'text-amber-600' : 'text-green-400'
                          }`}>
                            {team.total_score}
                          </span>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
