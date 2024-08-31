package com.todo.todoapi.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

public class UpdateTaskDTO {
    @Pattern(regexp = ".*\\S.*", message = "Description cannot be empty")
    @Length(min = 5)
    private String description;

    @Min(1)
    private Long categoryId;

    public String getDescription() {
        return description;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public String toString() {
        return "UpdateTaskDTO [description=" + description + ", category=" + categoryId + "]";
    }
}
