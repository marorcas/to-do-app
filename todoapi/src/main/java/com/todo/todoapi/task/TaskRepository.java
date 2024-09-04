package com.todo.todoapi.task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.todo.todoapi.category.Category;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCategory(Category category);
}
