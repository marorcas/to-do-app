import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, TaskFormData } from "./schema";
import styles from "./TaskForm.module.scss";
import CategorySelector from "../CategorySelector/CategorySelector";

type FormType = 'ADD' | 'EDIT';

interface TaskFormProps {
    formType?: FormType;
    defaultValues?: TaskFormData;
    onSubmit: (data: TaskFormData) => unknown;
}

const TaskForm = ({
    formType = 'ADD', 
    defaultValues = {description: '', category: {id: 0, name: ''}}, 
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
                <CategorySelector selectedCategoryId={defaultValues.category?.id} />
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