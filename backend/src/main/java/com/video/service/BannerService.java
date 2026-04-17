package com.video.service;

import com.video.model.Banner;
import com.video.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    public List<Banner> getActiveBanners() {
        return bannerRepository.findByIsActiveTrueOrderBySortOrderAsc();
    }
}
