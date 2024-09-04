package com.todo.todoapi.task;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todoapi.category.Category;
import com.todo.todoapi.category.CategoryService;
import com.todo.todoapi.common.exceptions.NotFoundException;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody CreateTaskDTO data) throws Exception {
        Task createdTask = this.taskService.createTask(data);
        return new ResponseEntity<Task>(createdTask, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Task>> findAllTasks() {
        List<Task> tasks = this.taskService.findAll();
        return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> findTaskById(@PathVariable Long id) throws NotFoundException {
        Optional<Task> result = this.taskService.findById(id);
        Task foundTask = result.orElseThrow(
                () -> new NotFoundException("Could not find task with id " + id));
        return new ResponseEntity<Task>(foundTask, HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Task>> findTaskByCategory(@PathVariable Long id) {
        Optional<Category> result = this.categoryService.findById(id);

        List<Task> tasks = this.taskService.findByCategory(result.get());

        return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Task> updateTaskById(@PathVariable Long id, @Valid @RequestBody UpdateTaskDTO data)
            throws Exception {
        Optional<Task> result = this.taskService.updateById(id, data);
        Task foundTask = result.orElseThrow(
                () -> new NotFoundException("Could not find task with id " + id));
        return new ResponseEntity<Task>(foundTask, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable Long id) throws NotFoundException {
        boolean result = this.taskService.deleteById(id);

        if (result == false) {
            throw new NotFoundException("Could not find task with id " + id);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
