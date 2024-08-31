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

    public Task createTask(@Valid CreateTaskDTO data) throws Exception {
        ValidationErrors errors = new ValidationErrors();

        Task newTask = new Task();
        newTask.setDescription(data.getDescription().trim());

        Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());
        if (categoryResult.isEmpty()) {
            errors.addError("category", String.format("Category with id %s does not exist", data.getCategoryId()));
        }

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        newTask.setCategory(categoryResult.get());

        return this.repo.save(newTask);
    }

    public List<Task> findAll() {
        return this.repo.findAll();
    }

    public Optional<Task> findById(Long id) {
        return this.repo.findById(id);
    }

    public Optional<Task> updateById(Long id, @Valid UpdateTaskDTO data) throws Exception {
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
                throw new Exception("Category does not exist");
            }
            foundTask.setCategory(categoryResult.get());
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
