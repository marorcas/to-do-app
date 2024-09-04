import { useContext, useEffect } from "react";
import { CategoryContext } from "../../contexts/CategoryContextProvider/CategoryContextProvider";
import { getAllCategories } from "../../services/category-services";
import React from "react";

interface CategorySelectorProps {
    selectedCategoryId: number | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelector = ({ 
    selectedCategoryId, 
    onChange
}: CategorySelectorProps ) => {

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

    return(
        <select value={selectedCategoryId} onChange={onChange}>
            <option key={0} value={0}>Select a category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    )
}

export default CategorySelector;