import readline from "readline";
import chalk from "chalk";
import { loadTasks, addTask, listTasks, completeTask, deleteTask } from "./todo.js";

// Configuración de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Mostrar menú con colores
function showMenu(): void {
  console.log(chalk.bold.bgCyan("\n=== Lista de Tareas ==="));
  console.log(chalk.green("1.") + " Agregar tarea");
  console.log(chalk.blue("2.") + " Listar tareas");
  console.log(chalk.yellow("3.") + " Completar tarea");
  console.log(chalk.red("4.") + " Eliminar tarea");
  console.log(chalk.magenta("5.") + " Salir\n");

  rl.question(chalk.bold("Elige una opción: "), (option) => {
    handleOption(option);
  });
}

// Manejar opciones del menú
function handleOption(option: string): void {
  switch (option) {
    case "1":
  rl.question(chalk.green("Título de la tarea: "), (title) => {
    rl.question(chalk.cyan("Fecha límite (YYYY-MM-DD, opcional): "), (dueDate) => {
      rl.question(chalk.magenta("Categoría (ej: Trabajo, Personal, opcional): "), (category) => {
        addTask(title, dueDate || undefined, category || undefined);
        console.log(chalk.green("✅ Tarea agregada."));
        showMenu();
      });
    });
  });
  break;


    case "2":
      console.log(chalk.bold.bgBlue("\n📋 Tus tareas:"));
      listTasks();
      showMenu();
      break;

    case "3":
      rl.question(chalk.yellow("ID de la tarea a completar: "), (id) => {
        const success = completeTask(Number(id));
        console.log(success ? chalk.green("✔ Tarea completada.") : chalk.red("⚠ No se encontró la tarea."));
        showMenu();
      });
      break;

    case "4":
      rl.question(chalk.red("ID de la tarea a eliminar: "), (id) => {
        const success = deleteTask(Number(id));
        console.log(success ? chalk.red("🗑 Tarea eliminada.") : chalk.red("⚠ No se encontró la tarea."));
        showMenu();
      });
      break;

    case "5":
      console.log(chalk.bold.bgMagenta("👋 Saliendo... ¡Hasta pronto!"));
      rl.close();
      break;

    default:
      console.log(chalk.red("❌ Opción inválida."));
      showMenu();
      break;
  }
}

// Iniciar programa
loadTasks(); // carga las tareas guardadas
showMenu();
