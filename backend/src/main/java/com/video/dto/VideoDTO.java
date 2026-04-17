package com.video.dto;

import com.video.model.Video;
import lombok.Data;

import java.time.LocalDate;

@Data
public class VideoDTO {
    private Long id;
    private String title;
    private String description;
    private String coverUrl;
    private String videoUrl;
    private String trailerUrl;
    private String director;
    private String cast;
    private String country;
    private LocalDate releaseDate;
    private Integer year;
    private Integer durationMinutes;
    private Double rating;
    private Long ratingCount;
    private Long viewCount;
    private Video.VideoType type;
    private Integer episodeCount;
    private Boolean isVip;
    private Boolean isHot;
    private Boolean isNew;
    private Boolean isRecommended;
    private String tags;
    private Long categoryId;
    private String categoryName;

    public static VideoDTO fromEntity(Video video) {
        VideoDTO dto = new VideoDTO();
        dto.setId(video.getId());
        dto.setTitle(video.getTitle());
        dto.setDescription(video.getDescription());
        dto.setCoverUrl(video.getCoverUrl());
        dto.setVideoUrl(video.getVideoUrl());
        dto.setTrailerUrl(video.getTrailerUrl());
        dto.setDirector(video.getDirector());
        dto.setCast(video.getCast());
        dto.setCountry(video.getCountry());
        dto.setReleaseDate(video.getReleaseDate());
        dto.setYear(video.getYear());
        dto.setDurationMinutes(video.getDurationMinutes());
        dto.setRating(video.getRating());
        dto.setRatingCount(video.getRatingCount());
        dto.setViewCount(video.getViewCount());
        dto.setType(video.getType());
        dto.setEpisodeCount(video.getEpisodeCount());
        dto.setIsVip(video.getIsVip());
        dto.setIsHot(video.getIsHot());
        dto.setIsNew(video.getIsNew());
        dto.setIsRecommended(video.getIsRecommended());
        dto.setTags(video.getTags());
        if (video.getCategory() != null) {
            dto.setCategoryId(video.getCategory().getId());
            dto.setCategoryName(video.getCategory().getName());
        }
        return dto;
    }
}
