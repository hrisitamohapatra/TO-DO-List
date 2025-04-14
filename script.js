document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const clearAllButton = document.getElementById("clearAll");
    const allTab = document.getElementById("all");
    const pendingTab = document.getElementById("pending");
    const completedTab = document.getElementById("completed");

    let tasks = [];
    let taskIdCounter = 0; 

    
    function showTasks(filter = "all") {
        taskList.innerHTML = "";

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            
            if (filter === "pending" && task.completed) continue;
            if (filter === "completed" && !task.completed) continue;

            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}">
                <span class="${task.completed ? "completed-task" : ""}">${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">X</button>
            `;

            taskList.appendChild(li);


        }
    }

    
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        tasks.push({
            id: taskIdCounter++, 
            text: taskText,
            completed: false
        });

        taskInput.value = "";
        showTasks();
    });

    
    taskList.addEventListener("change", (e) => {
        if (e.target.type === "checkbox") {
            const taskId = parseInt(e.target.dataset.id);
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id === taskId) {
                    tasks[i].completed = e.target.checked;
                    break;
                }
            }
            showTasks();
        }
    });

    
    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const taskId = parseInt(e.target.dataset.id);
            tasks = tasks.filter(task => task.id !== taskId);
            showTasks();
        }
    });

    
    clearAllButton.addEventListener("click", () => {
        tasks = [];
        showTasks();
    });

    
    allTab.addEventListener("click", () => {
        showTasks("all");
        setActiveTab(allTab);
    });

    pendingTab.addEventListener("click", () => {
        showTasks("pending");
        setActiveTab(pendingTab);
    });

    completedTab.addEventListener("click", () => {
        showTasks("completed");
        setActiveTab(completedTab);
    });

    function setActiveTab(activeTab) {
        allTab.classList.remove("active");
        pendingTab.classList.remove("active");
        completedTab.classList.remove("active");
        activeTab.classList.add("active");
    }

    
    showTasks();
});
