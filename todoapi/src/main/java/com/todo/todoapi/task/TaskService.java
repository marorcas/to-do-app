package com.todo.todoapi.task;

import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class TaskService {

    public String createTask(@Valid CreateTaskDTO data) {
        System.out.println("From service: " + data);
        return "Got to service";
    }

}
