import { getAllTasks, getTasksByCategory } from "../../services/task-services"
import TaskCard from "../../components/TaskCard/TaskCard";
import styles from "./TasksPage.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../../contexts/TaskContextProvider/TaskContextProvider";
import { Link } from "react-router-dom";
import CategorySelector from "../../components/CategorySelector/CategorySelector";

const TasksPage = () => {
    const context = useContext(TaskContext);

    if (context === undefined) {
        throw new Error('Something went wrong');
    }

    const { tasks, setTasks } = context;

    const [categoryId, setCategoryId] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(parseInt(event.target.value));
    }

    useEffect(() => {
        if (categoryId > 0) {
            getTasksByCategory(categoryId)
            .then((data) => {
                setTasks(data);
            })
            .catch((e) => {
                console.warn(e);
            });
        } else {
            getAllTasks()
                .then((data) => setTasks(data))
                .catch((e) => console.warn(e));
        }
    }, [categoryId]);

    return(
        <div className={styles.TasksPage}>
            <h1>Tasks</h1>

            <div className={styles.Links}>
                <Link className={styles.Link} to="/categories/new">Create category</Link>
                <Link className={styles.Link} to="/tasks/new">Create task</Link>
            </div>

            <form
                className={styles.FilterByCategory}
            >
                <label>Filter tasks by category:</label>
                <CategorySelector selectedCategoryId={categoryId} onChange={handleCategoryChange}/>
            </form>

            {tasks.length === 0 ? (
                <p>No current pending tasks</p>
            ) : (
                tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))
            )}
        </div>
    )
}

export default TasksPage;