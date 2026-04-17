package com.video.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "videos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "cover_url")
    private String coverUrl;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "trailer_url")
    private String trailerUrl;

    private String director;

    @Column(columnDefinition = "TEXT", name = "cast_list")
    private String cast;

    private String country;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "release_year")
    private Integer year;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    private Double rating;

    @Column(name = "rating_count")
    private Long ratingCount;

    @Column(name = "view_count")
    private Long viewCount;

    @Enumerated(EnumType.STRING)
    private VideoType type;

    @Column(name = "episode_count")
    private Integer episodeCount;

    @Column(name = "is_vip")
    private Boolean isVip;

    @Column(name = "is_hot")
    private Boolean isHot;

    @Column(name = "is_new")
    private Boolean isNew;

    @Column(name = "is_recommended")
    private Boolean isRecommended;

    private String tags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public enum VideoType {
        MOVIE, TV_SERIES, ANIME, VARIETY, DOCUMENTARY
    }
}
