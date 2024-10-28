import Home from "./pages/Home";
import CreateTasks from "./pages/CreateTasks";
import Tasks from "./pages/Tasks";
import Calender from "./pages/Calender";
import Login from "./pages/login";
import Signup from "./pages/signup";
import HomeTask from "./pages/HomeTask";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create/tasks" element={<CreateTasks />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homeTask" element={<HomeTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
