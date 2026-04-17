package com.video.service;

import com.video.dto.PageResponse;
import com.video.dto.VideoDTO;
import com.video.model.Video;
import com.video.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;

    public List<VideoDTO> getHotVideos() {
        return videoRepository.findByIsHotTrueOrderByViewCountDesc()
                .stream().map(VideoDTO::fromEntity).collect(Collectors.toList());
    }

    public List<VideoDTO> getNewVideos() {
        return videoRepository.findByIsNewTrueOrderByReleaseDateDesc()
                .stream().map(VideoDTO::fromEntity).collect(Collectors.toList());
    }

    public List<VideoDTO> getRecommendedVideos() {
        return videoRepository.findByIsRecommendedTrueOrderByRatingDesc()
                .stream().map(VideoDTO::fromEntity).collect(Collectors.toList());
    }

    public List<VideoDTO> getTopRatedVideos() {
        return videoRepository.findTop10ByOrderByRatingDesc()
                .stream().map(VideoDTO::fromEntity).collect(Collectors.toList());
    }

    public List<VideoDTO> getMostViewedVideos() {
        return videoRepository.findTop10ByOrderByViewCountDesc()
                .stream().map(VideoDTO::fromEntity).collect(Collectors.toList());
    }

    public List<VideoDTO> getVideosByCategory(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return videoRepository.findByCategoryIdOrderByViewCountDesc(categoryId, pageable)
                .stream().map(VideoDTO::fromEntity).collect(Collectors.toList());
    }

    public List<VideoDTO> getVideosByType(Video.VideoType type, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return videoRepository.findByTypeOrderByViewCountDesc(type, pageable)
                .stream().map(VideoDTO::fromEntity).collect(Collectors.toList());
    }

    public Optional<VideoDTO> getVideoById(Long id) {
        return videoRepository.findById(id).map(VideoDTO::fromEntity);
    }

    public PageResponse<VideoDTO> searchVideos(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Video> result = videoRepository.searchVideos(keyword, pageable);
        PageResponse<VideoDTO> response = new PageResponse<>();
        response.setContent(result.getContent().stream().map(VideoDTO::fromEntity).collect(Collectors.toList()));
        response.setPage(result.getNumber());
        response.setSize(result.getSize());
        response.setTotalElements(result.getTotalElements());
        response.setTotalPages(result.getTotalPages());
        response.setFirst(result.isFirst());
        response.setLast(result.isLast());
        return response;
    }

    public List<VideoDTO> getRelatedVideos(Long videoId, Long categoryId) {
        Pageable pageable = PageRequest.of(0, 8);
        return videoRepository.findRelatedVideos(categoryId, videoId, pageable)
                .stream().map(VideoDTO::fromEntity).collect(Collectors.toList());
    }
}
