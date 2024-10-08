import { CategoryFormData } from "../components/CategoryForm/schema";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export interface CategoryResponse {
    id: number;
    name: string;
}

export const getAllCategories = async () => {
    const response = await fetch(`${apiBaseURL}/categories`);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    return (await response.json()) as CategoryResponse[];
}

export const getCategoryById = async (id: number) => {
    const response = await fetch(`${apiBaseURL}/categories/${id}`);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(await response.text());
        }
        throw new Error('Something went wrong');
    }

    return (await response.json()) as CategoryResponse;
}

export const deleteCategoryById = async (id: number) => {
    const response = await fetch(`${apiBaseURL}/categories/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete');
    }
    
    return true;
}

export const createCategory = async (data: CategoryFormData) => {
    const response = await fetch(`${apiBaseURL}/categories`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response) {
        throw new Error('Failed to post');
    }

    return (await response.json()) as CategoryResponse;
}