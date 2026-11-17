let tasks = [
    { id: 1, title: "Inspect Standard Pallets", status: "Pending" },
    { id: 2, title: "Dispatch Thermal Boxes", status: "In Progress" },
    { id: 3, title: "Verify Cargo Container Stock", status: "Completed" }
];

function addTask() {
    const input = document.getElementById("taskInput");
    const status = document.getElementById("statusSelect").value;
    const title = input.value.trim();

    if (title === "") {
        alert("Please enter a task first!");
        return;
    }

    tasks.push({
        id: Date.now(),
        title: title,
        status: status
    });

    input.value = "";
    renderTasks();
}

function renderTasks() {
    const pendingDiv = document.getElementById("pendingList");
    const inProgressDiv = document.getElementById("inProgressList");
    const completedDiv = document.getElementById("completedList");

    pendingDiv.innerHTML = "";
    inProgressDiv.innerHTML = "";
    completedDiv.innerHTML = "";

    tasks.forEach(function (task) {
        const card = document.createElement("div");
        card.className = "task-card";
        if (task.status === "In Progress") card.classList.add("in-progress");
        if (task.status === "Completed") card.classList.add("completed");

        const titleEl = document.createElement("p");
        titleEl.className = "task-title";
        titleEl.textContent = task.title;

        const actionsDiv = document.createElement("div");
        actionsDiv.className = "card-actions";

        const moveBtn = document.createElement("button");
        moveBtn.type = "button";
        moveBtn.className = "btn-small btn-move";
        moveBtn.textContent = "Move";
        moveBtn.onclick = function () { moveTask(task.id); };

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn-small btn-delete";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () { deleteTask(task.id); };

        actionsDiv.appendChild(moveBtn);
        actionsDiv.appendChild(deleteBtn);
        card.appendChild(titleEl);
        card.appendChild(actionsDiv);

        if (task.status === "Pending") {
            pendingDiv.appendChild(card);
        } else if (task.status === "In Progress") {
            inProgressDiv.appendChild(card);
        } else {
            completedDiv.appendChild(card);
        }
    });
}

function moveTask(id) {
    const task = tasks.find(function (t) { return t.id === id; });
    if (!task) return;

    if (task.status === "Pending") {
        task.status = "In Progress";
    } else if (task.status === "In Progress") {
        task.status = "Completed";
    } else {
        task.status = "Pending";
    }
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    renderTasks();
}

renderTasks();