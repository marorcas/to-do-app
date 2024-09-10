import { useContext, useState } from "react";
import styles from "./PriorityButton.module.scss";
import { TaskContext } from "../../contexts/TaskContextProvider/TaskContextProvider";
import { getAllTasks, getTasksByCategory } from "../../services/task-services";

interface PriorityButtonProps {
    selectedCategoryId: number | undefined;
}

const PriorityButton = ({ selectedCategoryId = 0 }: PriorityButtonProps) => {
    const context = useContext(TaskContext);

    if (context === undefined) {
        throw new Error('Something went wrong');
    }

    const { tasks, setTasks } = context;

    const [priority, setPriority] = useState<boolean>(false);

    const togglePriority = async () => {
        const priorityStatus = !priority;
        setPriority(priorityStatus);

        if (priorityStatus) {
            const updatedTasks = tasks.filter(task => task.hasPriority);
            setTasks(updatedTasks);
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

    const priorityClassNames = [
        styles.PriorityButton,
        priority ? styles.PrioritySelected : styles.PriorityUnselected
      ]
        .filter(Boolean) // Remove false or undefined values
        .join(' ');

    return (
        <button className={priorityClassNames} onClick={togglePriority}>
            Priority
        </button>
    );
}

export default PriorityButton;