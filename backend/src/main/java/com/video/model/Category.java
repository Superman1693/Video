package com.video.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "icon_url")
    private String iconUrl;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Video> videos;
}
