package com.video.controller;

import com.video.dto.ApiResponse;
import com.video.model.Category;
import com.video.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<Category>> getAllCategories() {
        return ApiResponse.ok(categoryService.getAllCategories());
    }
}
