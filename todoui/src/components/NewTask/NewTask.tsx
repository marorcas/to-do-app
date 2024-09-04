import { createTask, TaskResponse } from "../../services/task-services";
import { TaskFormData } from "../TaskForm/schema";
import TaskForm from "../TaskForm/TaskForm";

interface NewTaskProps {
    tasks: TaskResponse[];
    setTasks: React.Dispatch<React.SetStateAction<TaskResponse[]>>
}

const NewTask = ({ tasks, setTasks }: NewTaskProps) => {
    const onSubmit = async (data: TaskFormData) => {
        createTask(data)
            .then((task) => {
                console.log(task)
                setTasks(tasks.concat(task))
            })
            .catch((e) => console.log(e));
    }
    return(
        <>
            <TaskForm onSubmit={onSubmit} />
        </>
    )
}

export default NewTask;