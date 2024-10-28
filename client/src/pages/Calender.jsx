import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
  viewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import "@schedule-x/theme-default/dist/index.css";
import {
  getAssignment,
  getProject,
  getTest,
  getUser,
} from "../services/task-services";
import "../components/css/calender.css";

const Calendar = () => {
  const [tasks, setTasks] = useState([]);

  const plugins = [
    createEventsServicePlugin(),
    createDragAndDropPlugin(),
    createEventModalPlugin(),
  ];

  // Initialize the calendar here
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    defaultView: viewWeek.name,
    events: tasks,
    plugins,
  });

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        let tasksData = [];
        let counter = 0;
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
          })),
          ...Projects.data.map((project) => ({
            type: "project",
            title: project.title,
            due: project.due,
            subject: project.subject,
          })),
          ...Tests.data.map((test) => ({
            type: "test",
            title: test.topic,
            due: test.testDate,
            subject: test.subject,
          })),
        ];

        // Sort all tasks by due date
        allTasks.sort((a, b) => new Date(a.due) - new Date(b.due));

        // Map through the sorted tasks and push events with the correct format
        allTasks.forEach((task) => {
          const startDate = new Date(task.due); // Assuming `date` is your starting date and time

          // Create the end date by adding one hour to the start time
          const endDate = new Date(startDate);
          endDate.setHours(endDate.getHours() + 1); // Add 1 hour to the endDate

          // Format the start and end dates as "YYYY-MM-DD HH:MM"
          const formatDate = (date) => {
            return date
              .toLocaleString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // Ensures 24-hour format
              })
              .replace(",", "")
              .replace(/\//g, "-");
          };

          const formattedStartDate = formatDate(startDate);
          const formattedEndDate = formatDate(endDate);

          let event = {
            id: ++counter, // Unique ID for each event
            title: task.title,
            start: formattedStartDate, // Correctly formatted start date
            end: formattedEndDate, // Correctly formatted end date
            description: task.subject, // Description based on task type
          };
          tasksData.push(event); // Add event to the tasksData array
        });

        setTasks(tasksData); // Update state with the formatted tasks array
        console.log("Formatted tasks:", tasksData);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };

    fetchAllTasks(); // Fetch tasks on component mount
  }, []);

  useEffect(() => {
    console.log("Updated tasks", tasks);

    calendar.setTheme("dark");
    calendar.eventsService.set(tasks); // Update events when tasks change
  }, [tasks]); // Run this effect when `tasks` change

  return (
    <>
      <Navbar />
      <div id="calendar">
        <ScheduleXCalendar
          class="sx-react-calendar-wrapper"
          calendarApp={calendar}
        />
      </div>
    </>
  );
};

export default Calendar;
