package com.todo.todoapi.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTaskDTO {

    @NotBlank
    @Length(min = 5)
    private String description;

    @NotNull
    @Min(1)
    private Long categoryId;

    public String getDescription() {
        return description;
    }

    public Long getCategoryId() {
        return categoryId;
    }
}
