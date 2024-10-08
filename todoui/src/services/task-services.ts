import { TaskFormData } from "../components/TaskForm/schema";
import { CategoryResponse } from "./category-services";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export interface TaskResponse {
    id: number;
    description: string;
    isCompleted: boolean;
    hasPriority: boolean;
    category: CategoryResponse;
}

export const getAllTasks = async () => {
    const response = await fetch(`${apiBaseURL}/tasks`);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    return (await response.json()) as TaskResponse[];
}

export const getTaskById = async (id: number) => {
    const response = await fetch(`${apiBaseURL}/tasks/${id}`);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(await response.text());
        }
        throw new Error('Something went wrong');
    }

    return (await response.json()) as TaskResponse;
}

export const getTasksByCategory = async (id: number) => {
    const response = await fetch(`${apiBaseURL}/tasks/category/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    return (await response.json()) as TaskResponse[];
}

export const editTaskById = async (id: number, data: TaskFormData) => {
    let updatedData = {
        description: data.description,
        categoryId: data.categoryId === 0 ? null : data.categoryId
    }
    const response = await fetch(`${apiBaseURL}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
  
    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    return (await response.json()) as TaskResponse;
}

export const deleteTaskById = async (id: number) => {
    const response = await fetch(`${apiBaseURL}/tasks/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete');
    }
    
    return true;
}

export const createTask = async (data: TaskFormData) => {
    const response = await fetch(`${apiBaseURL}/tasks`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response) {
        throw new Error('Failed to post');
    }

    return (await response.json()) as TaskResponse;
}

export const markTaskStatus = async (id: number, taskStatus: boolean) => {
    const response = await fetch(`${apiBaseURL}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(
            {
                "isCompleted": taskStatus
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response) {
        throw new Error('Failed to post');
    }

    return (await response.json()) as TaskResponse;
}

export const markTaskPriority = async (id: number, taskPriority: boolean) => {
    const response = await fetch(`${apiBaseURL}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(
            {
                "hasPriority": taskPriority
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response) {
        throw new Error('Failed to post');
    }

    return (await response.json()) as TaskResponse;
}