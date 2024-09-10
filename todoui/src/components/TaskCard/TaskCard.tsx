import { Link } from "react-router-dom";
import { getAllTasks, markTaskPriority, markTaskStatus, TaskResponse } from "../../services/task-services";
import styles from "./TaskCard.module.scss";
import { useContext, useState } from "react";
import HighlighterIcon from "./HighlighterIcon";
import { TaskContext } from "../../contexts/TaskContextProvider/TaskContextProvider";

interface TaskProps {
    task: TaskResponse;
}

const TaskCard = ({ task }: TaskProps) => {
    const context = useContext(TaskContext);

    if (context === undefined) {
        throw new Error('Something went wrong');
    }

    const { setTasks } = context;

    const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted);
    const [hasPriority, setHasPriority] = useState<boolean>(task.hasPriority);

    const toggleIsCompleted = async () => {
        const completedStatus = !isCompleted;
        setIsCompleted(completedStatus);

        await markTaskStatus(task.id, completedStatus);

        task.isCompleted = completedStatus;

        console.log(task);

        if (completedStatus) {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => !task.isCompleted);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        } else {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => task.isCompleted);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        }
    }

    const toggleHasPriority = async () => {
        const priorityStatus = !hasPriority;
        setHasPriority(priorityStatus);

        await markTaskPriority(task.id, priorityStatus);

        task.hasPriority = priorityStatus;

        console.log(task);
    }

    const taskClassNames = [
        styles.Task,
        isCompleted && styles.Completed,
        hasPriority && styles.Priority
      ]
        .filter(Boolean) // Remove false or undefined values
        .join(' ');

    return(
        <article className={styles.TaskCard}>
            <div className={styles.CheckboxContainer}>
                <input
                    className={styles.Checkbox}
                    type="checkbox"
                    checked={isCompleted}
                    onChange={toggleIsCompleted}
                />
            </div>

            <Link 
                className={styles.TaskInfo}
                key={task.id}
                to={`tasks/${task.id}/edit`}
            >
                <h2 className={taskClassNames}>{task.description}</h2>
            </Link>

            <button className={styles.HighlighterContainer} onClick={toggleHasPriority}>
                <HighlighterIcon />
            </button>
        </article>
    )
}

export default TaskCard;