import { useNavigate } from "react-router-dom";
import { TaskFormData } from "../../components/TaskForm/schema";
import TaskForm from "../../components/TaskForm/TaskForm";
import { createTask } from "../../services/task-services";

const CreateTaskPage = () => {
    const navigate = useNavigate();
    
    const onSubmit = async (data: TaskFormData) => {
        createTask(data)
            .then((task) => {
                console.log(task)
                navigate('/');
            })
            .catch((e) => console.log(e));
    }
    return(
        <>
            <h1>Add New Task</h1>
            <TaskForm onSubmit={onSubmit} />
        </>
    )
}

export default CreateTaskPage;