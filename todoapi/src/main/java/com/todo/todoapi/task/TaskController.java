package com.todo.todoapi.task;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("tasks")
public class TaskController {

    @PostMapping
    public String createTask(@Valid @RequestBody CreateTaskDTO data) {
        System.out.println(data);
        return "Creates task";
    }

}
