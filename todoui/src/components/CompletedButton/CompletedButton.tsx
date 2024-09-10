import { useContext, useState } from "react";
import styles from "./CompletedButton.module.scss";
import { TaskContext } from "../../contexts/TaskContextProvider/TaskContextProvider";
import { getAllTasks } from "../../services/task-services";

const CompletedButton = () => {
    const context = useContext(TaskContext);

    if (context === undefined) {
        throw new Error('Something went wrong');
    }

    const { tasks, setTasks } = context;

    const [completed, setCompleted] = useState<boolean>(false);

    const toggleCompleted = async () => {
        const completedStatus = !completed;
        setCompleted(completedStatus);

        if (completedStatus) {
            const updatedTasks = tasks.filter(task => task.isCompleted === true);
            setTasks(updatedTasks);
        } else {
            getAllTasks()
                .then((data) => setTasks(data))
                .catch((e) => console.warn(e));

        }
    }

    const completedClassNames = [
        styles.CompletedButton,
        completed ? styles.CompletedSelected : styles.CompletedUnselected
      ]
        .filter(Boolean) // Remove false or undefined values
        .join(' ');

    return (
        <button className={completedClassNames} onClick={toggleCompleted}>
            Completed
        </button>
    );
}

export default CompletedButton;