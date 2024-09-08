import { Link } from "react-router-dom";
import { markTaskStatus, TaskResponse } from "../../services/task-services";
import styles from "./TaskCard.module.scss";
import { useEffect, useState } from "react";

interface TaskProps {
    task: TaskResponse;
}

const TaskCard = ({ task }: TaskProps) => {
    const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted);

    const toggleIsCompleted = async () => {
        const completedStatus = !isCompleted;
        setIsCompleted(completedStatus);

        await markTaskStatus(task.id, completedStatus);

        console.log(task);
    }

    return(
        <article className={styles.TaskCard}>
            <input
                className={styles.Checkbox}
                type="checkbox"
                checked={isCompleted}
                onChange={toggleIsCompleted}
            />

            <Link 
                className={styles.TaskInfo}
                key={task.id}
                to={`tasks/${task.id}/edit`}
            >
                    <h2 className={styles.Task}>{task.description}</h2>
                    <h3 className={styles.Category}>category: {task.category?.name ?? 'none'}</h3>
            </Link>
        </article>
    )
}

export default TaskCard;