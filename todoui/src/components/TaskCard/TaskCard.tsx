import { Link } from "react-router-dom";
import { editTaskById, TaskResponse } from "../../services/task-services";
import styles from "./TaskCard.module.scss";
import TaskForm from "../TaskForm/TaskForm";
import { TaskFormData } from "../TaskForm/schema";

interface TaskProps {
    task: TaskResponse;
    onDelete: (id: number) => Promise<unknown>;
}

const TaskCard = ({ task, onDelete }: TaskProps) => {

    const onSubmit = async (data: TaskFormData) => {
        console.log(data)
        const dataTask = editTaskById(task.id, data)
            .then((task) => {
                console.log(task)
            })
            .catch(() => alert('Failed to update post'));
        console.log(dataTask)
    }

    const taskData = {
        description: task.description,
        categoryId: task.category ? task.category.id : undefined
    }

    return(
        // <article 
        //     className={styles.TaskCard}
        //     key={task.id}
        // >
        //     <div className={styles.TaskInfo}>
        //         <h2 className={styles.Task}>{task.description}</h2>
        //         <h3 className={styles.Category}>category: {task.category?.name ?? 'none'}</h3>
        //     </div>

        //     <div className={styles.Buttons}>
        //         <button onClick={() => onDelete(task.id)}>Delete</button>
        //         <button>Duplicate</button>
        //         <Link to={`tasks/${task.id}/edit`}>Edit</Link>
        //     </div>
        // </article>

        <article>
            <TaskForm formType="EDIT" defaultValues={taskData} onSubmit={onSubmit} />

            <button onClick={() => onDelete(task.id)}>Delete</button>

            <button>Duplicate</button>
        </article>
        
    )
}

export default TaskCard;