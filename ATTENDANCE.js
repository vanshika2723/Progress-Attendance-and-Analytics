let students = [
    {
        id: 1,
        name: "Aarav Sharma",
        roll: "CS-101",
        course: "B.Tech CSE",
        email: "aarav@gmail.com",
        phone: "9876543210",
        attendance: 92,
        today: "present"
    },
    {
        id: 2,
        name: "Priya Singh",
        roll: "CS-102",
        course: "B.Tech CSE",
        email: "priya@gmail.com",
        phone: "9876543211",
        attendance: 88,
        today: "present"
    },
    {
        id: 3,
        name: "Rahul Kumar",
        roll: "AI-103",
        course: "B.Tech AIML",
        email: "rahul@gmail.com",
        phone: "9876543212",
        attendance: 74,
        today: "absent"
    },
    {
        id: 4,
        name: "Ananya Verma",
        roll: "CS-104",
        course: "B.Tech CSE",
        email: "ananya@gmail.com",
        phone: "9876543213",
        attendance: 96,
        today: "pending"
    }
];


const table = document.getElementById("studentTable");
const emptyState = document.getElementById("emptyState");


/* DATE */

document.getElementById("currentDate").innerText =
    new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });


/* RENDER STUDENTS */

function renderStudents() {

    const search =
        document.getElementById("search").value.toLowerCase();

    const course =
        document.getElementById("courseFilter").value;

    const status =
        document.getElementById("statusFilter").value;


    const filtered = students.filter(student => {

        const matchSearch =
            student.name.toLowerCase().includes(search) ||
            student.roll.toLowerCase().includes(search);

        const matchCourse =
            course === "all" ||
            student.course === course;

        const matchStatus =
            status === "all" ||
            student.today === status;

        return matchSearch && matchCourse && matchStatus;

    });


    table.innerHTML = "";


    if (filtered.length === 0) {

        emptyState.classList.add("show");

    } else {

        emptyState.classList.remove("show");

        filtered.forEach(student => {

            const initials = student.name
                .split(" ")
                .map(word => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();


            let statusHTML = "";


            if (student.today === "pending") {

                statusHTML = `
                    <div class="status-buttons">

                        <button
                            class="status-btn present"
                            onclick="setAttendance(${student.id}, 'present')">
                            <i class="fa-solid fa-check"></i>
                            Present
                        </button>

                        <button
                            class="status-btn absent"
                            onclick="setAttendance(${student.id}, 'absent')">
                            <i class="fa-solid fa-xmark"></i>
                            Absent
                        </button>

                    </div>
                `;

            } else if (student.today === "present") {

                statusHTML = `
                    <div class="status-buttons">

                        <button
                            class="status-btn present active"
                            onclick="setAttendance(${student.id}, 'present')">
                            <i class="fa-solid fa-check"></i>
                            Present
                        </button>

                        <button
                            class="status-btn absent"
                            onclick="setAttendance(${student.id}, 'absent')">
                            Absent
                        </button>

                    </div>
                `;

            } else {

                statusHTML = `
                    <div class="status-buttons">

                        <button
                            class="status-btn present"
                            onclick="setAttendance(${student.id}, 'present')">
                            Present
                        </button>

                        <button
                            class="status-btn absent active"
                            onclick="setAttendance(${student.id}, 'absent')">
                            <i class="fa-solid fa-xmark"></i>
                            Absent
                        </button>

                    </div>
                `;
            }


            table.innerHTML += `

                <tr>

                    <td>

                        <div class="student">

                            <div class="student-avatar">
                                ${initials}
                            </div>

                            <div>
                                <strong>${student.name}</strong>
                                <span>${student.email}</span>
                            </div>

                        </div>

                    </td>


                    <td>
                        ${student.roll}
                    </td>


                    <td>
                        <span class="course">
                            ${student.course}
                        </span>
                    </td>


                    <td>

                        <div class="attendance-number">
                            <span>${student.attendance}%</span>
                        </div>

                        <div class="progress">
                            <span style="width:${student.attendance}%"></span>
                        </div>

                    </td>


                    <td>
                        ${statusHTML}
                    </td>


                    <td>

                        <button
                            class="delete-btn"
                            onclick="deleteStudent(${student.id})"
                            title="Delete student">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                </tr>
            `;
        });
    }


    updateSummary();
}


/* SUMMARY */

function updateSummary() {

    const total = students.length;

    const present =
        students.filter(s => s.today === "present").length;

    const absent =
        students.filter(s => s.today === "absent").length;


    const rate =
        total === 0
            ? 0
            : Math.round((present / total) * 100);


    document.getElementById("totalStudents").innerText = total;

    document.getElementById("presentStudents").innerText = present;

    document.getElementById("absentStudents").innerText = absent;

    document.getElementById("attendanceRate").innerText =
        rate + "%";


    document.getElementById("presentPercent").innerText =
        total ? Math.round((present / total) * 100) + "% of students" : "0% of students";

    document.getElementById("absentPercent").innerText =
        total ? Math.round((absent / total) * 100) + "% of students" : "0% of students";
}


/* ADD STUDENT MODAL */

const studentModal =
    document.getElementById("studentModal");


function openStudentModal() {

    studentModal.classList.add("show");

    document.getElementById("studentName").focus();
}


function closeStudentModal() {

    studentModal.classList.remove("show");

}


document.getElementById("openAddStudent")
    .addEventListener("click", openStudentModal);


document.getElementById("quickAdd")
    .addEventListener("click", openStudentModal);


document.getElementById("emptyAdd")
    .addEventListener("click", openStudentModal);


document.getElementById("closeModal")
    .addEventListener("click", closeStudentModal);


document.getElementById("cancelBtn")
    .addEventListener("click", closeStudentModal);


/* ADD STUDENT */

document.getElementById("studentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("studentName").value.trim();

        const roll =
            document.getElementById("rollNumber").value.trim();

        const course =
            document.getElementById("course").value;

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();


        const newStudent = {

            id: Date.now(),

            name: name,

            roll: roll,

            course: course,

            email: email,

            phone: phone,

            attendance: 0,

            today: "pending"
        };


        students.push(newStudent);


        renderStudents();

        this.reset();

        closeStudentModal();

        showToast(
            `${name} added successfully!`
        );

    });


/* ATTENDANCE */

function setAttendance(id, status) {

    const student =
        students.find(student => student.id === id);

    if (!student) return;


    student.today = status;


    if (status === "present") {

        student.attendance =
            Math.min(100, student.attendance + 1);

        showToast(
            `${student.name} marked Present`
        );

    } else {

        showToast(
            `${student.name} marked Absent`
        );
    }


    renderStudents();
}


/* DELETE */

function deleteStudent(id) {

    const student =
        students.find(student => student.id === id);

    if (!student) return;


    const confirmDelete =
        confirm(
            `Remove ${student.name} from the student list?`
        );


    if (!confirmDelete) return;


    students =
        students.filter(student => student.id !== id);


    renderStudents();

    showToast("Student removed successfully");

}


/* SEARCH */

document.getElementById("search")
    .addEventListener("input", renderStudents);

document.getElementById("courseFilter")
    .addEventListener("change", renderStudents);

document.getElementById("statusFilter")
    .addEventListener("change", renderStudents);


/* MARK ALL PRESENT */

document.getElementById("markAllPresent")
    .addEventListener("click", function() {

        if (students.length === 0) {

            showToast("No students available");

            return;
        }


        students.forEach(student => {

            student.today = "present";

        });


        renderStudents();

        showToast(
            "All students marked Present"
        );

    });


/* HISTORY */

const historyModal =
    document.getElementById("historyModal");


document.getElementById("viewHistory")
    .addEventListener("click", function() {

        historyModal.classList.add("show");

    });


document.getElementById("closeHistory")
    .addEventListener("click", function() {

        historyModal.classList.remove("show");

    });


/* EXPORT */

document.getElementById("exportBtn")
    .addEventListener("click", function() {

        let csv =
            "Student Name,Roll Number,Course,Attendance,Today's Status\n";


        students.forEach(student => {

            csv +=
                `"${student.name}",` +
                `"${student.roll}",` +
                `"${student.course}",` +
                `"${student.attendance}%",` +
                `"${student.today}"\n`;

        });


        const blob =
            new Blob([csv], {
                type: "text/csv"
            });


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "LMMS_Attendance_Report.csv";

        link.click();


        URL.revokeObjectURL(url);


        showToast(
            "Attendance report exported"
        );

    });


/* TOAST */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.querySelector("span")
        .innerText = message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* START */

renderStudents();