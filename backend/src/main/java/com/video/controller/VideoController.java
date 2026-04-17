package com.video.controller;

import com.video.dto.ApiResponse;
import com.video.dto.PageResponse;
import com.video.dto.VideoDTO;
import com.video.model.Video;
import com.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping("/hot")
    public ApiResponse<List<VideoDTO>> getHotVideos() {
        return ApiResponse.ok(videoService.getHotVideos());
    }

    @GetMapping("/new")
    public ApiResponse<List<VideoDTO>> getNewVideos() {
        return ApiResponse.ok(videoService.getNewVideos());
    }

    @GetMapping("/recommended")
    public ApiResponse<List<VideoDTO>> getRecommendedVideos() {
        return ApiResponse.ok(videoService.getRecommendedVideos());
    }

    @GetMapping("/top-rated")
    public ApiResponse<List<VideoDTO>> getTopRatedVideos() {
        return ApiResponse.ok(videoService.getTopRatedVideos());
    }

    @GetMapping("/most-viewed")
    public ApiResponse<List<VideoDTO>> getMostViewedVideos() {
        return ApiResponse.ok(videoService.getMostViewedVideos());
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<VideoDTO>> getVideosByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.ok(videoService.getVideosByCategory(categoryId, page, size));
    }

    @GetMapping("/type/{type}")
    public ApiResponse<List<VideoDTO>> getVideosByType(
            @PathVariable Video.VideoType type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.ok(videoService.getVideosByType(type, page, size));
    }

    @GetMapping("/{id}")
    public ApiResponse<VideoDTO> getVideoById(@PathVariable Long id) {
        return videoService.getVideoById(id)
                .map(ApiResponse::ok)
                .orElse(ApiResponse.error("Video not found"));
    }

    @GetMapping("/search")
    public ApiResponse<PageResponse<VideoDTO>> searchVideos(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.ok(videoService.searchVideos(keyword, page, size));
    }

    @GetMapping("/{id}/related")
    public ApiResponse<List<VideoDTO>> getRelatedVideos(@PathVariable Long id) {
        return videoService.getVideoById(id)
                .map(video -> ApiResponse.ok(videoService.getRelatedVideos(id, video.getCategoryId())))
                .orElse(ApiResponse.error("Video not found"));
    }
}
