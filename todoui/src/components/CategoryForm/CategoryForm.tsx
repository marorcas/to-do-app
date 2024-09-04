import { useContext, useState } from "react";
import { createCategory } from "../../services/category-services";
import { CategoryFormData, schema } from "./schema";
import { CategoryContext } from "../../contexts/CategoryContextProvider/CategoryContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./CategoryForm.module.scss";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
    const {
        register,
        reset, 
        handleSubmit,
        formState: { errors, isSubmitSuccessful }, 
    } = useForm<CategoryFormData>({ resolver: zodResolver(schema) });
    
    const context = useContext(CategoryContext);

    if (context === undefined) {
        throw new Error('Something went wrong');
    }

    const { categories, setCategories } = context;

    const navigate = useNavigate();

    const [name, setName] = useState<string>("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    
    const onSubmit = async (data: CategoryFormData) => {
        createCategory(data)
            .then((category) => {
                setCategories(categories.concat(category));
                navigate("/");
            })
            .catch((e) => console.log(e));
    }

    isSubmitSuccessful && reset();

    return(
        <form 
            className={styles.form} 
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className={styles.field}>
                <label htmlFor="category">Category</label>
                <input 
                    id="name" 
                    type="text" {...register('name')}
                    onChange={handleNameChange}
                    placeholder="Create new category..."
                />

                {errors?.name && 
                    <small className={styles.error_text}>
                        {errors.name.message}
                    </small>
                }
            </div>
            
            <button type="submit">Create</button>
        </form>
    )
}

export default CategoryForm;