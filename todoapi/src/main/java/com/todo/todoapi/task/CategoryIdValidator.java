package com.todo.todoapi.task;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CategoryIdValidator implements ConstraintValidator<CategoryIdValid, Long> {

    // @Override
    // public void initialize(CategoryIdValid constraintAnnotation) {
    // }

    @Override
    public boolean isValid(Long categoryId, ConstraintValidatorContext context) {
        // if categoryId is null, it's valid
        if (categoryId == null) {
            System.out.println(categoryId == null);
            return true;
        }
        // validate categoryId is greater than 0 only if present
        return categoryId >= 1;
    }
}