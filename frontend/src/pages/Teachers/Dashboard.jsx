// TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
  FaBell,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaFileAlt,
} from 'react-icons/fa';

const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAssignments: 0,
    pendingGrading: 0,
    upcomingClasses: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setStats({
          totalStudents: 156,
          totalAssignments: 24,
          pendingGrading: 8,
          upcomingClasses: 5,
        });
        setRecentActivities([
          { id: 1, type: 'submission', student: 'John Doe', assignment: 'Math Quiz 1', time: '2 hours ago' },
          { id: 2, type: 'graded', student: 'Jane Smith', assignment: 'Physics Lab', time: '4 hours ago' },
          { id: 3, type: 'question', student: 'Mike Johnson', assignment: 'Chemistry HW', time: '1 day ago' },
        ]);
        setUpcomingEvents([
          { id: 1, title: 'Physics Class', time: '9:00 AM', date: 'Today', room: 'Room 101' },
          { id: 2, title: 'Math Quiz', time: '11:00 AM', date: 'Tomorrow', room: 'Room 203' },
          { id: 3, title: 'Department Meeting', time: '2:00 PM', date: 'Sep 25', room: 'Conference Room' },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, Teacher!</h1>
            <p className="text-gray-600 mt-2">Here's what's happening in your classes today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: FaUserGraduate, label: 'Total Students', value: stats.totalStudents, color: 'blue' },
              { icon: FaFileAlt, label: 'Total Assignments', value: stats.totalAssignments, color: 'green' },
              { icon: FaExclamationCircle, label: 'Pending Grading', value: stats.pendingGrading, color: 'yellow' },
              { icon: FaCalendarAlt, label: 'Upcoming Classes', value: stats.upcomingClasses, color: 'purple' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
                <button className="text-blue-600 hover:text-blue-700">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start p-4 bg-gray-50 rounded-xl">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'submission' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'graded' ? 'bg-green-100 text-green-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'submission' ? <FaFileAlt /> :
                       activity.type === 'graded' ? <FaCheckCircle /> :
                       <FaBell />}
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-800 font-medium">
                        {activity.student} - {activity.assignment}
                      </p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
                <button className="text-blue-600 hover:text-blue-700">View Calendar</button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                      <FaCalendarAlt className="text-blue-600 mb-1" />
                      <span className="text-sm font-medium text-blue-600">{event.date}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-gray-800 font-medium">{event.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <FaClock className="mr-1" />
                        <span>{event.time}</span>
                        <span className="mx-2">•</span>
                        <span>{event.room}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: FaFileAlt, label: 'Create Assignment', color: 'blue' },
                    { icon: FaChartLine, label: 'View Analytics', color: 'green' },
                    { icon: FaBell, label: 'Announcements', color: 'yellow' },
                    { icon: FaCalendarAlt, label: 'Schedule Class', color: 'purple' },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className={`flex flex-col items-center p-4 rounded-xl bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors duration-300`}
                    >
                      <action.icon className={`w-6 h-6 text-${action.color}-600 mb-2`} />
                      <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
