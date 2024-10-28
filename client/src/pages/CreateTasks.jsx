import Navbar from "../components/Navbar";
import "../components/css/createTask.css";
import {
  addAssignment,
  addProject,
  addTest,
  getUser,
} from "../services/task-services";
import React, { useState } from "react";
import success from "../images/successful.png";
import { useNavigate } from "react-router-dom";

const CreateTasks = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [due, setDue] = useState("");
  const [doubt, setDoubt] = useState("");
  const [submitted, setSubmit] = useState(false);
  const navigate = useNavigate();

  const addTask = async (event) => {
    event.preventDefault();
    const userN = await getUser();
    const dueDate = new Date(due);
    const task = {
      userId: userN.data.userId,
      subject: subject,
    };
    if (type === "Test") {
      task.topic = title;
      task.testDate = dueDate;
    } else {
      task.title = title;
      task.due = dueDate;
      task.doubts = doubt ? doubt : "";
    }
    if (type === "Assignment") {
      await addAssignment(task);
    } else if (type === "Project") {
      await addProject(task);
    } else if (type === "Test") {
      await addTest(task);
    }
    navigate("/tasks");
    onClick();
  };

  const onClick = () => setSubmit(!submitted);

  if (!submitted) {
    return (
      <div className="page">
        <Navbar />
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
          <div className="elevated-box w-75">
            <form onSubmit={addTask}>
              <div className="form-group mb-3">
                <label htmlFor="type">Task Type</label>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option>Assignment</option>
                    <option>Project</option>
                    <option>Test</option>
                  </select>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  {type === "Test" ? (
                    <label htmlFor="topic">Topic</label>
                  ) : (
                    <label htmlFor="title">Title</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  {type === "Test" ? (
                    <label htmlFor="date">Test Date</label>
                  ) : (
                    <label htmlFor="date">Due Date</label>
                  )}
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="date"
                    required
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                  />
                </div>

                {type !== "Test" && (
                  <div className="col-md-6">
                    <label htmlFor="message">Doubts</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                      value={doubt}
                      onChange={(e) => setDoubt(e.target.value)}
                    ></textarea>
                  </div>
                )}
              </div>

              <button type="submit" className="btn-grad ">
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="page">
        <Navbar />
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
          <div className="elevated-box">
            <div className="after-submit">
              <div className="top d-flex tick align-items-center justify-content-center">
                <img src={success} alt="" />
                <h5>Task Added!!</h5>
              </div>
              <div className="bottom d-flex align-items-center justify-content-center">
                <button
                  type="button"
                  className="btn-grad-more"
                  onClick={onClick}
                >
                  Add Tasks
                </button>
                <a href="/tasks">
                  <button type="button" className="btn-grad-view">
                    View Tasks
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateTasks;
