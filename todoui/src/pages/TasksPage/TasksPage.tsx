import { getAllTasks } from "../../services/task-services"
import TaskCard from "../../components/TaskCard/TaskCard";
import styles from "./TasksPage.module.scss";
import { useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContextProvider/TaskContextProvider";
import { Link } from "react-router-dom";

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
            <h1>Tasks</h1>

            <div className={styles.Links}>
                <Link to="/categories/new">Create category</Link>
                <Link to="/tasks/new">Create task</Link>
            </div>

            {tasks.length === 0 ? (
                <p>No tasks yet</p>
            ) : (
                tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))
            )}
        </div>
    )
}

export default TasksPage;