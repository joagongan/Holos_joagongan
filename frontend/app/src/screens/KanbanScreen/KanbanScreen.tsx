import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Alert, Platform } from 'react-native';

// Tipo para una tarea
interface Task {
  id: number;
  name: string;
}

// Props para el componente TaskCard
interface TaskCardProps {
  task: Task;
  moveTask: (taskId: number, fromColumn: string) => void;
  column: string;
}

// Componente para una tarjeta
const TaskCard: React.FC<TaskCardProps> = ({ task, moveTask, column }) => {
  const buttonText = column === 'done' ? 'Archivar comisión' : 'Mover';
  return (
    <View style={styles.taskCard}>
      <Text style={styles.taskText}>{task.name}</Text>
      <TouchableOpacity onPress={() => moveTask(task.id, column)} style={styles.moveButton}>
        <Text style={{ color: 'white' }}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Props para el componente KanbanColumn
interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  moveTask: (taskId: number, fromColumn: string) => void;
  columnName: string;
}

// Componente para cada columna
const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, moveTask, columnName }) => {
  return (
    <View style={styles.kanbanColumn}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>{title}</Text>
      </View>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} moveTask={moveTask} column={columnName} />
      ))}
    </View>
  );
};

// Estructura del estado de las tareas en el tablero
interface KanbanBoardState {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

// Componente principal del tablero Kanban
const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<KanbanBoardState>({
    todo: [
      { id: 1, name: 'Tarea 1' },
      { id: 2, name: 'Tarea 2' },
      { id: 5, name: 'Tarea 5' }
    ],
    inProgress: [
      { id: 3, name: 'Tarea 3' }
    ],
    done: [
      { id: 4, name: 'Tarea 4' }
    ]
  });

  const moveTask = (taskId: number, fromColumn: string) => {
    const confirmationMessage = "Esta acción no se puede deshacer. ¿Está seguro de continuar?";
  
    const onConfirm = () => {
      const taskToMove = Object.values(tasks)
        .flat()
        .find((task) => task.id === taskId);
  
      const newTasks = { ...tasks };
  
      // Eliminar la tarea de su columna actual
      for (let column in newTasks) {
        newTasks[column as keyof KanbanBoardState] = newTasks[column as keyof KanbanBoardState].filter(
          (task) => task.id !== taskId
        );
      }
  
      // Si la tarea está en "done", simplemente la eliminamos
      if (fromColumn === "done") {
        setTasks(newTasks);
        return;
      }
  
      // Determinar la columna destino y mover la tarea
      if (taskToMove) {
        switch (fromColumn) {
          case "todo":
            newTasks["inProgress"].push(taskToMove);
            break;
          case "inProgress":
            newTasks["done"].push(taskToMove);
            break;
        }
      }
  
      setTasks(newTasks);
    };
  
    // **Mostrar alerta dependiendo de la plataforma**
    if (Platform.OS === "web") {
      if (window.confirm(confirmationMessage)) {
        onConfirm();
      }
    } else {
      Alert.alert("Confirmación", confirmationMessage, [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí, continuar", onPress: onConfirm }
      ]);
    }
  };
  

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Título de la página */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>PROYECTOS PERSONALIZADOS</Text>
        </View>

        {/* Scroll horizontal para las columnas en móvil */}
        <ScrollView horizontal contentContainerStyle={styles.kanbanBoard}>
          <KanbanColumn title="Pendiente" tasks={tasks.todo} moveTask={moveTask} columnName="todo" />
          <KanbanColumn title="En progreso" tasks={tasks.inProgress} moveTask={moveTask} columnName="inProgress" />
          <KanbanColumn title="Completado" tasks={tasks.done} moveTask={moveTask} columnName="done" />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default KanbanBoard;

const { width } = Dimensions.get("window");
const isMobile = width < 768;
const isBigScreen = width >= 1024;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: isBigScreen ? 40 : 20,
  },
  banner: {
    backgroundColor: "#183771",
    paddingVertical: isBigScreen ? 15 : 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  taskText: {
    fontSize: isMobile ? 14 : 16, // Texto más pequeño en móvil
  },
  bannerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: isBigScreen ? 24 : 18,
  },
  kanbanBoard: {
    flexDirection: isBigScreen ? "row" : "row", // En móvil y PC las columnas van en fila
    justifyContent: isBigScreen ? "space-between" : "flex-start",
    marginTop: 20,
    paddingHorizontal: isMobile ? 10 : 0,
  },
  kanbanColumn: {
    flex: isBigScreen ? 1 : 0, // En PC usa flex para que ocupe el mismo espacio, en móvil no
    margin: isMobile ? 5 : 10,
    padding: isMobile ? 5 : 15,
    width: isMobile ? 300 : 400, // Tamaño fijo en móvil, en PC más grande
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    padding: isMobile ? 10 : 15,
    marginTop: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  moveButton: {
    backgroundColor: "#183771",
    padding: 7,
    marginTop: 10,
    borderRadius: 5,
    width: isMobile ? "80%" : "33%",
    alignItems: "center",
    alignSelf: "center",
  },
});
