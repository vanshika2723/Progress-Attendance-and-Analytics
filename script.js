document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       DOM ELEMENTS
    ========================================= */

    const studentTableBody =
        document.getElementById("studentTableBody");

    const studentSearch =
        document.getElementById("studentSearch");

    const departmentFilter =
        document.getElementById("departmentFilter");

    const reportType =
        document.getElementById("reportType");

    const searchBtn =
        document.getElementById("searchBtn");

    const studentModal =
        document.getElementById("studentModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalStudentName =
        document.getElementById("modalStudentName");

    const modalStudentId =
        document.getElementById("modalStudentId");

    const modalDepartment =
        document.getElementById("modalDepartment");

    const modalProgress =
        document.getElementById("modalProgress");

    const modalAttendance =
        document.getElementById("modalAttendance");

    const modalPrintBtn =
        document.getElementById("modalPrintBtn");

    const modalGenerateBtn =
        document.getElementById("modalGenerateBtn");


    /* =========================================
       FRONTEND SAMPLE DATA
       No Backend / No Database
    ========================================= */

    const students = [

        {
            name: "Aarav Sharma",
            email: "aarav@example.com",
            id: "STU001",
            department: "Computer Science",
            progress: 85,
            attendance: 92,
            status: "Good"
        },

        {
            name: "Priya Shah",
            email: "priya@example.com",
            id: "STU002",
            department: "Computer Science",
            progress: 78,
            attendance: 86,
            status: "Good"
        },

        {
            name: "Rahul Kumar",
            email: "rahul@example.com",
            id: "STU003",
            department: "Science",
            progress: 64,
            attendance: 72,
            status: "Needs Attention"
        },

        {
            name: "Neha Patel",
            email: "neha@example.com",
            id: "STU004",
            department: "Commerce",
            progress: 91,
            attendance: 95,
            status: "Excellent"
        },

        {
            name: "Vikram Mehta",
            email: "vikram@example.com",
            id: "STU005",
            department: "Computer Science",
            progress: 70,
            attendance: 79,
            status: "Average"
        }

    ];


    /* =========================================
       DASHBOARD STATISTICS
    ========================================= */

    function updateStatistics() {

        const totalStudents =
            students.length;


        const totalProgress =
            students.reduce(
                (total, student) =>
                    total + student.progress,
                0
            );


        const totalAttendance =
            students.reduce(
                (total, student) =>
                    total + student.attendance,
                0
            );


        const averageProgress =
            totalProgress / totalStudents;


        const averageAttendance =
            totalAttendance / totalStudents;


        const totalStudentsElement =
            document.getElementById(
                "totalStudents"
            );


        const averageProgressElement =
            document.getElementById(
                "averageProgress"
            );


        const averageAttendanceElement =
            document.getElementById(
                "averageAttendance"
            );


        if (totalStudentsElement) {

            totalStudentsElement.textContent =
                totalStudents;

        }


        if (averageProgressElement) {

            averageProgressElement.textContent =
                `${averageProgress.toFixed(1)}%`;

        }


        if (averageAttendanceElement) {

            averageAttendanceElement.textContent =
                `${averageAttendance.toFixed(1)}%`;

        }

    }


    /* =========================================
       DISPLAY STUDENTS
    ========================================= */

    function displayStudents(data) {

        if (!studentTableBody) {
            return;
        }


        studentTableBody.innerHTML = "";


        if (data.length === 0) {

            studentTableBody.innerHTML = `
                <tr>

                    <td
                        colspan="7"
                        style="
                            text-align:center;
                            padding:30px;
                        "
                    >
                        No student records found.
                    </td>

                </tr>
            `;

            return;
        }


        data.forEach(student => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <div class="student-cell">

                        <div class="student-avatar">
                            ${student.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>

                            <strong>
                                ${student.name}
                            </strong>

                            <small>
                                ${student.email}
                            </small>

                        </div>

                    </div>

                </td>


                <td>
                    ${student.id}
                </td>


                <td>
                    ${student.department}
                </td>


                <td>

                    <div class="progress-cell">

                        <span>
                            ${student.progress}%
                        </span>

                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="
                                    width:${student.progress}%;
                                "
                            ></div>

                        </div>

                    </div>

                </td>


                <td>
                    ${student.attendance}%
                </td>


                <td>

                    <span class="status-badge">
                        ${student.status}
                    </span>

                </td>


                <td>

                    <button
                        class="primary-btn view-btn"
                        data-id="${student.id}"
                    >
                        View
                    </button>

                </td>

            `;


            studentTableBody.appendChild(row);

        });


        /* View buttons */

        const viewButtons =
            document.querySelectorAll(
                ".view-btn"
            );


        viewButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const studentId =
                        button.dataset.id;

                    openStudentModal(
                        studentId
                    );

                }
            );

        });

    }


    /* =========================================
       OPEN STUDENT MODAL
    ========================================= */

    function openStudentModal(studentId) {

        const student =
            students.find(
                item =>
                    item.id === studentId
            );


        if (!student) {

            alert(
                "Student record not found."
            );

            return;
        }


        modalStudentName.textContent =
            student.name;


        modalStudentId.textContent =
            student.id;


        modalDepartment.textContent =
            student.department;


        modalProgress.textContent =
            `${student.progress}%`;


        modalAttendance.textContent =
            `${student.attendance}%`;


        studentModal.classList.add(
            "show"
        );


        studentModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeStudentModal() {

        studentModal.classList.remove(
            "show"
        );


        studentModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =========================================
       MODAL CLOSE BUTTON
    ========================================= */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeStudentModal
        );

    }


    /* =========================================
       CLICK OUTSIDE MODAL
    ========================================= */

    if (studentModal) {

        studentModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    studentModal
                ) {

                    closeStudentModal();

                }

            }
        );

    }


    /* =========================================
       SEARCH + FILTER
    ========================================= */

    function filterStudents() {

        const searchValue =
            studentSearch.value
                .toLowerCase()
                .trim();


        const departmentValue =
            departmentFilter.value;


        const reportTypeValue =
            reportType.value;


        const filteredStudents =
            students.filter(student => {

                /* Search */

                const matchesSearch =
                    student.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    student.id
                        .toLowerCase()
                        .includes(searchValue);


                /* Department */

                const studentDepartment =
                    student.department
                        .toLowerCase()
                        .replaceAll(
                            " ",
                            "-"
                        );


                const matchesDepartment =
                    departmentValue === "all"

                    ||

                    studentDepartment ===
                    departmentValue;


                /*
                    Report type is used to
                    select the relevant report
                    view without backend.
                */

                let matchesReport =
                    true;


                if (
                    reportTypeValue ===
                    "progress"
                ) {

                    matchesReport =
                        student.progress >= 0;

                }


                if (
                    reportTypeValue ===
                    "attendance"
                ) {

                    matchesReport =
                        student.attendance >= 0;

                }


                if (
                    reportTypeValue ===
                    "performance"
                ) {

                    matchesReport =
                        (
                            student.progress +
                            student.attendance
                        ) / 2 >= 0;

                }


                return (
                    matchesSearch &&
                    matchesDepartment &&
                    matchesReport
                );

            });


        displayStudents(
            filteredStudents
        );

    }


    /* =========================================
       SEARCH BUTTON
    ========================================= */

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            filterStudents
        );

    }


    /* =========================================
       LIVE SEARCH
    ========================================= */

    if (studentSearch) {

        studentSearch.addEventListener(
            "input",
            filterStudents
        );

    }


    /* =========================================
       DEPARTMENT FILTER
    ========================================= */

    if (departmentFilter) {

        departmentFilter.addEventListener(
            "change",
            filterStudents
        );

    }


    /* =========================================
       REPORT TYPE FILTER
    ========================================= */

    if (reportType) {

        reportType.addEventListener(
            "change",
            filterStudents
        );

    }


    /* =========================================
       PRINT REPORT
    ========================================= */

    if (modalPrintBtn) {

        modalPrintBtn.addEventListener(
            "click",
            () => {

                window.print();

            }
        );

    }


    /* =========================================
       GENERATE REPORT
    ========================================= */

    if (modalGenerateBtn) {

        modalGenerateBtn.addEventListener(
            "click",
            () => {

                const studentName =
                    modalStudentName.textContent;

                const studentId =
                    modalStudentId.textContent;

                const department =
                    modalDepartment.textContent;

                const progress =
                    modalProgress.textContent;

                const attendance =
                    modalAttendance.textContent;


                const reportWindow =
                    window.open(
                        "",
                        "_blank"
                    );


                if (!reportWindow) {

                    alert(
                        "Please allow pop-ups to generate the report."
                    );

                    return;
                }


                reportWindow.document.write(`

                    <!DOCTYPE html>

                    <html>

                    <head>

                        <title>
                            Student Report - ${studentName}
                        </title>


                        <style>

                            body {

                                font-family:
                                    Arial,
                                    sans-serif;

                                padding: 40px;

                                color: #1e293b;

                                background: #f8fafc;

                            }


                            .report {

                                max-width: 700px;

                                margin: auto;

                                background: white;

                                padding: 35px;

                                border-radius: 15px;

                                box-shadow:
                                    0 10px 30px
                                    rgba(
                                        0,
                                        0,
                                        0,
                                        0.08
                                    );

                            }


                            h1 {

                                color: #2563eb;

                                margin-bottom: 5px;

                            }


                            .subtitle {

                                color: #64748b;

                                margin-bottom: 30px;

                            }


                            .student {

                                background: #eff6ff;

                                padding: 20px;

                                border-radius: 10px;

                                margin-bottom: 25px;

                            }


                            .row {

                                display: flex;

                                justify-content:
                                    space-between;

                                padding: 13px 0;

                                border-bottom:
                                    1px solid #e5e7eb;

                            }


                            .row:last-child {

                                border-bottom: none;

                            }


                            .label {

                                color: #64748b;

                            }


                            .value {

                                font-weight: bold;

                            }


                            .footer {

                                margin-top: 30px;

                                padding-top: 20px;

                                border-top:
                                    1px solid #e5e7eb;

                                color: #64748b;

                                font-size: 13px;

                            }


                            .print-btn {

                                margin-top: 25px;

                                padding: 12px 20px;

                                background: #2563eb;

                                color: white;

                                border: none;

                                border-radius: 8px;

                                cursor: pointer;

                            }


                            @media print {

                                body {

                                    background: white;

                                    padding: 0;

                                }


                                .report {

                                    box-shadow: none;

                                }


                                .print-btn {

                                    display: none;

                                }

                            }

                        </style>

                    </head>


                    <body>

                        <div class="report">

                            <h1>
                                Student Performance Report
                            </h1>

                            <p class="subtitle">
                                LMS Progress & Attendance Module
                            </p>


                            <div class="student">

                                <div class="row">

                                    <span class="label">
                                        Student Name
                                    </span>

                                    <span class="value">
                                        ${studentName}
                                    </span>

                                </div>


                                <div class="row">

                                    <span class="label">
                                        Student ID
                                    </span>

                                    <span class="value">
                                        ${studentId}
                                    </span>

                                </div>


                                <div class="row">

                                    <span class="label">
                                        Department
                                    </span>

                                    <span class="value">
                                        ${department}
                                    </span>

                                </div>


                                <div class="row">

                                    <span class="label">
                                        Learning Progress
                                    </span>

                                    <span class="value">
                                        ${progress}
                                    </span>

                                </div>


                                <div class="row">

                                    <span class="label">
                                        Attendance
                                    </span>

                                    <span class="value">
                                        ${attendance}
                                    </span>

                                </div>

                            </div>


                            <div class="footer">

                                Generated from the
                                EduTrack LMS Reports Module.

                                <br><br>

                                Frontend Project -
                                Team 4

                            </div>


                            <button
                                class="print-btn"
                                onclick="window.print()"
                            >
                                Print / Save as PDF
                            </button>

                        </div>

                    </body>

                    </html>

                `);


                reportWindow.document.close();

            }

        );

    }


    /* =========================================
   GENERATED REPORTS - VIEW BUTTONS
========================================= */

const generatedReportButtons =
    document.querySelectorAll(
        ".generated-item .secondary-btn"
    );


generatedReportButtons.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            () => {

                const reportWindow =
                    window.open(
                        "",
                        "_blank"
                    );


                if (!reportWindow) {

                    alert(
                        "Please allow pop-ups to view the report."
                    );

                    return;
                }


                let reportTitle =
                    "Student Progress Report";

                let reportDescription =
                    "Student learning progress summary.";


                if (index === 1) {

                    reportTitle =
                        "Attendance Summary";

                    reportDescription =
                        "Monthly student attendance summary.";

                }


                reportWindow.document.write(`

                    <!DOCTYPE html>

                    <html>

                    <head>

                        <title>
                            ${reportTitle}
                        </title>


                        <style>

                            * {
                                box-sizing: border-box;
                            }


                            body {

                                margin: 0;

                                padding: 40px;

                                font-family:
                                    Arial,
                                    sans-serif;

                                background: #f5f7fb;

                                color: #1e293b;

                            }


                            .report {

                                max-width: 800px;

                                margin: auto;

                                background: white;

                                padding: 40px;

                                border-radius: 16px;

                                box-shadow:
                                    0 10px 30px
                                    rgba(
                                        15,
                                        23,
                                        42,
                                        0.08
                                    );

                            }


                            h1 {

                                color: #2563eb;

                                margin-bottom: 8px;

                            }


                            .description {

                                color: #64748b;

                                margin-bottom: 30px;

                            }


                            .info {

                                border: 1px solid #e5e7eb;

                                border-radius: 12px;

                                overflow: hidden;

                            }


                            .row {

                                display: flex;

                                justify-content:
                                    space-between;

                                padding: 16px 20px;

                                border-bottom:
                                    1px solid #e5e7eb;

                            }


                            .row:last-child {

                                border-bottom: none;

                            }


                            .label {

                                color: #64748b;

                            }


                            .value {

                                font-weight: bold;

                            }


                            .footer {

                                margin-top: 30px;

                                padding-top: 20px;

                                border-top:
                                    1px solid #e5e7eb;

                                color: #64748b;

                                font-size: 13px;

                            }


                            button {

                                margin-top: 25px;

                                padding: 12px 20px;

                                border: none;

                                border-radius: 8px;

                                background: #2563eb;

                                color: white;

                                cursor: pointer;

                            }


                            @media print {

                                body {

                                    background: white;

                                    padding: 0;

                                }


                                .report {

                                    box-shadow: none;

                                }


                                button {

                                    display: none;

                                }

                            }

                        </style>

                    </head>


                    <body>

                        <div class="report">

                            <h1>
                                ${reportTitle}
                            </h1>


                            <p class="description">
                                ${reportDescription}
                            </p>


                            <div class="info">

                                <div class="row">

                                    <span class="label">
                                        Module
                                    </span>

                                    <span class="value">
                                        LMS Reports
                                    </span>

                                </div>


                                <div class="row">

                                    <span class="label">
                                        Team
                                    </span>

                                    <span class="value">
                                        Team 4
                                    </span>

                                </div>


                                <div class="row">

                                    <span class="label">
                                        Data Source
                                    </span>

                                    <span class="value">
                                        Sample Data
                                    </span>

                                </div>


                                <div class="row">

                                    <span class="label">
                                        Report Status
                                    </span>

                                    <span class="value">
                                        Generated
                                    </span>

                                </div>

                            </div>


                            <div class="footer">

                                Frontend Project -
                                Progress & Attendance Reports

                            </div>


                            <button
                                onclick="window.print()"
                            >
                                Print / Save as PDF
                            </button>

                        </div>

                    </body>

                    </html>

                `);


                reportWindow.document.close();

            }
        );

    }
);


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeStudentModal();

            }

        }
    );


    /* =========================================
   SIDEBAR ACTIVE NAVIGATION
========================================= */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            /* Remove active from all */

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            /* Add active to clicked link */

            link.classList.add(
                "active"
            );

        }
    );

});


    /* =========================================
       INITIAL LOAD
    ========================================= */

    updateStatistics();

    displayStudents(
        students
    );

});