import readline from "readline";
import { addTask, listTasks, completeTask, deleteTask } from "./todo.js";
import chalk from "chalk";
import { exportToCSV, exportToMarkdown } from "./todo.js";

// Configuración de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú
function showMenu(): void {
  console.log("\n=== Lista de Tareas ===");
  console.log("1. Agregar tarea");
  console.log("2. Listar tareas");
  console.log("3. Completar tarea");
  console.log("4. Eliminar tarea");
  console.log("5. Salir\n");
  console.log(chalk.cyan("6.") + " Exportar a CSV");
console.log(chalk.cyan("7.") + " Exportar a Markdown");


  rl.question("Elige una opción: ", (option) => {
    handleOption(option);
  });
}

// Función para manejar las opciones
function handleOption(option: string): void {
  switch (option) {
    case "1":
      rl.question("Título de la tarea: ", (title) => {
        addTask(title);
        console.log("✅ Tarea agregada.");
        showMenu();
      });
      break;

    case "2":
      listTasks();
      showMenu();
      break;

    case "3":
      rl.question("ID de la tarea a completar: ", (id) => {
        const success = completeTask(Number(id));
        console.log(success ? "✔ Tarea completada." : "⚠ No se encontró la tarea.");
        showMenu();
      });
      break;

    case "4":
      rl.question("ID de la tarea a eliminar: ", (id) => {
        deleteTask(Number(id));
        console.log("🗑 Tarea eliminada.");
        showMenu();
      });
      break;

    case "5":
      console.log("👋 Saliendo...");
      rl.close();
      break;

      case "6":
  exportToCSV();
  showMenu();
  break;

case "7":
  exportToMarkdown();
  showMenu();
  break;


    default:
      console.log("❌ Opción inválida.");
      showMenu();
      break;
  }
}

// Iniciar el programa
showMenu();

export { showMenu };
