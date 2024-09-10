import { useContext, useState } from "react";
import styles from "./CompletedButton.module.scss";
import { TaskContext } from "../../contexts/TaskContextProvider/TaskContextProvider";
import { getAllTasks, getTasksByCategory } from "../../services/task-services";

interface CompletedButtonProps {
    selectedCategoryId: number | undefined;
}

const CompletedButton = ({ selectedCategoryId = 0 } : CompletedButtonProps) => {
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
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => task.isCompleted);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        } else {
            if (selectedCategoryId > 0) {
                getTasksByCategory(selectedCategoryId)
                .then((data) => {
                    const updatedData = data.filter((task) => !task.isCompleted);
                    setTasks(updatedData);
                })
                .catch((e) => {
                    console.warn(e);
                });
            } else {
                getAllTasks()
                    .then((data) => {
                        const updatedData = data.filter((task) => !task.isCompleted);
                        setTasks(updatedData);
                    })
                    .catch((e) => console.warn(e));
            }

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