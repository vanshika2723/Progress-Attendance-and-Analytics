const KEY = "learningProgress";
const PAGES = ["dashboard", "courses", "assignments", "quizzes", "resources"];
let state = JSON.parse(localStorage.getItem(KEY) || "null") || { courses: [], assignments: [], quizzes: [], resources: [] };

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const id = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const save = () => localStorage.setItem(KEY, JSON.stringify(state));
const bar = p => `<div class="bar"><span style="width:${p}%"></span></div>`;
const empty = t => `<p class="empty card">${t}</p>`;
const del = (type, i) => `<button class="btn del" data-act="del" data-type="${type}" data-id="${i}">Delete</button>`;

const courseStats = c => {
  const done = c.lessons.filter(l => l.done).length;
  return { done, total: c.lessons.length, p: pct(done, c.lessons.length) };
};
const courseName = i => (state.courses.find(c => c.id === i) || {}).title || "(deleted)";
const courseSelect = () => "Course number:\n" + state.courses.map((c, i) => `${i + 1}. ${c.title}`).join("\n");
const pickCourse = () => {
  if (!state.courses.length) return alert("Add a course first."), null;
  const c = state.courses[+prompt(courseSelect(), "1") - 1];
  return c ? c.id : null;
};

const views = {
  dashboard() {
    const all = state.courses.flatMap(c => c.lessons);
    const done = all.filter(l => l.done).length;
    return `<h1>Dashboard</h1>
      <div class="stats">
        <div class="card"><b>${pct(done, all.length)}%</b>Overall progress</div>
        <div class="card"><b>${state.courses.length}</b>Courses</div>
        <div class="card"><b>${done}/${all.length}</b>Lessons done</div>
        <div class="card"><b>${state.assignments.filter(a => !a.done).length}</b>Pending assignments</div>
        <div class="card"><b>${state.quizzes.length}</b>Quizzes</div>
      </div>
      ${state.courses.length ? state.courses.map(c => { const s = courseStats(c); return `<div class="card"><b>${esc(c.title)}</b> <span class="muted">${s.done}/${s.total} lessons</span>${bar(s.p)}</div>`; }).join("") : empty("No courses yet. Go to Courses to add one.")}`;
  },
  courses() {
    return `<h1>Courses</h1><button class="btn primary" data-act="addCourse">Add Course</button>` +
      (state.courses.map(c => {
        const s = courseStats(c);
        return `<div class="card"><h3>${esc(c.title)} <span class="muted">${s.p}%</span></h3>${bar(s.p)}
          <ul>${c.lessons.map(l => `<li><label><input type="checkbox" data-act="lesson" data-id="${c.id}" data-lesson="${l.id}" ${l.done ? "checked" : ""}> <span class="${l.done ? "done" : ""}">${esc(l.title)}</span></label></li>`).join("") || '<li class="muted">No lessons yet.</li>'}</ul>
          <button class="btn" data-act="addLesson" data-id="${c.id}">Add Lesson</button> ${del("courses", c.id)}</div>`;
      }).join("") || empty("No courses yet."));
  },
  assignments() {
    return `<h1>Assignments</h1><button class="btn primary" data-act="addAssignment">Add Assignment</button>` +
      (state.assignments.map(a => `<div class="card row"><label><input type="checkbox" data-act="toggle" data-type="assignments" data-id="${a.id}" ${a.done ? "checked" : ""}> <span class="${a.done ? "done" : ""}">${esc(a.title)}</span></label>
        <span class="muted">${esc(courseName(a.course))} · due ${esc(a.due || "—")}</span>${del("assignments", a.id)}</div>`).join("") || empty("No assignments yet."));
  },
  quizzes() {
    return `<h1>Quizzes</h1><button class="btn primary" data-act="addQuiz">Add Quiz</button>` +
      (state.quizzes.map(q => `<div class="card row"><b>${esc(q.title)}</b><span class="muted">${esc(courseName(q.course))}</span>
        <span>${q.score}/${q.total} (${pct(q.score, q.total)}%)</span>${del("quizzes", q.id)}</div>`).join("") || empty("No quizzes yet."));
  },
  resources() {
    return `<h1>Resources</h1><button class="btn primary" data-act="addResource">Add Resource</button>` +
      (state.resources.map(r => `<div class="card row"><label><input type="checkbox" data-act="toggle" data-type="resources" data-id="${r.id}" ${r.done ? "checked" : ""}> <span class="${r.done ? "done" : ""}">${esc(r.title)}</span></label>
        <span class="muted">${esc(courseName(r.course))}</span>${del("resources", r.id)}</div>`).join("") || empty("No resources yet."));
  }
};

const paint = () => {
  const page = PAGES.includes(location.hash.slice(1)) ? location.hash.slice(1) : "dashboard";
  $("#nav").innerHTML = PAGES.map(p => `<a href="#${p}"${p === page ? ' class="active"' : ""}>${p[0].toUpperCase() + p.slice(1)}</a>`).join("");
  $("#main").innerHTML = views[page]();
};
const ask = (label, def) => (prompt(label, def || "") || "").trim();
const commit = () => { save(); paint(); };

const actions = {
  addCourse() {
    const title = ask("Course title:");
    if (title) state.courses.push({ id: id(), title, lessons: [] }), commit();
  },
  addLesson(t) {
    const title = ask("Lesson title:");
    if (title) state.courses.find(c => c.id === t.dataset.id).lessons.push({ id: id(), title, done: false }), commit();
  },
  lesson(t) {
    const l = state.courses.find(c => c.id === t.dataset.id).lessons.find(x => x.id === t.dataset.lesson);
    l.done = t.checked; commit();
  },
  addAssignment() {
    const course = pickCourse(); if (!course) return;
    const title = ask("Assignment title:");
    if (title) state.assignments.push({ id: id(), title, course, due: ask("Due date (optional):"), done: false }), commit();
  },
  addQuiz() {
    const course = pickCourse(); if (!course) return;
    const title = ask("Quiz title:"), total = +ask("Total questions:"), score = +ask("Your score:");
    if (title && total > 0 && score >= 0 && score <= total) state.quizzes.push({ id: id(), title, course, total, score }), commit();
    else if (title) alert("Enter a valid score and question count.");
  },
  addResource() {
    const course = pickCourse(); if (!course) return;
    const title = ask("Resource title:");
    if (title) state.resources.push({ id: id(), title, course, done: false }), commit();
  },
  toggle(t) {
    state[t.dataset.type].find(x => x.id === t.dataset.id).done = t.checked; commit();
  },
  del(t) {
    if (!confirm("Delete this item?")) return;
    const { type, id: i } = t.dataset;
    state[type] = state[type].filter(x => x.id !== i);
    if (type === "courses") ["assignments", "quizzes", "resources"].forEach(k => (state[k] = state[k].filter(x => x.course !== i)));
    commit();
  }
};

document.addEventListener("click", e => {
  const t = e.target.closest("[data-act]");
  if (t && t.type !== "checkbox" && actions[t.dataset.act]) actions[t.dataset.act](t);
});
document.addEventListener("change", e => {
  const t = e.target.closest("input[data-act]");
  if (t) actions[t.dataset.act](t);
});
window.addEventListener("hashchange", paint);

$("#app").innerHTML = `<header class="topbar"><strong>🎓 Learning Progress</strong><nav id="nav"></nav></header><main id="main" class="wrap"></main>`;
paint();
