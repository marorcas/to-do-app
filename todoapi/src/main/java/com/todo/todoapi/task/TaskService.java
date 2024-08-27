package com.todo.todoapi.task;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    public Task createTask(@Valid CreateTaskDTO data) {
        Task newTask = new Task();
        newTask.setDescription(data.getDescription().trim());
        newTask.setCategory(data.getCategory().trim().toLowerCase());
        return this.repo.save(newTask);
    }

    public List<Task> findAll() {
        return this.repo.findAll();
    }

    public Optional<Task> findById(Long id) {
        return this.repo.findById(id);
    }

    public Optional<Task> updateTaskById(Long id, @Valid UpdateTaskDTO data) {
        Optional<Task> result = this.findById(id);
        if (result.isEmpty()) {
            return result;
        }

        Task foundTask = result.get();
        if (data.getDescription() != null) {
            foundTask.setDescription(data.getDescription().trim());
        }
        if (data.getCategory() != null) {
            foundTask.setCategory(data.getCategory().trim().toLowerCase());
        }

        Task updatedTask = this.repo.save(foundTask);
        return Optional.of(updatedTask);
    }
}
