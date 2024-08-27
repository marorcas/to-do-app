package com.todo.todoapi.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {

    @NotBlank
    @Length(min = 5)
    private String description;

    @NotBlank
    private String category;

    // @NotNull
    // @Min(1)
    // private Long categoryId;

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    @Override
    public String toString() {
        return "CreateTaskDTO [description=" + description + ", category= " +
                category + "]";
    }
}
