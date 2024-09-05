import CategoryForm from "../../components/CategoryForm/CategoryForm";
import styles from "./CreateCategoryPage.module.scss";

const CreateCategoryPage = () => {
    return(
        <div className={styles.CreateCategoryPage}>
            <h1>Create New Category</h1>
            <CategoryForm />
        </div>
    )
}

export default CreateCategoryPage;