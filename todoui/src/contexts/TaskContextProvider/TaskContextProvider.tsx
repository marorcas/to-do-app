import { createContext, FC, ReactNode, useState } from "react";
import { TaskResponse } from "../../services/task-services";

interface TaskContextType {
    tasks: TaskResponse[];
    setTasks: React.Dispatch<React.SetStateAction<TaskResponse[]>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskContextProviderProps {
    children: ReactNode;
}

const TaskContextProvider: FC<TaskContextProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskResponse[]>([]);

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider;