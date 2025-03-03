import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './KanbanScreen.styles'; // Importar los estilos creados en styles.ts

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
  return (
    <View style={styles.taskCard}>
      <Text>{task.name}</Text>
      <TouchableOpacity onPress={() => moveTask(task.id, column)} style={styles.moveButton}>
        <Text style={{ color: 'white' }}>Mover</Text>
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
      <Text style={styles.columnTitle}>{title}</Text>
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
      { id: 2, name: 'Tarea 2' }
    ],
    inProgress: [
      { id: 3, name: 'Tarea 3' }
    ],
    done: [
      { id: 4, name: 'Tarea 4' }
    ]
  });

  const moveTask = (taskId: number, fromColumn: string) => {
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

    // Determinar la columna destino y mover la tarea
    if (taskToMove) {
      switch (fromColumn) {
        case 'todo':
          newTasks['inProgress'].push(taskToMove);
          break;
        case 'inProgress':
          newTasks['done'].push(taskToMove);
          break;
        case 'done':
          newTasks['todo'].push(taskToMove);
          break;
        default:
          break;
      }
    }

    setTasks(newTasks);
  };

  return (
    <View style={styles.kanbanBoard}>
      <KanbanColumn title="To Do" tasks={tasks.todo} moveTask={moveTask} columnName="todo" />
      <KanbanColumn title="In Progress" tasks={tasks.inProgress} moveTask={moveTask} columnName="inProgress" />
      <KanbanColumn title="Done" tasks={tasks.done} moveTask={moveTask} columnName="done" />
    </View>
  );
};

export default KanbanBoard;
