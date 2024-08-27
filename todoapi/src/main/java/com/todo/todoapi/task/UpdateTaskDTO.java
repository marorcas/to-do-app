package com.todo.todoapi.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Pattern;

public class UpdateTaskDTO {
    @Pattern(regexp = ".*\\S.*", message = "Description cannot be empty")
    @Length(min = 5)
    private String description;

    @Pattern(regexp = ".*\\S.*", message = "Category cannot be empty")
    private String category;

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    @Override
    public String toString() {
        return "UpdateTaskDTO [description=" + description + ", category=" + category + "]";
    }
}
