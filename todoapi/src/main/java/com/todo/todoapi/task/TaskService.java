package com.todo.todoapi.task;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todoapi.category.Category;
import com.todo.todoapi.category.CategoryService;
import com.todo.todoapi.common.ValidationErrors;
import com.todo.todoapi.common.exceptions.ServiceValidationException;

import jakarta.validation.Valid;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    @Autowired
    private CategoryService categoryService;

    public Task createTask(CreateTaskDTO data) throws Exception {
        ValidationErrors errors = new ValidationErrors();

        Task newTask = new Task();
        newTask.setDescription(data.getDescription().trim());

        if (data.getCategoryId() != null) {
            Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());

            if (categoryResult.isEmpty()) {
                errors.addError("category", String.format("Category with id %s does not exist", data.getCategoryId()));
            } else if (categoryResult.isPresent()) {
                newTask.setCategory(categoryResult.get());
            }
        }

        newTask.setIsCompleted(false);

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        return this.repo.save(newTask);
    }

    public List<Task> findAll() {
        return this.repo.findAll();
    }

    public Optional<Task> findById(Long id) {
        return this.repo.findById(id);
    }

    public List<Task> findByCategory(Category category) {
        return this.repo.findByCategory(category);
    }

    public Optional<Task> updateById(Long id, @Valid UpdateTaskDTO data) throws Exception {
        ValidationErrors errors = new ValidationErrors();

        Optional<Task> result = this.findById(id);
        if (result.isEmpty()) {
            return result;
        }

        Task foundTask = result.get();

        if (data.getDescription() != null) {
            foundTask.setDescription(data.getDescription().trim());
        }
        if (data.getCategoryId() != null) {
            Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());
            if (categoryResult.isEmpty()) {
                errors.addError("category", String.format("Category with id %s does not exist", data.getCategoryId()));
            } else {
                foundTask.setCategory(categoryResult.get());
            }
        }

        Boolean isCompleted = data.getIsCompleted();
        if (isCompleted != null) {
            foundTask.setIsCompleted(isCompleted);
        } else {
            errors.addError("isCompleted", String.format("Value entered is not a boolean"));
        }

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        Task updatedTask = this.repo.save(foundTask);
        return Optional.of(updatedTask);
    }

    public boolean deleteById(Long id) {
        Optional<Task> result = this.findById(id);

        if (result.isEmpty()) {
            return false;
        }

        this.repo.delete(result.get());
        return true;
    }
}
