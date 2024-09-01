import { Link } from "react-router-dom";
import { TaskResponse } from "../../services/task-services";
import styles from "./TaskCard.module.scss";

interface TaskProps {
    task: TaskResponse;
    onDelete: (id: number) => Promise<unknown>;
}

const TaskCard = ({ task, onDelete }: TaskProps) => {
    return(
        <article 
            className={styles.TaskCard}
            key={task.id}
        >
            <h2 className={styles.Task}>{task.description}</h2>
            <h3 className={styles.Category}>category: {task.category?.name ?? 'none'}</h3>

            <button onClick={() => onDelete(task.id)}>Delete</button>
            <Link to={`tasks/${task.id}/edit`}>Edit</Link>
        </article>
    )
}

export default TaskCard;