addTask("Aprender TypeScript");
addTask("Hacer ejercicio");
listTasks();

completeTask(1);
listTasks();
deleteTask(2);
listTasks();

import { addTask, listTasks, completeTask, deleteTask } from "./todo.js";
import { showMenu } from "./menu.js";
import { loadTasks } from "./todo.js";

loadTasks(); // carga las tareas guardadas


// Iniciar la aplicación mostrando el menú
showMenu();
