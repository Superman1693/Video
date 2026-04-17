package com.video.controller;

import com.video.dto.ApiResponse;
import com.video.model.Banner;
import com.video.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

    @GetMapping
    public ApiResponse<List<Banner>> getActiveBanners() {
        return ApiResponse.ok(bannerService.getActiveBanners());
    }
}
