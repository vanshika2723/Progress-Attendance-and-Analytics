 let students = JSON.parse(localStorage.getItem("students")) || [

 ];

// instructor data

let instructors = JSON.parse(localStorage.getItem("instructors")) || [];
let currentInstructor = null;

// student data

const studentForm =  document.getElementById("studentFrom");
const studentName =  document.getElementById("studentname");
const studentCourse =   document.getElementById("studentCourse");
const studentAttendance =  document.getElementById("studentAtd");
const studentProgress = document.getElementById("studentPro");
const searchBox =  document.getElementById("searchBox");
const totalStudents =   document.getElementById("totalStudents");
const courseCount =    document.getElementById("course");
const avgAttendance =  document.querySelector(".avg-atd");
const avgProgress =   document.querySelector(".avg-pro");
const statusTable = document.getElementById("statusTable");
const progressType = document.getElementById("progressType");
const trendFilter = document.getElementById("tendFilter");

// charts
let progressChart;
let trendChart;
let completionChart;

function saveStudents() {

    localStorage.setItem(
        "students", JSON.stringify(students)
    );

}

// stats
function updateStatistics(data) {

    totalStudents.textContent = data.length;
    if (data.length === 0) {
        avgAttendance.textContent = "0%";
        avgProgress.textContent = "0%";
        courseCount.textContent = "0";

        return;
    }

    let attendanceTotal = 0;
    let progressTotal = 0;

    data.forEach(function(student) {
        attendanceTotal += Number(student.attendance);
        progressTotal += Number(student.progress);

    });


    const attendanceAverage =  Math.round(attendanceTotal / data.length);
    const progressAverage = Math.round(progressTotal / data.length);
    const completedCourses =
        data.filter(function(student) {
            return Number(student.progress) >= 100;

        }).length;


    avgAttendance.textContent = attendanceAverage + "%";
    avgProgress.textContent = progressAverage + "%";
    courseCount.textContent = completedCourses;

}

// status
function getStatus(student) {

    const attendance =  Number(student.attendance);
    const progress = Number(student.progress);

    if (
        attendance < 70 ||
        progress < 50
    ) {
        return "At Risk";

    }

    if (
        attendance < 80 ||
        progress < 70
    ) {
        return "Warning";

    }
    return "Good";

}
// risk tabl

function updateRiskTable(data) {
    statusTable.innerHTML = "";

    const riskStudents = data.filter(function(student) {
            return (
                Number(student.attendance) < 80 ||
                Number(student.progress) < 70
            );

        });


    if (riskStudents.length === 0) {

        statusTable.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No students at risk
                </td>
            </tr> `;

        return;
    }

    riskStudents.forEach(function(student, index) {

        const status = getStatus(student);
        let statusClass = "";

        if (status === "At Risk") {

            statusClass = "risk";

        }
        else if (status === "Warning") {

            statusClass = "warning";

        }
        else {

            statusClass = "good";

        }

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.attendance}%</td>
            <td>${student.progress}%</td>
            <td>
                <span class="status ${statusClass}">
                    ${status}
                </span>
            </td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent('${student.name}')"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td> `;


        statusTable.appendChild(row);

    });

}

// delete student
function deleteStudent(studentName) {

    const confirmDelete = confirm( "Are you sure you want to remove " +  studentName + "?"  );

    if (!confirmDelete) {

        return;

    }

    students = students.filter(function(student) {

            return student.name !== studentName;

        });

    saveStudents();


    updateDashboard();


    // Update currently selected instructor
    if (currentInstructor) {

        showInstructor(currentInstructor);

    }

    alert("Student removed successfully.");

}


//remove stu

const deleteAllBtn =  document.getElementById("deleteAllBtn");

if (deleteAllBtn) {

    deleteAllBtn.addEventListener(
        "click",
        function() {

            if (students.length === 0) {

                alert("There are no students to remove.");

                return;

            }

            const confirmDelete =
                confirm(
                    "Are you sure you want to remove all students?"
                );


            if (!confirmDelete) {

                return;

            }

            students = [];
            localStorage.removeItem("students");
            updateDashboard();
            if (currentInstructor) {
                showInstructor(currentInstructor);

            }

            alert("All students have been removed.");

        }
    );

}
// atd chat

function createProgressChart(data) {

    const labels = data.map(function(student) {

            return student.name;

        });

    const values = data.map(function(student) {

            if (
                progressType.value === "attendance"
            ) {

                return Number(student.attendance);

            }

            return Number(student.progress);

        });


    const chartLabel = progressType.value === "attendance"  ? "Attendance %"  : "Progress %";

    if (progressChart) {

          progressChart.destroy();

    }


    const ctx = document  .getElementById("progressChart")
            .getContext("2d");


    progressChart =  new Chart(ctx, {
          type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {

                        label: chartLabel,
                        data: values,
                        backgroundColor: "#5b8def",
                        borderRadius: 6,
                        borderWidth: 1

                    }

                ]

            },


            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback:
                                function(value) {

                                    return value + "%";

                                }

                        }

                    }

                }

            }

        });

}

// trend chrt
function createTrendChart() {

    if (trendChart) {
        trendChart.destroy();

    }

    const ctx = document
            .getElementById("trendChart")
            .getContext("2d");

    trendChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],

                datasets: [

                    {

                        label: "Attendance",
                        data: [
                            65,
                            68,
                            72,
                            75,
                            78,
                            82
                        ],

                        borderColor: "#5b8def",
                        borderWidth: 3,
                        tension: 0.4,
                        fill: false

                    },

                    {

                        label: "Progress",
                        data: [
                            40,
                            45,
                            52,
                            60,
                            68,
                            75
                        ],

                        borderColor: "#36b37e",
                        borderWidth: 3,
                        tension: 0.4,
                        fill: false

                    }

                ]

            },


            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {

                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback:
                                function(value) {

                                    return value + "%";

                                }

                        }

                    }

                }

            }

        });

}

// course complete

function createCompletionChart(data) {

    let completed = 0;
    let inProgress = 0;
    let notStarted = 0;
    let dropped = 0;


    data.forEach(function(student) {

        const progress =  Number(student.progress);

        if (progress >= 100) {

            completed++;

        }
        else if (progress > 0) {

            inProgress++;

        }
        else {

            notStarted++;

        }

    });


    const total = data.length;

    let completedPercent = 0;
    let progressPercent = 0;
    let notStartedPercent = 0;
    let droppedPercent = 0;


    if (total > 0) {

        completedPercent =  Math.round( (completed / total) * 100);
        progressPercent = Math.round((inProgress / total) * 100);
        notStartedPercent = Math.round( (notStarted / total) * 100);
        droppedPercent = Math.round((dropped / total) * 100);

    }

    document.getElementById("completionTotal").textContent = total;
    document.getElementById("completedValue").textContent = completedPercent + "%";
    document.getElementById("progressValue").textContent = progressPercent + "%";
    document.getElementById("notStartedValue").textContent = notStartedPercent + "%";
    document.getElementById("droppedValue").textContent = droppedPercent + "%";

    if (completionChart) {
        completionChart.destroy();

    }

    const ctx =  document .getElementById("completionChart")
            .getContext("2d");


    completionChart = new Chart(ctx, {
            type: "doughnut",
            data: {

                labels: [
                    "Completed",
                    "In Progress",
                    "Not Started",
                    "Dropped"
                ],

                datasets: [

                    {

                        data: [
                            completed,
                            inProgress,
                            notStarted,
                            dropped
                        ],

                        backgroundColor: [
                            "#22c55e",
                            "#3b82f6",
                            "#f59e0b",
                            "#ef4444"
                        ],

                        borderWidth: 0

                    }

                ]

            },


            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        });

}

// dashboard update
function updateDashboard(data = students) {

    updateStatistics(data);
    updateRiskTable(data);
    createProgressChart(data);
    createCompletionChart(data);


    // Update instructor information
    if (currentInstructor) {

        showInstructor(currentInstructor);

    }

}


studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name = studentName.value.trim();
        const course =  studentCourse.value;
        const attendance = Number(studentAttendance.value);
        const progress =  Number(studentProgress.value);

        if (name === "") {

           alert("Please enter student name.");

            return;
        }

        if (
            attendance < 0 ||
            attendance > 100 ||
            progress < 0 ||
            progress > 100
        ) {

            alert(
                "Attendance and Progress must be between 0 and 100."
            );

            return;

        }

        const newStudent = {

            name: name,
            course: course,
            attendance: attendance,
            progress: progress

        };

        students.push(newStudent);

        saveStudents();

        studentForm.reset();

        updateDashboard();

        alert("Student added successfully.");

    }
);

// search course

searchBox.addEventListener(
    "input",
    function() {

        const searchValue = searchBox.value
                .toLowerCase()
                .trim();

        const filteredStudents = students.filter(function(student) {
                return (
                    student.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    student.course
                        .toLowerCase()
                        .includes(searchValue)
                );

            });


        updateDashboard(filteredStudents);

    }
);
// progress

progressType.addEventListener(
    "change",
    function() {
        const searchValue =searchBox.value
                .toLowerCase()
                .trim();

        const filteredStudents = students.filter(function(student) {

                return (
                    student.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    student.course
                        .toLowerCase()
                        .includes(searchValue)
                );

            });

        createProgressChart(
            filteredStudents
        );

    }
);

// trend

trendFilter.addEventListener(
    "change",
    function() {

        console.log(
            "Selected:",
            trendFilter.value
        );

    }
);

// dark lighht mode

const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn.querySelector("i");
function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }
    else {

        document.body.classList.remove("light");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

    localStorage.setItem(
        "theme",
        theme
    );

}

themeBtn.addEventListener("click", function() {
        if (
            document.body.classList.contains("light")
        ) {
            setTheme("dark");

        }
        else {
            setTheme("light");

        }

    }
);

// save theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    setTheme("light");

}
else {
    setTheme("dark");

}


// instructor form

const instructorForm = document.getElementById("instructorForm");
const instructorName = document.getElementById("instructorName");
const instructorCourse = document.getElementById("instructorCourse");
const deleteInstructorBtn =  document.getElementById( "deleteInstructorBtn");


// instructor display elements

const instructorImage = document.getElementById("instructorImage");
const displayInstructorName = document.getElementById("displayInstructorName");
const displayInstructorCourse = document.getElementById("displayInstructorCourse");
const instructorStudents = document.getElementById("instructorStudents");
const instructorTotal = document.getElementById("instructorTotal");
const instructorAttendance = document.getElementById("instructorAttendance");
const instructorProgress = document.getElementById("instructorProgress");
const assignedCourses = document.getElementById("assignedCourses");
const courseProgress = document.getElementById("courseProgress");
const instructorInsights = document.getElementById("instructorInsights");


// save instructor

function saveInstructors() {

    localStorage.setItem(
        "instructors",
        JSON.stringify(instructors)
    );

}

instructorForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = instructorName.value.trim();
        const course = instructorCourse.value;

        if (name === "") {

            alert("Please enter instructor name.");

            return;
        }

        const newInstructor = {
            name: name,
            course: course

        };

        instructors.push(
            newInstructor
        );

        saveInstructors();
        currentInstructor = newInstructor;

        showInstructor(newInstructor);

        instructorForm.reset();

        alert("Instructor added successfully.");

    }
);

// instructor details

function showInstructor(instructor) {
    if (!instructor) {
        return;
    }

    displayInstructorName.textContent = instructor.name;

    displayInstructorCourse.textContent = instructor.course + " Instructor";

    const nameParts = instructor.name.split(" ");

    let initials = "";

    nameParts.forEach( function(part) {
            if (part.length > 0) {

                initials +=  part.charAt(0)  .toUpperCase();

            }

        }
    );

    instructorImage.textContent =  initials.substring(0, 2);

    // find students of this course

    const courseStudents = students.filter(  function(student) {
                return (
                    student.course.toLowerCase() ===
                    instructor.course.toLowerCase()
                );

            }
        );

    const total = courseStudents.length;

    // student count

    instructorStudents.textContent = total;
    instructorTotal.textContent = total;

    // selected course

    assignedCourses.textContent =  "1";

    // No students

    if (total === 0) {

        instructorAttendance.textContent = "0%";
        instructorProgress.textContent = "0%";

        courseProgress.innerHTML = `

            <p class="no-data">
                No students added for
                ${instructor.course}.
            </p>

        `;

        instructorInsights.innerHTML = `

            <li>
                <i class="fa-solid fa-circle"></i>
                No student data available
                for this course.
            </li>

        `;


        return;

    }

    // calculate totals

    let attendanceTotal = 0;
    let progressTotal = 0;

    courseStudents.forEach(function(student) {
            attendanceTotal += Number(student.attendance);
            progressTotal += Number(student.progress);

        }
    );


    // calculate averages

    const averageAttendance = Math.round(attendanceTotal / total);

    const averageProgress = Math.round(progressTotal / total);

    // display averages

    instructorAttendance.textContent = averageAttendance + "%";
    instructorProgress.textContent = averageProgress + "%";

    // course progress 

    courseProgress.innerHTML = `

        <div class="course-row">

            <span>
                ${instructor.course}
            </span>

            <div class="course-bar">

                <span
                    style="width:${averageProgress}%"
                ></span>

            </div>

            <strong>
                ${averageProgress}%
            </strong>

        </div>

    `;


    // find students needing 

    const studentsNeedSupport = courseStudents.filter(function(student) {
                return (
                    Number(student.attendance) < 70 ||
                    Number(student.progress) < 50
                );

            }
        ).length;


    // quick insights

    instructorInsights.innerHTML = `
        <li>
            <i class="fa-solid fa-circle"></i>
            ${total}
            student(s) are enrolled in
            ${instructor.course}.

        </li>

        <li>
            <i class="fa-solid fa-circle"></i>
            Average attendance is
            ${averageAttendance}%.

        </li>

        <li>
            <i class="fa-solid fa-circle"></i>
            Average progress is
            ${averageProgress}%.

        </li>

        <li>
            <i class="fa-solid fa-circle"></i>
            ${studentsNeedSupport}
            student(s) need additional support.

        </li>

    `;

}

// remove instructor

deleteInstructorBtn.addEventListener ("click",function() {

        if (instructors.length === 0) {
            alert("There are no instructors to remove.");

            return;
        }

        const confirmDelete =confirm ("Are you sure you want to remove all instructors?");

        if (!confirmDelete) {
            return;

        }

        instructors = [];
        currentInstructor = null;
        localStorage.removeItem( "instructors");


        //  instructor display

        displayInstructorName.textContent = "No Instructor";
        displayInstructorCourse.textContent ="No Course Selected";
        instructorImage.textContent = "";

        instructorStudents.textContent = "0";

        instructorTotal.textContent ="0";

        instructorAttendance.textContent = "0%";

        instructorProgress.textContent = "0%";

        assignedCourses.textContent = "0";

        courseProgress.innerHTML = "";

        instructorInsights.innerHTML = "";


        alert("All instructors have been removed.");

    }
);

if (instructors.length > 0) {

    currentInstructor = instructors[instructors.length - 1];
    showInstructor( currentInstructor);

}




updateDashboard();

createTrendChart();