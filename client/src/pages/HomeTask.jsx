import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../components/css/homeTask.css";
import taskImg from "../images/taskHome.png";
import calender from "../images/calender.png";
import run from "../images/man.gif";
import flags from "../images/flags.png";
import road from "../images/roads.png";

import {
  getAssignment,
  getProject,
  getTest,
  getUser,
} from "../services/task-services";

const HomeTask = () => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState(null);
  const cardColors = ["#AF51C1", "#68B3C0", "#94DB95"];
  let colorCounter = 0;

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        let tasksData = [];
        const userN = await getUser();

        // Fetch assignments, projects, and tests based on user ID
        const Assignments = await getAssignment(userN.data.userId);
        const Projects = await getProject(userN.data.userId);
        const Tests = await getTest(userN.data.userId);

        // Combine all tasks (assignments, projects, and tests) into one array
        const allTasks = [
          ...Assignments.data.map((assignment) => ({
            type: "assignment",
            title: assignment.title,
            due: assignment.due,
            subject: assignment.subject,
            completed: assignment.completed, // Ensure this property exists
          })),
          ...Projects.data.map((project) => ({
            type: "project",
            title: project.title,
            due: project.due,
            subject: project.subject,
            completed: project.completed, // Ensure this property exists
          })),
          ...Tests.data.map((test) => ({
            type: "test",
            title: test.topic,
            due: test.due,
            subject: test.subject,
            completed: test.completed, // Ensure this property exists
          })),
        ];

        // Sort all tasks by due date
        allTasks.sort((a, b) => new Date(a.due) - new Date(b.due));
        setAllTasks(allTasks);
        // Add only the first 3 tasks to tasksData
        const pendingTasks = allTasks.filter((task) => !task.completed);
        tasksData = pendingTasks.slice(0, 3);
        setTasks(tasksData); // Update state with the formatted tasks array
        console.log("Formatted tasks:", tasksData);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };

    fetchAllTasks(); // Fetch tasks on component mount
  }, []);
  const getColors = () => {
    colorCounter++;
    if (colorCounter > cardColors.length) {
      colorCounter = 1;
    }
    return cardColors[colorCounter - 1];
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // This will display the time in 12-hour format with AM/PM. Set to false for 24-hour format.
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  // Find the last completed task
  let lastCompletedTaskIndex = 0;
  let completedTasks = 0;
  if (allTasks !== null) {
    completedTasks = allTasks.filter((task) => task.completed);
    lastCompletedTaskIndex =
      completedTasks.length >= 1 ? completedTasks.length - 1 : -1;
  }

  return (
    <>
      <body>
        {allTasks === null ? (
          ""
        ) : (
          <div>
            <div class="container homeTask">
              <div class="d-flex homeView flex-column">
                <h4 class="homeT">Daily Tasks</h4>
                <div class="d-flex flex-row home-row">
                  <div class="d-flex flex-column daily gap-3">
                    <h5 class="gap-underline">
                      Check your daily tasks and schedule
                    </h5>
                    <a href="/tasks">
                      <button class="btn-grad-stview-task">Tasks</button>
                    </a>
                  </div>
                  <div class="d-flex flex-column cal gap-3">
                    <h5 class="gap-underline">View Task in Calender</h5>
                    <a href="/tasks">
                      <img class="calImg" src={calender} alt="" />
                    </a>
                  </div>
                  <img class="taskHomeImg" src={taskImg} alt="" />
                </div>
              </div>
            </div>
            <div className="container homeTrack">
              <div className="d-flex flex-row hometrack-row">
                {completedTasks.length === 0 ? (
                  <img className="trackMan" src={run} alt="Track Man" />
                ) : (
                  ""
                )}
                {allTasks.map((task, index) => (
                  <div key={index} className="d-flex align-items-center">
                    {/* Render the flag image */}
                    <img className="TrackFlags" src={flags} alt="Flag" />
                    {/* Conditionally render the man image if it's the last completed task */}
                    {lastCompletedTaskIndex === index && (
                      <img className="trackMan2" src={run} alt="Track Man" />
                    )}
                  </div>
                ))}
                <img className="trackRoad" src={road} alt="Track Man" />
              </div>
            </div>
            <div class="container homeBlock">
              <div class="d-flex homeView flex-column">
                <div class="container homeViewTask py-5" id="assignment">
                  <h3 class="homeh3">Due Soon</h3>
                  <div class="row row-cols-1 row-cols-md-3 g-4 py-5">
                    {tasks.length > 0
                      ? tasks.map((task) => (
                          <div class="col">
                            <div
                              class="card"
                              style={{ backgroundColor: `${getColors()}` }}
                            >
                              <div class="card-body ht">
                                <div class="d-flex title ">
                                  <h4 class="card-title h4t p-2">
                                    {task.title}
                                  </h4>
                                </div>
                                <p class="card-text">Subject: {task.subject}</p>
                                <h5>Due on: {formatDate(task.due)}</h5>
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </body>
    </>
  );
};

export default HomeTask;
