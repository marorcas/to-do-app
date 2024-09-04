import { getAllTasks } from "../../services/task-services"
import TaskCard from "../../components/TaskCard/TaskCard";
import styles from "./TasksPage.module.scss";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import { useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContextProvider/TaskContextProvider";

const TasksPage = () => {
    const context = useContext(TaskContext);

    if (context === undefined) {
        throw new Error('Something went wrong');
    }

    const { tasks, setTasks } = context;

    useEffect(() => {
        getAllTasks()
            .then((data) => setTasks(data))
            .catch((e) => console.warn(e));
    }, []);

    return(
        <div className={styles.TasksPage}>
            <h1>To Do List</h1>

            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}

export default TasksPage;