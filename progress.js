/* =========================
   STUDENT PROGRESS DATA
========================= */

const students = [
    {
        name: "Priya Sharma",
        id: "STU001",
        course: "Web Development",
        progress: 96,
        completed: "24 / 25",
        status: "Completed"
    },
    {
        name: "Rohan Verma",
        id: "STU002",
        course: "React.js",
        progress: 82,
        completed: "18 / 22",
        status: "In Progress"
    },
    {
        name: "Neha Singh",
        id: "STU003",
        course: "Node.js & Express",
        progress: 74,
        completed: "15 / 20",
        status: "In Progress"
    },
    {
        name: "Aarav Patel",
        id: "STU004",
        course: "MongoDB",
        progress: 63,
        completed: "12 / 19",
        status: "In Progress"
    },
    {
        name: "Simran Gupta",
        id: "STU005",
        course: "Web Development",
        progress: 18,
        completed: "4 / 22",
        status: "Not Started"
    }
];


/* =========================
   EXTRA STUDENTS
========================= */

const names = [
    "Aditi Mehta",
    "Rahul Kumar",
    "Ananya Sharma",
    "Karan Singh",
    "Pooja Verma",
    "Mohit Gupta",
    "Kavya Patel",
    "Arjun Sharma",
    "Ishita Jain",
    "Vivek Yadav",
    "Sneha Kapoor",
    "Aditya Verma",
    "Nisha Sharma",
    "Riya Singh",
    "Manish Kumar",
    "Tanya Gupta",
    "Yash Patel",
    "Muskan Verma",
    "Sahil Sharma",
    "Anjali Mehta"
];

const courses = [
    "Web Development",
    "React.js",
    "Node.js & Express",
    "MongoDB"
];

const statusList = [
    "Completed",
    "In Progress",
    "Not Started"
];


/* Generate remaining students */

for (let i = students.length; i < 125; i++) {

    const name =
        names[i % names.length];

    const course =
        courses[i % courses.length];

    let progress;

    if (i % 7 === 0) {
        progress = 95 - (i % 5);
    } else if (i % 4 === 0) {
        progress = 70 + (i % 20);
    } else if (i % 3 === 0) {
        progress = 40 + (i % 30);
    } else {
        progress = 10 + (i % 45);
    }


    let status;

    if (progress >= 90) {
        status = "Completed";
    } else if (progress <= 20) {
        status = "Not Started";
    } else {
        status = "In Progress";
    }


    const totalLessons =
        18 + (i % 10);

    const completedLessons =
        Math.max(
            1,
            Math.round(
                totalLessons * progress / 100
            )
        );


    students.push({

        name:
            name + " " + (i + 1),

        id:
            "STU" +
            String(i + 1).padStart(3, "0"),

        course,

        progress,

        completed:
            completedLessons +
            " / " +
            totalLessons,

        status

    });

}


/* =========================
   PAGINATION
========================= */

let currentPage = 1;

const studentsPerPage = 5;


/* =========================
   GET FILTERED STUDENTS
========================= */

function getFilteredStudents() {

    const search =
        document
            .getElementById("studentSearch")
            .value
            .toLowerCase()
            .trim();

    const course =
        document
            .getElementById("courseFilter")
            .value;

    const status =
        document
            .getElementById("statusFilter")
            .value;


    return students.filter(student => {

        const matchesSearch =
            student.name
                .toLowerCase()
                .includes(search) ||

            student.id
                .toLowerCase()
                .includes(search);


        const matchesCourse =
            course === "all" ||
            student.course === course;


        const matchesStatus =
            status === "all" ||
            student.status === status;


        return (
            matchesSearch &&
            matchesCourse &&
            matchesStatus
        );

    });

}


/* =========================
   INITIAL TABLE SETUP
========================= */

function setupTable() {

    const tbody =
        document.getElementById(
            "studentTableBody"
        );

    tbody.innerHTML = "";

}


/* =========================
   GET INITIALS
========================= */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


/* =========================
   AVATAR CLASS
========================= */

function getAvatarClass(index) {

    const classes = [
        "purple",
        "blue",
        "green",
        "orange",
        "pink"
    ];

    return classes[
        index % classes.length
    ];

}


/* =========================
   CREATE STUDENT ROW
========================= */

function createStudentRow(
    student,
    index
) {

    const row =
        document.createElement("tr");


    row.dataset.student =
        student.name;

    row.dataset.id =
        student.id;

    row.dataset.course =
        student.course;

    row.dataset.status =
        student.status;

    row.dataset.progress =
        student.progress;


    let statusClass = "";

    if (student.status === "Completed") {

        statusClass = "completed";

    } else if (
        student.status === "In Progress"
    ) {

        statusClass = "in-progress";

    } else {

        statusClass = "not-started";

    }


    row.innerHTML = `

        <td>

            <div class="student-cell">

                <div class="student-avatar ${getAvatarClass(index)}">
                    ${getInitials(student.name)}
                </div>

                <div>

                    <strong>
                        ${student.name}
                    </strong>

                    <span>
                        ID: ${student.id}
                    </span>

                </div>

            </div>

        </td>


        <td>
            ${student.course}
        </td>


        <td>

            <div class="progress-cell">

                <div class="progress-top">
                    <strong>
                        ${student.progress}%
                    </strong>
                </div>

                <div class="progress-bar">

                    <span
                        style="width: ${student.progress}%"
                    ></span>

                </div>

            </div>

        </td>


        <td>
            ${student.completed}
        </td>


        <td>

            <span class="status ${statusClass}">
                ${student.status}
            </span>

        </td>


        <td>

            <button
                class="view-btn"
                onclick="viewStudent(
                    '${student.name}',
                    '${student.id}',
                    '${student.course}',
                    '${student.progress}',
                    '${student.completed}',
                    '${student.status}'
                )"
            >
                View
            </button>

        </td>

    `;


    return row;

}


/* =========================
   RENDER TABLE
========================= */

function renderTable() {

    const filteredStudents =
        getFilteredStudents();


    const tbody =
        document.getElementById(
            "studentTableBody"
        );


    tbody.innerHTML = "";


    const totalPages =
        Math.ceil(
            filteredStudents.length /
            studentsPerPage
        );


    if (
        currentPage > totalPages &&
        totalPages > 0
    ) {

        currentPage = totalPages;

    }


    const start =
        (currentPage - 1) *
        studentsPerPage;


    const end =
        start + studentsPerPage;


    const currentStudents =
        filteredStudents.slice(
            start,
            end
        );


    currentStudents.forEach(
        (student, index) => {

            tbody.appendChild(
                createStudentRow(
                    student,
                    start + index
                )
            );

        }
    );


    /* Visible count */

    document.getElementById(
        "visibleCount"
    ).textContent =
        currentStudents.length;


    /* No result */

    const noResult =
        document.getElementById(
            "noResult"
        );


    if (
        filteredStudents.length === 0
    ) {

        noResult.style.display =
            "block";

    } else {

        noResult.style.display =
            "none";

    }


    updatePagination(
        totalPages
    );

}


/* =========================
   PAGINATION
========================= */

function updatePagination(totalPages) {

    const pagination =
        document.querySelector(
            ".pagination"
        );


    pagination.innerHTML = "";


    if (totalPages <= 1) {
        return;
    }


    /* Previous */

    const previous =
        document.createElement("button");

    previous.innerHTML = "‹";

    previous.disabled =
        currentPage === 1;

    previous.onclick = function () {

        if (currentPage > 1) {

            currentPage--;

            renderTable();

        }

    };

    pagination.appendChild(previous);


    /* Page numbers */

    let pages = [];


    if (totalPages <= 6) {

        for (
            let i = 1;
            i <= totalPages;
            i++
        ) {

            pages.push(i);

        }

    } else {

        pages.push(1);


        if (currentPage > 3) {

            pages.push("...");

        }


        let startPage =
            Math.max(
                2,
                currentPage - 1
            );

        let endPage =
            Math.min(
                totalPages - 1,
                currentPage + 1
            );


        for (
            let i = startPage;
            i <= endPage;
            i++
        ) {

            pages.push(i);

        }


        if (
            currentPage <
            totalPages - 2
        ) {

            pages.push("...");

        }


        pages.push(totalPages);

    }


    pages.forEach(page => {

        if (page === "...") {

            const dots =
                document.createElement("span");

            dots.textContent = "...";

            pagination.appendChild(dots);

            return;

        }


        const button =
            document.createElement("button");

        button.textContent = page;


        if (
            page === currentPage
        ) {

            button.classList.add(
                "active"
            );

        }


        button.onclick = function () {

            currentPage = page;

            renderTable();

        };


        pagination.appendChild(button);

    });


    /* Next */

    const next =
        document.createElement("button");

    next.innerHTML = "›";

    next.disabled =
        currentPage === totalPages;

    next.onclick = function () {

        if (
            currentPage <
            totalPages
        ) {

            currentPage++;

            renderTable();

        }

    };

    pagination.appendChild(next);

}


/* =========================
   FILTER STUDENTS
========================= */

function filterStudents() {

    currentPage = 1;

    renderTable();

}


/* =========================
   RESET FILTERS
========================= */

function resetFilters() {

    document.getElementById(
        "studentSearch"
    ).value = "";

    document.getElementById(
        "courseFilter"
    ).value = "all";

    document.getElementById(
        "statusFilter"
    ).value = "all";


    currentPage = 1;

    renderTable();

}


/* =========================
   ADD PROGRESS MODAL
========================= */

function openAddProgressModal() {

    document
        .getElementById(
            "addProgressModal"
        )
        .classList.add("show");

}


function closeAddProgressModal() {

    document
        .getElementById(
            "addProgressModal"
        )
        .classList.remove("show");

}


/* =========================
   ADD PROGRESS
========================= */

function addProgress(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("addStudent")
            .value
            .trim();

    const id =
        document
            .getElementById("addStudentId")
            .value
            .trim();

    const course =
        document
            .getElementById("addCourse")
            .value;

    const progress =
       document
    .getElementById("progressInput")
    .value;

    const status =
        document
            .getElementById("addStatus")
            .value;


    if (
        !name ||
        !id ||
        !course
    ) {

        alert(
            "Please fill all required fields."
        );

        return;

    }


    if (
        progress < 0 ||
        progress > 100
    ) {

        alert(
            "Progress must be between 0 and 100."
        );

        return;

    }


    students.push({

        name,

        id,

        course,

        progress,

        completed:
            progress === 100
                ? "25 / 25"
                : "Updated",

        status

    });


    alert(
        "Student progress added successfully!"
    );


    document
        .querySelector(
            "#addProgressModal form"
        )
        .reset();


    closeAddProgressModal();


    currentPage =
        Math.ceil(
            students.length /
            studentsPerPage
        );


    renderTable();

}


/* =========================
   VIEW STUDENT
========================= */

function viewStudent(
    name,
    id,
    course,
    progress,
    completed,
    status
) {

    document.getElementById(
        "modalAvatar"
    ).textContent =
        getInitials(name);


    document.getElementById(
        "modalStudentName"
    ).textContent =
        name;


    document.getElementById(
        "modalStudentId"
    ).textContent =
        "ID: " + id;


    document.getElementById(
        "modalCourse"
    ).textContent =
        course;


    document.getElementById(
        "modalStatus"
    ).textContent =
        status;


    document.getElementById(
        "modalCompleted"
    ).textContent =
        completed;


    document.getElementById(
        "modalProgress"
    ).textContent =
        progress + "%";


    document.getElementById(
        "modalProgressText"
    ).textContent =
        progress + "%";


    document.getElementById(
        "modalProgressBar"
    ).style.width =
        progress + "%";


    document
        .getElementById(
            "studentModal"
        )
        .classList.add("show");

}


function closeStudentModal() {

    document
        .getElementById(
            "studentModal"
        )
        .classList.remove("show");

}


/* =========================
   EXPORT REPORT
========================= */

function exportReport() {

    let csv = [];


    csv.push(
        [
            "Student",
            "Student ID",
            "Course",
            "Progress",
            "Completed",
            "Status"
        ].join(",")
    );


    students.forEach(student => {

        csv.push(

            [
                `"${student.name}"`,
                `"${student.id}"`,
                `"${student.course}"`,
                `"${student.progress}%"`,
                `"${student.completed}"`,
                `"${student.status}"`
            ].join(",")

        );

    });


    const blob =
        new Blob(
            [csv.join("\n")],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "student-progress-report.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


/* =========================
   CLOSE MODALS
========================= */

window.addEventListener(
    "click",
    function(event) {

        const addModal =
            document.getElementById(
                "addProgressModal"
            );

        const studentModal =
            document.getElementById(
                "studentModal"
            );


        if (
            event.target === addModal
        ) {

            closeAddProgressModal();

        }


        if (
            event.target === studentModal
        ) {

            closeStudentModal();

        }

    }
);


/* =========================
   ESC KEY
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeAddProgressModal();

            closeStudentModal();

        }

    }
);


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupTable();

        renderTable();

    }
);