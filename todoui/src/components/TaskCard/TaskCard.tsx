import { Link } from "react-router-dom";
import { TaskResponse } from "../../services/task-services";

interface TaskProps {
    task: TaskResponse;
    onDelete: (id: number) => Promise<unknown>;
}

const TaskCard = ({ task, onDelete }: TaskProps) => {
    return(
        <article key={task.id}>
            <h2>{task.description}</h2>
            <h2>{task.category}</h2>

            <button onClick={() => onDelete(task.id)}>Delete</button>
            <Link to={`tasks/${task.id}/edit`}>Edit</Link>
        </article>
    )
}

export default TaskCard;