import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // New Header component with logo
import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import Signup from './components/signup';
import StudentProfile from './components/student_profile';
import Skills from './components/skills';
import Projects from './components/projects';
import Companies from './components/companies';
import AdditionalInfo from './components/additional_info';
import JobListings from './components/JobListings'; // Update this line
import Job from './components/Job'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/dashboard';
import CompanyLogin from './components/CompanyLogin';
import StudentLogin from './components/StudentLogin';
import DashboardCompany from './components/dashboardCompany';
import AcademicPerformance from './components/AcademicPerformance'
import CompanyInfo from './components/CompanyInfo'; 
import StudentRegistrationFlow from './components/StudentRegistrationFlow';

import './App.css';

function App() {
  return (
    <Router>
      <Header />  {/* Add Header here for consistent navigation */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/company" element={<CompanyLogin />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardCompany" element={<DashboardCompany />} />
          <Route path="/AcademicPerformance" element={<AcademicPerformance />} />
          <Route path="/CompanyInfo" element={<CompanyInfo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/student-registration" element={<StudentRegistrationFlow />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/additional_info" element={<AdditionalInfo />} />
          <Route path="/JobListings" element={<JobListings />} />
          <Route path="/Job" element={<Job />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
