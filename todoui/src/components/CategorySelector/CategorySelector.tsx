import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../contexts/CategoryContextProvider/CategoryContextProvider";
import { getAllCategories } from "../../services/category-services";

interface CategorySelectorProps {
    selectedCategoryId: number;
}

const CategorySelector = ( {selectedCategoryId}: CategorySelectorProps ) => {
    // const [selectedCategory, setSelectedCategory] = useState<number>(selectedCategoryId);

    const context = useContext(CategoryContext);

    if (context === undefined) {
        throw new Error('Something went wrong');
    }

    const { categories, setCategories } = context;

    useEffect(() => {
        getAllCategories()
            .then((data) => setCategories(data))
            .catch((e) => console.warn(e));
    }, []);

    // const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedCategory(parseInt(event.target.value));
    // };

    return(
        <select defaultValue={selectedCategoryId}>
            <option value={0}>Select a category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    )
}

export default CategorySelector;