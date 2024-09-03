import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, TaskFormData } from "./schema";
import styles from "./TaskForm.module.scss";
import CategorySelector from "../CategorySelector/CategorySelector";
import { useState } from "react";

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
        // handleSubmit,
    } = useForm<TaskFormData>({ resolver: zodResolver(schema), defaultValues });

    const [description, setDescription] = useState<string>(defaultValues.description);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(defaultValues.categoryId);

    console.log(defaultValues.categoryId)

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(parseInt(event.target.value));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: TaskFormData = { description };

        if (selectedCategoryId !== undefined) {
            data.categoryId = selectedCategoryId;
        }

        // if (selectedCategoryId === 0) {
        //     data.categoryId = undefined;
        // }

        onSubmit(data);
    };

    isSubmitSuccessful && reset();

    return(
        <form 
            className={styles.form} 
            onSubmit={handleSubmit}
        >
            <div className={styles.field}>
                <label htmlFor="description">Description</label>
                <input 
                    id="description" 
                    type="text" {...register('description')} 
                    onChange={handleDescriptionChange}
                />
                {errors?.description && 
                    <small className={styles.error_text}>
                        {errors.description.message}
                    </small>
                }
            </div>

            <div className={styles.field}>
                <label htmlFor="category">Category</label>
                <CategorySelector 
                    selectedCategoryId={selectedCategoryId} 
                    onChange={handleCategoryChange} 
                />
                {errors?.categoryId && 
                    <small className={styles.error_text}>
                        {errors.categoryId.message}
                    </small>
                }
            </div>
            
            <button type="submit">{formType === 'ADD' ? 'Add' : 'Edit'}</button>
        </form>
    )
}

export default TaskForm;