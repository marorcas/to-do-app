import { useContext, useState } from "react";
import { CategoryResponse, createCategory } from "../../services/category-services";
import { CategoryFormData, schema } from "./schema";
import { CategoryContext } from "../../contexts/CategoryContextProvider/CategoryContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./CategoryForm.module.scss";

const CategoryForm = () => {
    const {
        reset, 
        formState: { errors, isSubmitSuccessful }, 
    } = useForm<CategoryFormData>({ resolver: zodResolver(schema) });
    
    const context = useContext(CategoryContext);

    if (context === undefined) {
        throw new Error('Something went wrong');
    }

    const { categories, setCategories } = context;

    const [newCategoryName, setNewCategoryName] = useState<string>("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryName(event.target.value);
    }
    
    const onSubmit = async (data: CategoryFormData) => {
        createCategory(data)
            .then((category) => {
                setCategories(categories.concat(category));
            })
            .catch((e) => console.log(e));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: CategoryFormData = { name: newCategoryName };

        onSubmit(data);
    };

    isSubmitSuccessful && reset();

    return(
        <form 
            className={styles.form} 
            onSubmit={handleSubmit}
        >

            <div className={styles.field}>
                    <input 
                        id="name" 
                        type="text"
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