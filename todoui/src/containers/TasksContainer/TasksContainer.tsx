import { useEffect, useState } from "react";
import { getAllTasks, TaskResponse } from "../../services/task-services";
import TasksPage from "../../pages/TasksPage/TasksPage";

const TaskContainer = () => {
    const [tasks, setTasks] = useState<TaskResponse[]>([]);

    useEffect(() => {
        getAllTasks()
            .then(data => setTasks(data))
            .catch((e) => console.log(e));
    }, [setTasks]);

    return(
        <TasksPage tasks={tasks} setTasks={setTasks} />
    )
}

export default TaskContainer;