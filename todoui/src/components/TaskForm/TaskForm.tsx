import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, TaskFormData } from "./schema";
import styles from "./TaskForm.module.scss";
import CategorySelector from "../CategorySelector/CategorySelector";
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContextProvider/TaskContextProvider";
import { deleteTaskById } from "../../services/task-services";

type FormType = 'ADD' | 'EDIT';

interface TaskFormProps {
    formType?: FormType;
    defaultValues?: TaskFormData;
    onSubmit: (data: TaskFormData) => unknown;
}

const TaskForm = ({
    formType = 'ADD', 
    defaultValues = {description: '', categoryId: undefined}, 
    onSubmit 
}: TaskFormProps) => {

    const {
        reset,
        register, 
        formState: { errors, isSubmitSuccessful }, 
        handleSubmit,
    } = useForm<TaskFormData>({ resolver: zodResolver(schema), defaultValues });

    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('Something went wrong');
    }
    const { tasks, setTasks } = context;

    const { id } = useParams() as { id: string };
    const idNumber = parseInt(id);

    const navigate = useNavigate();
   
    const [description, setDescription] = useState<string>(defaultValues.description);
    const [categoryId, setCategoryId] = useState<number | undefined>(defaultValues.categoryId);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(parseInt(event.target.value));
    }

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
            navigate("/");
        }
    }

    isSubmitSuccessful && reset();

    return(
        <>
            <form 
            className={styles.form} 
            onSubmit={handleSubmit(() => onSubmit({description, categoryId}))}
            >

                <div className={styles.field}>
                    {/* <div className={styles.field}> */}
                        <label htmlFor="description">Description</label>
                        <input 
                            id="description" 
                            type="text" {...register('description')} 
                            onChange={handleDescriptionChange}
                            placeholder="Add description..."
                        />
                        {errors?.description && 
                            <small className={styles.error_text}>
                                {errors.description.message}
                            </small>
                        }
                    {/* </div> */}

                    {/* <div className={styles.field}> */}
                        <label htmlFor="category">Category</label>
                        <CategorySelector 
                            selectedCategoryId={categoryId} 
                            onChange={handleCategoryChange} 
                        />
                        {errors?.categoryId && 
                            <small className={styles.error_text}>
                                {errors.categoryId.message}
                            </small>
                        }
                    {/* </div> */}
                </div>

                <div className={styles.Buttons}>
                    {formType === "EDIT" && <button className={styles.Button} onClick={() => onDelete(idNumber)}>Delete</button>}
                    
                    <button className={styles.Button} type="submit">{formType === 'ADD' ? 'Add' : 'Edit'}</button>
                </div>
            </form>

            <Link className={styles.Cancel} to="/">Cancel</Link>
        </>
    )
}

export default TaskForm;