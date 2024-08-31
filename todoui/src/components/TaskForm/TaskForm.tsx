import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, TaskFormData } from "./schema";
import styles from "./TaskForm.module.scss";

type FormType = 'ADD' | 'EDIT';

interface TaskFormProps {
    formType?: FormType;
    defaultValues?: TaskFormData;
    onSubmit: (data: TaskFormData) => unknown;
}

const TaskForm = ({
    formType = 'ADD', 
    defaultValues = {description: '', category: ''}, 
    onSubmit 
}: TaskFormProps) => {
    const {
        reset,
        register, 
        formState: { errors, isSubmitSuccessful }, 
        handleSubmit,
    } = useForm<TaskFormData>({ resolver: zodResolver(schema), defaultValues });

    isSubmitSuccessful && reset();
    
    return(
        <form 
            className={styles.form} 
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={styles.field}>
                <label htmlFor="description">Description</label>
                <input id="description" type="text" {...register('description')} />
                {errors?.description && 
                    <small className={styles.error_text}>
                        {errors.description.message}
                    </small>
                }
            </div>

            <div className={styles.field}>
                <label htmlFor="category">Category</label>
                <input id="category" type="text" {...register('category')} />
                {errors?.category && 
                    <small className={styles.error_text}>
                        {errors.category.message}
                    </small>
                }
            </div>
            
            <button>{formType === 'ADD' ? 'Add' : 'Edit'}</button>
        </form>
    )
}

export default TaskForm;