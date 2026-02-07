import fs from "fs";
import chalk from "chalk";


export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;     // fecha límite opcional (ISO string)
  category?: string;    // categoría opcional (ej: "Trabajo", "Personal")
}

let tasks: Task[] = [];

// 📥 Cargar tareas desde JSON al iniciar
function loadTasks(): void {
  try {
    if (fs.existsSync("tasks.json")) {
      const data = fs.readFileSync("tasks.json", "utf-8");
      const parsed = JSON.parse(data);

      // Validar que sea un array
      if (Array.isArray(parsed)) {
        tasks = parsed;
      } else {
        console.warn("⚠ El archivo tasks.json no es un array válido. Reiniciando...");
        tasks = [];
        saveTasks();
      }
    } else {
      // Si no existe el archivo, lo creamos vacío
      tasks = [];
      saveTasks();
    }
  } catch (error) {
    console.error("⚠ Error al leer tasks.json. Reiniciando...");
    tasks = [];
    saveTasks();
  }
}

// 💾 Guardar tareas en JSON
function saveTasks(): void {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
}

// ➕ Agregar tarea
function addTask(title: string, dueDate?: string, category?: string): void {
  const newTask: Task = {
    id: tasks.length > 0 ? (tasks[tasks.length - 1]?.id ?? 0) + 1 : 1,
    title,
    completed: false,
    dueDate,
    category
  };
  tasks.push(newTask);
  saveTasks();
}


// 📋 Listar tareas
function listTasks(): void {
  if (tasks.length === 0) {
    console.log(chalk.yellow("⚠ No hay tareas registradas."));
    return;
  }

  tasks.forEach(task => {
    const status = task.completed 
      ? chalk.green("✔ Completada") 
      : chalk.red("✘ Pendiente");

    console.log(
      chalk.blue(`${task.id}.`) + " " + chalk.white(task.title) + " - " + status
    );
  });
}


// ✔ Completar tarea
function completeTask(id: number): boolean {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    saveTasks();
    return true;
  }
  return false;
}

// 🗑 Eliminar tarea
function deleteTask(id: number): boolean {
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length < initialLength) {
    saveTasks();
    return true;
  }
  return false;
}

export { loadTasks, addTask, listTasks, completeTask, deleteTask };
