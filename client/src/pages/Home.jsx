import Navbar from "../components/Navbar";
import "../components/css/home.css";
import home from "../images/home.gif";
import React, { useState, useEffect } from "react";
import { getUser } from "../services/task-services";
import HomeTasks from "./HomeTask";
import { getAssignment, getProject, getTest } from "../services/task-services";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(null); // Set to null initially
  const [tasks, setTasks] = useState(null); // Set to null initially for loading state

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const userN = await getUser();
        const userId = userN.data.userId;

        // Fetch all tasks
        const [assignments, projects, tests] = await Promise.all([
          getAssignment(userId),
          getProject(userId),
          getTest(userId),
        ]);

        // Check if any task data exists and update state
        if (
          (assignments.data && assignments.data.length > 0) ||
          (projects.data && projects.data.length > 0) ||
          (tests.data && tests.data.length > 0)
        ) {
          setTasks(true); // There are tasks
        } else {
          setTasks(false); // No tasks available
        }
      } catch (error) {
        console.log("Error fetching tasks:", error);
        setTasks(false); // Handle case where tasks can't be fetched
      }
    };

    const getLoggedInUser = async () => {
      try {
        const userN = await getUser();
        if (userN.data && userN.data.userId) {
          setLoggedIn(true); // User is logged in
        }
      } catch (error) {
        console.log("error", error.message);
        if (error.message === "Request failed with status code 401") {
          setLoggedIn(false); // User not logged in
        }
      }
    };

    // Fetch both tasks and logged-in user status
    fetchAllTasks();
    getLoggedInUser();
  }, []);

  // If loading both tasks and login status, render nothing or a loader
  if (
    (loggedIn === false || loggedIn === null) &&
    (tasks === null || tasks === false)
  ) {
    return (
      <>
        <Navbar />

        <div className="container home">
          <div className="d-flex info flex-column">
            <h2 className="line">
              Begin your course journey with FinishLine to help you complete
              each milestone & reach your finish line.
            </h2>

            <a href="/login">
              <button className="btn-grad-signuphome">Login</button>
            </a>
          </div>
          <div className="d-flex gif flex-column">
            <img className="homeImg" src={home} alt="Home GIF" />
            <p>
              FinishLine will track your remaining tasks, deadlines, and
              progress, letting us manage the "when" so that you can focus on
              the "how".
            </p>
          </div>
        </div>
      </>
    );
  } else if (tasks !== null && loggedIn === true) {
    return (
      <>
        <Navbar />
        {tasks ? ( // If tasks are available, show the HomeTasks component
          <HomeTasks />
        ) : (
          <div>
            {tasks === false ? (
              <div className="container home">
                <div className="d-flex info flex-column">
                  <h2 className="line">
                    Begin your course journey with FinishLine to help you
                    complete each milestone & reach your finish line.
                  </h2>
                  <a href="/create/tasks">
                    <button className="btn-grad-start">Start Tracking</button>
                  </a>
                </div>
                <div className="d-flex gif flex-column">
                  <img className="homeImg" src={home} alt="Home GIF" />
                  <p>
                    FinishLine will track your remaining tasks, deadlines, and
                    progress, letting us manage the "when" so that you can focus
                    on the "how".
                  </p>{" "}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </>
    );
  }
};

export default Home;
