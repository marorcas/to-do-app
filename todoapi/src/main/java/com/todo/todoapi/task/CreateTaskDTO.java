package com.todo.todoapi.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {

    @NotBlank
    @Length(min = 5)
    private String description;

    @CategoryIdValid
    private Long categoryId;

    private Boolean isCompleted;

    public String getDescription() {
        return description;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    @Override
    public String toString() {
        return "CreateTaskDTO [description=" + description + ", category= " +
                categoryId + "]";
    }
}
