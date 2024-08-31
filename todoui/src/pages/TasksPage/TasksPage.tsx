import { useEffect, useState } from "react"
import { deleteTaskById, getAllTasks, TaskResponse } from "../../services/task-services"
import TaskCard from "../../components/TaskCard/TaskCard";


const TasksPage = () => {
    const [tasks, setTasks] = useState<TaskResponse[]>([]);

    useEffect(() => {
        getAllTasks()
            .then(data => setTasks(data))
            .catch((e) => console.log(e));
    }, []);

    const onDelete = async (id: number) => {
        const confirmed = confirm("Are you sure you want to delete this task?");
        if (!confirmed) {
            return;
        }

        const isDeleted = await deleteTaskById(id)
            .catch((e) => {
                console.log(e)
                return false;
            });
        if (isDeleted) {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
        }
    }

    return(
        <>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} />
            ))}
        </>
    )
}

export default TasksPage;