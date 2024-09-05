import { Link } from "react-router-dom";
import { TaskResponse } from "../../services/task-services";
import styles from "./TaskCard.module.scss";

interface TaskProps {
    task: TaskResponse;
}

const TaskCard = ({ task }: TaskProps) => {
    return(
        <article className={styles.TaskCard}>
            <input
                className={styles.Checkbox}
                type="checkbox"
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