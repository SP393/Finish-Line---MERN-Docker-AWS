import Navbar from "../components/Navbar";
import "../components/css/tasks.css";
import {
  getAssignment,
  getProject,
  getTest,
  updateAssignment,
  updateProject,
  updateTest,
  deleteAssignment,
  deleteProject,
  deleteTest,
  getUser,
} from "../services/task-services";
import React, { useState, useEffect } from "react";
import deleted from "../images/delete.png";
import addlogo from "../images/plus.png";
import check from "../images/check.png";
import completed from "../images/completed.png";
import home from "../images/run.gif";
import edit from "../images/edit.png";
import close from "../images/close.png";

const Tasks = () => {
  const [assignments, setAssignments] = useState(null);
  const [projects, setProjects] = useState(null);
  const [tests, setTests] = useState(null);
  const [status, setStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit modal state
  const [editType, setEditType] = useState("");
  const [updateTitle, setTitle] = useState("");
  const [editTask, setEditTask] = useState(null);
  const cardColors = ["#AF51C1", "#68B3C0", "#94DB95"];
  let colorCounter = 0;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userN = await getUser();
        console.log("userget", userN);
        const Assignments = await getAssignment(userN.data.userId);
        const Projects = await getProject(userN.data.userId);
        console.log("project", Projects.data);
        const Tests = await getTest(userN.data.userId);
        setAssignments(Assignments.data);
        setProjects(Projects.data);
        setTests(Tests.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, [status, isEditModalOpen]);
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

  const getColors = (type) => {
    if (type === "assignment") {
      return cardColors[0];
    } else if (type === "project") {
      return cardColors[1];
    } else {
      return cardColors[2];
    }
  };

  const changeCompleted = async (isCompleted, type, title) => {
    setStatus(!status);
    setIsModalOpen(true); // Open the modal
    setIsBackgroundBlurred(true); // Apply background blur

    setTimeout(() => {
      setIsModalOpen(false); // Close the modal after some time (e.g., 3 seconds)
      setIsBackgroundBlurred(false); // Remove background blur
    }, 3000); // 3-second delay for the GIF

    const userN = await getUser();
    console.log("usergetUpdate", userN);
    if (type === "assignment") {
      await updateAssignment(userN.data.userId, title, {
        completed: !isCompleted,
      });
      console.log("done");
    } else if (type === "project") {
      await updateProject(userN.data.userId, title, {
        completed: !isCompleted,
      });
    } else {
      await updateTest(userN.data.userId, title, { completed: !isCompleted });
    }
    fetchTasks();
  };

  const deleteTask = async (type, title) => {
    setStatus(!status);
    const userN = await getUser();
    console.log("usergetUpdate", userN);
    if (type === "assignment") {
      await deleteAssignment(userN.data.userId, title);
    } else if (type === "project") {
      await deleteProject(userN.data.userId, title);
    } else {
      await deleteTest(userN.data.userId, title);
    }
  };

  const completedStatus = (isCompleted) => {
    if (isCompleted === true) {
      return `${completed}`;
    } else {
      return `${check}`;
    }
  };

  const openEditModal = (type, task) => {
    setEditType(type);
    setTitle(task.title);
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  // Handle the input change for the modal fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle datetime-local input specifically
    if (e.target.type === "datetime-local") {
      setEditTask({
        ...editTask,
        due: new Date(value), // Convert the datetime-local value to a Date object
      });
    } else {
      setEditTask({
        ...editTask,
        [name]: value,
      });
    }
  };

  // Handle the form submission for editing the task
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const userN = await getUser();
    editTask.due = new Date(editTask.due);
    if (editType === "assignment") {
      await updateAssignment(userN.data.userId, updateTitle, editTask);
    } else if (editType === "project") {
      await updateProject(userN.data.userId, updateTitle, editTask);
    } else {
      await updateTest(userN.data.userId, updateTitle, editTask);
    }
    setIsEditModalOpen(false); // Close modal after submitting
    fetchTasks(); // Refresh the tasks
  };

  if (assignments === null || projects === null || tests === null) {
    return null; // Render nothing (or use a loading spinner here)
  }

  return (
    <>
      <div
        className={`container-fluid ${
          isBackgroundBlurred ? "blur-effect" : ""
        }`}
      >
        <Navbar></Navbar>
        <body>
          <div class="container colorBlocks py-5" id="assignment">
            <h3>Assignment</h3>
            <div class="row row-cols-1 row-cols-md-3 g-4 py-5">
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <div class="col">
                    <div
                      class="card"
                      style={{ backgroundColor: `${getColors("assignment")}` }}
                    >
                      <div class="card-body">
                        <div class="d-flex title ">
                          <h4 class="card-title p-2">{assignment.title}</h4>

                          <button
                            class="completed p-2"
                            onClick={() =>
                              changeCompleted(
                                assignment.completed,
                                "assignment",
                                assignment.title
                              )
                            }
                          >
                            <img src={completedStatus(assignment.completed)} />
                          </button>
                          <button
                            class=" edit ml-auto p-2"
                            onClick={() =>
                              openEditModal("assignment", assignment)
                            }
                          >
                            <img src={edit} />
                          </button>
                          <button
                            class="deleted ml-auto p-2"
                            onClick={() =>
                              deleteTask("assignment", assignment.title)
                            }
                          >
                            <img src={deleted} />
                          </button>
                        </div>

                        <p class="card-text">Subject: {assignment.subject}</p>
                        <h5>Due on: {formatDate(assignment.due)}</h5>
                        <div class="doubts">
                          <h5>Doubts -</h5>
                          <p>{assignment.doubts}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex plus">
                  <p>Add Assignments</p>
                  <a href="/create/tasks">
                    <img src={addlogo} alt="add" />
                  </a>
                </div>
              )}
              {assignments.length > 0 ? (
                <div class="col plusMore">
                  <a class="card-text" href="/create/tasks">
                    <img src={addlogo} alt="add" />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <div class="container colorBlocks" id="project">
            <h3>Project</h3>
            <div class="row row-cols-1 row-cols-md-3 g-4 py-5">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div class="col">
                    <div
                      class="card"
                      style={{ backgroundColor: `${getColors("project")}` }}
                    >
                      <div class="card-body">
                        <div class="d-flex title ">
                          <h4 class="card-title p-2">{project.title}</h4>

                          <button
                            class="completed p-2"
                            onClick={() =>
                              changeCompleted(
                                project.completed,
                                "project",
                                project.title
                              )
                            }
                          >
                            <img src={completedStatus(project.completed)} />
                          </button>
                          <button
                            class=" edit ml-auto p-2"
                            onClick={() => openEditModal("project", project)}
                          >
                            <img src={edit} />
                          </button>
                          <button
                            class="deleted ml-auto p-2"
                            onClick={() => deleteTask("project", project.title)}
                          >
                            <img src={deleted} />
                          </button>
                        </div>
                        <p class="card-text">Subject: {project.subject}</p>
                        <h5>Due on: {formatDate(project.due)}</h5>
                        <div class="doubts">
                          <h5>Doubts -</h5>
                          <p>{project.doubts}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex plus">
                  <p>Add Projects</p>
                  <a href="/create/tasks">
                    <img src={addlogo} alt="add" />
                  </a>
                </div>
              )}
              {projects.length > 0 ? (
                <div class="col plusMore">
                  <a class="card-text" href="/create/tasks">
                    <img src={addlogo} alt="add" />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <div class="container colorBlocks py-1" id="test">
            <h3>Test</h3>
            <div class="row row-cols-1 row-cols-md-3 g-4 py-5">
              {tests.length > 0 ? (
                tests.map((test) => (
                  <div class="col">
                    <div
                      class="card"
                      style={{ backgroundColor: `${getColors("test")}` }}
                    >
                      <div class="card-body">
                        <div class="d-flex title ">
                          <h4 class="card-title p-2">{test.topic}</h4>

                          <button
                            class="completed p-2"
                            onClick={() =>
                              changeCompleted(
                                test.completed,
                                "test",
                                test.topic
                              )
                            }
                          >
                            <img src={completedStatus(test.completed)} />
                          </button>
                          <button
                            class=" edit ml-auto p-2"
                            onClick={() => openEditModal("test", test)}
                          >
                            <img src={edit} />
                          </button>
                          <button
                            class="deleted ml-auto p-2"
                            onClick={() => deleteTask("test", test.topic)}
                          >
                            <img src={deleted} />
                          </button>
                        </div>
                        <p class="card-text">Subject: {test.subject}</p>
                        <h5>Due on: {formatDate(test.testDate)}</h5>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex plus">
                  <p>Add Tests</p>
                  <a href="/create/tasks">
                    <img src={addlogo} alt="add" />
                  </a>
                </div>
              )}
              {tests.length > 0 ? (
                <div class="col plusMore">
                  <a class="card-text" href="/create/tasks">
                    <img src={addlogo} alt="add" />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </body>
      </div>
      {/* Modal overlay for the GIF */}
      {isModalOpen && (
        <div class="modal-overlay">
          <div class="modal-content-fire">
            <img src={home} alt="Completed" class="centered-gif" />
          </div>
        </div>
      )}
      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <div className="modal-background">
          <div
            className="modal-content"
            style={{ border: `2px solid ${getColors(editType)}` }}
          >
            <div class="d-flex flex-row edit-row">
              <h3 className="edith3"></h3>
              <button
                class="editClose ml-auto p-2"
                onClick={() => setIsEditModalOpen(false)}
              >
                <img class="editImg" src={close} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={editTask.title}
                onChange={handleInputChange}
                required
              />
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                value={editTask.subject}
                onChange={handleInputChange}
                required
              />
              <label>Due:</label>
              <input
                type="datetime-local"
                required
                value={new Date(editTask.due).toISOString().slice(0, 16)}
                onChange={handleInputChange}
              />
              <label>Doubts:</label>
              <input
                type="text"
                name="doubts"
                value={editTask.doubts}
                onChange={handleInputChange}
              />

              <button type="submit" className="btn-edit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
