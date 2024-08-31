import { createContext, FC, ReactNode, useState } from "react";

interface Category {
    id: number;
    name: string;
}

interface CategoryContextType {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const CategoryContext = createContext<CategoryContextType | null>(null);

interface CategoryContextProviderProps {
    children: ReactNode;
}

const CategoryContextProvider: FC<CategoryContextProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    return (
        <CategoryContext.Provider value={{categories, setCategories}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider;