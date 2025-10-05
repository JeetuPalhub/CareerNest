import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Home from "./Home/Home";
import CreateJob from "./pages/createJob";
import Companies from "./pages/Companies";
import CompanyList from "./pages/ShowCompaies";
import JobList from "./pages/Showjobs";
import ApplicantsList from "./pages/ApplicantsList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className=" mt-20">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/CreateJob" element={<CreateJob />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companiesList" element={<CompanyList />} />
             <Route path="/Jobs" element={<JobList />} />
               <Route path="/jobs/:jobId" element={<ApplicantsList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
