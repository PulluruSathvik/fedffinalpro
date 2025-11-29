import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Imports all pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegSuccess from "./pages/RegSuccess";
import StudentAssignments from "./pages/StudentAssignments";
import StudentDashboard from "./pages/StudentDashboard";
import StudentGroup from "./pages/StudentGroup";
import StudentMilestones from "./pages/StudentMilestones";
import StudentProjects from "./pages/StudentProjects";
import StudentReport from "./pages/StudentReport";
import StudentResources from "./pages/StudentResources";
import StudentSettings from "./pages/StudentSettings";
import StudentStreaks from "./pages/StudentStreaks";   // NEW

import TCheckGroup from "./pages/TCheckGroup";
import TDashboard from "./pages/TDashboard";
import TeacherMessages from "./pages/TeacherMessages";
import TeacherResources from "./pages/TeacherResources";
import TProfile from "./pages/TProfile";
import ViewStudents from "./pages/ViewStudents";
import AssignProject from "./pages/AssignProject";
import Corrections from "./pages/Corrections";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route to show Login page */}
        <Route path="/" element={<Login />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/regsuccess" element={<RegSuccess />} />

        {/* Student */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-assignments" element={<StudentAssignments />} />
        <Route path="/student-group" element={<StudentGroup />} />
        <Route path="/student-milestones" element={<StudentMilestones />} />
        <Route path="/student-projects" element={<StudentProjects />} />
        <Route path="/student-report" element={<StudentReport />} />
        <Route path="/student-resources" element={<StudentResources />} />
        <Route path="/student-settings" element={<StudentSettings />} />
        <Route path="/student-streaks" element={<StudentStreaks />} /> {/* NEW */}

        {/* Teacher */}
        <Route path="/tdashboard" element={<TDashboard />} />
        <Route path="/tcheckgroup" element={<TCheckGroup />} />
        <Route path="/teachers-messages" element={<TeacherMessages />} />
        <Route path="/teacher-resources" element={<TeacherResources />} />
        <Route path="/tprofile" element={<TProfile />} />
        <Route path="/view-students" element={<ViewStudents />} />
        <Route path="/assign-project" element={<AssignProject />} />
        <Route path="/corrections" element={<Corrections />} />
      </Routes>
    </Router>
  );
}

export default App;
