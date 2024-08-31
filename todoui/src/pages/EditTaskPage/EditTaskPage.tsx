import { useEffect, useState } from "react";
import { editTaskById, getTaskById, TaskResponse } from "../../services/task-services";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../../components/TaskForm/TaskForm";
import { TaskFormData } from "../../components/TaskForm/schema";

type FetchStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';
 
const EditTaskPage = () => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>('IDLE');
    const [error, setError] = useState<Error | null>(null);
    const [task, setTask] = useState<TaskResponse | null>(null);

    const { id } = useParams() as { id: string };
    const idNumber = parseInt(id);

    const navigate = useNavigate();

    useEffect(() => {
        setFetchStatus('LOADING');

        getTaskById(idNumber)
            .then(task => {
                setFetchStatus('SUCCESS');
                setTask(task);
            })
            .catch((e: Error) => {
                setFetchStatus('FAILURE');
                setError(e);
            });
    }, []);

    const formSubmit = (data: TaskFormData) => {
        editTaskById(idNumber, data)
            .then(() => navigate('/'))
            .catch(() => alert('Failed to update post'));
    }

    return (
        <>
            <h1>Edit Task {id}</h1>
            {fetchStatus === 'LOADING' && <p>Loading...</p>}

            {fetchStatus === 'FAILURE' && (
                <p style={{color: 'red'}}>
                    {error?.message}
                </p>
            )}

            {fetchStatus === 'SUCCESS' && task && 
                <TaskForm 
                    formType='EDIT' 
                    defaultValues={task}
                    onSubmit={formSubmit} 
                />
            }
        </>
    )
}

export default EditTaskPage;