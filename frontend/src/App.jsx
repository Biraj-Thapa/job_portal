import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/common/ProtectedRoute";

// ✅ Seeker pages
import SeekerDashboard from "./pages/seeker/SeekerDashboard";
import MyApplications from "./pages/seeker/MyApplications";
import ApplyJob from "./pages/seeker/ApplyJob";

// ✅ Employer pages
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import CreateJob from "./pages/employer/CreateJob";
import JobApplications from "./pages/employer/JobApplications";
import MyJobs from "./pages/employer/MyJobs"; 
import EditJob from "./pages/employer/EditJob"; 
import JobDetail from "./pages/seeker/JobDetail";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Main content */}
            <div className="flex-1">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Seeker routes */}
                <Route
                  path="/seeker/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["SEEKER"]}>
                      <SeekerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/seeker/my-applications"
                  element={
                    <ProtectedRoute allowedRoles={["SEEKER"]}>
                      <MyApplications />
                    </ProtectedRoute>
                  }
                />

<Route
  path="/seeker/jobs/:id"
  element={
    <ProtectedRoute allowedRoles={["SEEKER"]}>
      <JobDetail />
    </ProtectedRoute>
  }
/>
                <Route
                  path="/seeker/jobs/:id/apply"
                  element={
                    <ProtectedRoute allowedRoles={["SEEKER"]}>
                      <ApplyJob />
                    </ProtectedRoute>
                  }
                />
                {/* Employer routes */}
                <Route
                  path="/employer/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                      <EmployerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/create-job"
                  element={
                    <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                      <CreateJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/my-jobs"
                  element={
                    <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                      <MyJobs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/edit-job/:id"
                  element={
                    <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                      <EditJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/jobs/:id/applications"
                  element={
                    <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                      <JobApplications />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route
                  path="*"
                  element={<h1 className="p-6">Page Not Found</h1>}
                />
              </Routes>
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
