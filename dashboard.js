// =====================================
// DASHBOARD JAVASCRIPT
// =====================================


// Current date

function updateDate() {

    const today = new Date();

    const options = {
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    console.log(
        "Dashboard loaded:",
        today.toLocaleDateString("en-IN", options)
    );
}

updateDate();


// =====================================
// NOTIFICATION BUTTON
// =====================================

const notificationButton =
    document.querySelector(".notification-btn");

notificationButton.addEventListener("click", function () {

    alert("You have 3 recent activities.");

});


// =====================================
// SIDEBAR ACTIVE MENU
// =====================================

const menuLinks =
    document.querySelectorAll(".menu-link");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        const href = this.getAttribute("href");

        // Don't change active state for unavailable pages
        if (href === "#") {
            return;
        }

        menuLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// =====================================
// SIMPLE PROGRESS DATA
// =====================================

const dashboardData = {

    students: 120,

    overallProgress: 68,

    attendance: 86,

    assignments: 74

};


// =====================================
// CONSOLE SUMMARY
// =====================================

console.log("Dashboard Summary");
console.log("------------------");
console.log("Students:", dashboardData.students);
console.log("Overall Progress:", dashboardData.overallProgress + "%");
console.log("Attendance:", dashboardData.attendance + "%");
console.log("Assignments:", dashboardData.assignments + "%");


// =====================================
// MODULE STATUS
// =====================================

const moduleRows =
    document.querySelectorAll(".module-row");

moduleRows.forEach(function (row, index) {

    row.addEventListener("click", function () {

        const moduleNames = [
            "Progress Management",
            "Attendance",
            "Learning Progress",
            "Analytics",
            "Reports"
        ];

        console.log(
            moduleNames[index] + " module selected"
        );

    });

});
const viewLearningBtn =
    document.getElementById("viewLearningBtn");

viewLearningBtn.addEventListener("click", function () {

    alert(
        "Learning Progress module will be available here once Member 3 completes the module."
    );

});