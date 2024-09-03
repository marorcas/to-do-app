import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../contexts/CategoryContextProvider/CategoryContextProvider";
import { getAllCategories } from "../../services/category-services";
import React from "react";

interface CategorySelectorProps {
    selectedCategoryId: number | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelector = React.memo(( { selectedCategoryId, onChange}: CategorySelectorProps ) => {
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
        <select defaultValue={selectedCategoryId} id="categoryId" onChange={onChange}>
            <option key={0} value={0}>Select a category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    )
})

export default CategorySelector;