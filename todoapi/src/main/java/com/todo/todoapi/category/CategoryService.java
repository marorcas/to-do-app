package com.todo.todoapi.category;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repo;

    public Category createCategory(@Valid CreateCategoryDTO data) throws Exception {
        Category newCategory = new Category();
        String dataName = data.getName().trim().toLowerCase();
        newCategory.setName(dataName);
        if (repo.existsByName(dataName)) {
            throw new Exception("Category already exists");
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
