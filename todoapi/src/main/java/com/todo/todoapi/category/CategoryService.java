package com.todo.todoapi.category;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todoapi.common.ValidationErrors;
import com.todo.todoapi.common.exceptions.ServiceValidationException;

import jakarta.validation.Valid;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repo;

    public Category createCategory(@Valid CreateCategoryDTO data) throws Exception {
        ValidationErrors errors = new ValidationErrors();

        Category newCategory = new Category();
        String dataName = data.getName().trim().toLowerCase();
        newCategory.setName(dataName);
        if (repo.existsByName(dataName)) {
            errors.addError("name", String.format("Category %s already exists", dataName));
        }

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        return this.repo.save(newCategory);
    }

    public List<Category> findAll() {
        return this.repo.findAll();
    }

    public Optional<Category> findById(Long categoryId) {
        return this.repo.findById(categoryId);
    }

}
