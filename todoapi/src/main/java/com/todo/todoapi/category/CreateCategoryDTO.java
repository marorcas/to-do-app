package com.todo.todoapi.category;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {
    @NotBlank
    @Length(min = 3)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CreateTaskDTO [name=" + name + "]";
    }
}
