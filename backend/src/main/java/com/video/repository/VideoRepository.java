package com.video.repository;

import com.video.model.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    List<Video> findByIsHotTrueOrderByViewCountDesc();

    List<Video> findByIsNewTrueOrderByReleaseDateDesc();

    List<Video> findByIsRecommendedTrueOrderByRatingDesc();

    List<Video> findByCategoryIdOrderByViewCountDesc(Long categoryId, Pageable pageable);

    List<Video> findByTypeOrderByViewCountDesc(Video.VideoType type, Pageable pageable);

    @Query("SELECT v FROM Video v WHERE v.title LIKE %:keyword% OR v.description LIKE %:keyword% OR v.cast LIKE %:keyword% OR v.director LIKE %:keyword% OR v.tags LIKE %:keyword%")
    Page<Video> searchVideos(@Param("keyword") String keyword, Pageable pageable);

    List<Video> findTop10ByOrderByRatingDesc();

    List<Video> findTop10ByOrderByViewCountDesc();

    @Query("SELECT v FROM Video v WHERE v.category.id = :categoryId AND v.id != :excludeId ORDER BY v.rating DESC")
    List<Video> findRelatedVideos(@Param("categoryId") Long categoryId, @Param("excludeId") Long excludeId, Pageable pageable);
}
