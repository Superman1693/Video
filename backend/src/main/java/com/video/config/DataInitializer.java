package com.video.config;

import com.video.model.Banner;
import com.video.model.Category;
import com.video.model.Video;
import com.video.repository.BannerRepository;
import com.video.repository.CategoryRepository;
import com.video.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final VideoRepository videoRepository;
    private final BannerRepository bannerRepository;

    @Override
    public void run(String... args) {
        log.info("Initializing sample data...");

        // Create categories
        List<Category> categories = Arrays.asList(
                createCategory("电影", "Movies", 1),
                createCategory("电视剧", "TV Series", 2),
                createCategory("综艺", "Variety Shows", 3),
                createCategory("动漫", "Anime", 4),
                createCategory("纪录片", "Documentary", 5),
                createCategory("体育", "Sports", 6)
        );
        categoryRepository.saveAll(categories);

        Category movieCat = categories.get(0);
        Category tvCat = categories.get(1);
        Category varietyCat = categories.get(2);
        Category animeCat = categories.get(3);
        Category docCat = categories.get(4);

        // Create sample videos
        List<Video> videos = Arrays.asList(
                // Movies
                createVideo("流浪地球2", "2023年中国科幻巨制，讲述人类为了拯救地球，建造巨型发动机，将地球推离太阳系的壮举。", Video.VideoType.MOVIE, movieCat, 2023, 173, 9.2, 2800000L, 98000000L, true, true, true, "https://picsum.photos/seed/movie1/400/225", "科幻,动作,冒险", "郭帆", "吴京,刘德华,李雪健", "中国"),
                createVideo("满江红", "南宋绍兴年间，岳飞死后四年，秦桧率兵来到军营，一个秘密在暗流涌动中被层层揭露。", Video.VideoType.MOVIE, movieCat, 2023, 159, 8.1, 1500000L, 45000000L, true, false, true, "https://picsum.photos/seed/movie2/400/225", "悬疑,历史,喜剧", "张艺谋", "沈腾,易烊千玺,张译", "中国"),
                createVideo("无名", "1940年代上海，一段隐秘的往事，关于信仰与牺牲的故事。", Video.VideoType.MOVIE, movieCat, 2023, 131, 8.3, 980000L, 22000000L, false, true, false, "https://picsum.photos/seed/movie3/400/225", "谍战,历史,悬疑", "程耳", "梁朝伟,王一博,周迅", "中国"),
                createVideo("消失的她", "一对夫妻在度假途中，丈夫声称妻子失踪，却引发了一系列蹊跷事件。", Video.VideoType.MOVIE, movieCat, 2023, 112, 7.8, 2100000L, 61000000L, true, true, false, "https://picsum.photos/seed/movie4/400/225", "悬疑,惊悚,犯罪", "崔睿,刘翔", "朱一龙,倪妮,文咏珊", "中国"),
                createVideo("封神第一部", "殷商末年，纣王暴政，武王伐纣，神魔大战，一段波澜壮阔的封神传说。", Video.VideoType.MOVIE, movieCat, 2023, 148, 7.9, 1800000L, 24000000L, false, true, true, "https://picsum.photos/seed/movie5/400/225", "奇幻,动作,历史", "乌尔善", "费翔,黄渤,于适", "中国"),
                createVideo("长安三万里", "盛唐时期，高适与李白的半生情谊，在战乱中各自的命运选择。", Video.VideoType.MOVIE, movieCat, 2023, 168, 8.2, 1200000L, 18000000L, false, false, true, "https://picsum.photos/seed/movie6/400/225", "动画,历史,剧情", "谢君伟,邹靖", "杨天翔,凌振赫,檀健次", "中国"),
                createVideo("奥本海默", "原子弹之父J·罗伯特·奥本海默的传奇一生。", Video.VideoType.MOVIE, movieCat, 2023, 180, 8.9, 3200000L, 55000000L, true, true, false, "https://picsum.photos/seed/movie7/400/225", "传记,历史,剧情", "克里斯托弗·诺兰", "基利安·墨菲,小罗伯特·唐尼,埃米莉·布朗特", "美国"),
                createVideo("芭比", "芭比和肯来到现实世界冒险，探索身份认同的奇幻故事。", Video.VideoType.MOVIE, movieCat, 2023, 114, 7.4, 1900000L, 42000000L, false, true, false, "https://picsum.photos/seed/movie8/400/225", "喜剧,奇幻,冒险", "葛蕾塔·葛韦格", "玛格特·罗比,瑞恩·高斯林", "美国"),

                // TV Series
                createVideoSeries("狂飙", "一名刑警与黑恶势力之间长达二十年的较量，揭示黑白两道之间的复杂关系。", Video.VideoType.TV_SERIES, tvCat, 2023, 45, 9.0, 3500000L, 120000000L, true, true, true, "https://picsum.photos/seed/tv1/400/225", "犯罪,剧情,悬疑", "徐纪周", "张译,李一桐,张颂文", "中国", 39),
                createVideoSeries("繁花", "上世纪90年代的上海，股市风云与儿女情长交织的商战传奇。", Video.VideoType.TV_SERIES, tvCat, 2023, 45, 8.8, 2800000L, 85000000L, true, true, false, "https://picsum.photos/seed/tv2/400/225", "剧情,年代,商战", "王家卫", "胡歌,马伊俐,唐嫣", "中国", 30),
                createVideoSeries("漫长的季节", "东北小城，三个老人共同追寻一桩陈年旧案的真相。", Video.VideoType.TV_SERIES, tvCat, 2023, 45, 9.4, 1800000L, 45000000L, false, true, false, "https://picsum.photos/seed/tv3/400/225", "悬疑,犯罪,剧情", "辛爽", "范伟,秦昊,陈明昊", "中国", 12),
                createVideoSeries("三体", "地球往事三部曲改编，人类与三体文明的宏大史诗。", Video.VideoType.TV_SERIES, tvCat, 2023, 45, 8.0, 2500000L, 78000000L, true, true, true, "https://picsum.photos/seed/tv4/400/225", "科幻,剧情", "杨磊", "张鲁一,于和伟,陈瑾", "中国", 30),
                createVideoSeries("庆余年2", "庆国少年范闲以现代灵魂行走在古代，朝堂风云，情义两难。", Video.VideoType.TV_SERIES, tvCat, 2024, 45, 8.6, 3100000L, 95000000L, true, true, true, "https://picsum.photos/seed/tv5/400/225", "古装,剧情,悬疑", "孙皓", "张若昀,李沁,陈道明", "中国", 36),
                createVideoSeries("黑暗荣耀", "一名遭受严重校园暴力的女性，精心策划复仇计划的韩剧。", Video.VideoType.TV_SERIES, tvCat, 2023, 45, 8.9, 4200000L, 88000000L, true, false, false, "https://picsum.photos/seed/tv6/400/225", "复仇,剧情,悬疑", "安吉镐", "宋慧乔,李度贤,林志妍", "韩国", 16),

                // Variety
                createVideoSeries("歌手·当打之年", "中国最顶级的歌手同台竞技，展现最真实的现场演唱实力。", Video.VideoType.VARIETY, varietyCat, 2023, 60, 8.5, 1500000L, 35000000L, false, true, false, "https://picsum.photos/seed/variety1/400/225", "音乐,竞技", "洪啸", "黄绮珊,苦艾乐队", "中国", 12),
                createVideoSeries("乘风2023", "女艺人齐聚一堂，为梦想拼搏的女团综艺。", Video.VideoType.VARIETY, varietyCat, 2023, 90, 8.2, 2000000L, 52000000L, false, false, true, "https://picsum.photos/seed/variety2/400/225", "选秀,音乐,竞技", "车澈", "宁静,张雨绮,陈好", "中国", 10),

                // Anime
                createVideoSeries("葬送的芙莉莲", "勇者一行打倒了魔王，精灵魔法使芙莉莲开始了漫长的旅途。", Video.VideoType.ANIME, animeCat, 2023, 24, 9.3, 1200000L, 28000000L, false, true, true, "https://picsum.photos/seed/anime1/400/225", "奇幻,冒险,治愈", "斋藤圭一郎", "", "日本", 28),
                createVideoSeries("咒术回战·涩谷事变", "咒术高专学生与特级咒灵的终极大战在涩谷展开。", Video.VideoType.ANIME, animeCat, 2023, 24, 9.1, 1800000L, 42000000L, true, true, false, "https://picsum.photos/seed/anime2/400/225", "热血,动作,奇幻", "朴性厚", "", "日本", 23),

                // Documentary
                createVideo("地球脉动III", "跟随摄像机镜头，深入探索地球上最神秘的角落，记录野生动物的精彩瞬间。", Video.VideoType.DOCUMENTARY, docCat, 2023, 55, 9.5, 850000L, 15000000L, false, false, true, "https://picsum.photos/seed/doc1/400/225", "自然,动物,探索", "BBC", "大卫·爱登堡", "英国")
        );
        videoRepository.saveAll(videos);

        // Create banners
        List<Banner> banners = Arrays.asList(
                createBanner("流浪地球2", "中国科幻巨制 震撼来袭", "https://picsum.photos/seed/banner1/1920/800", "/video/1", 1L, 1, "VIP独家", "#FFD700"),
                createBanner("狂飙", "年度最佳剧集 口碑炸裂", "https://picsum.photos/seed/banner2/1920/800", "/video/9", 9L, 2, "热播", "#FF4444"),
                createBanner("繁花", "王家卫执导 胡歌主演", "https://picsum.photos/seed/banner3/1920/800", "/video/10", 10L, 3, "大剧", "#4FC3F7"),
                createBanner("葬送的芙莉莲", "年度最佳动漫 治愈之旅", "https://picsum.photos/seed/banner4/1920/800", "/video/17", 17L, 4, "完结", "#66BB6A"),
                createBanner("奥本海默", "诺兰最新力作 奥斯卡大热", "https://picsum.photos/seed/banner5/1920/800", "/video/7", 7L, 5, "院线", "#AB47BC")
        );
        bannerRepository.saveAll(banners);

        log.info("Sample data initialized successfully! {} categories, {} videos, {} banners",
                categories.size(), videos.size(), banners.size());
    }

    private Category createCategory(String name, String nameEn, int sortOrder) {
        Category cat = new Category();
        cat.setName(name);
        cat.setNameEn(nameEn);
        cat.setSortOrder(sortOrder);
        return cat;
    }

    private Video createVideo(String title, String description, Video.VideoType type, Category category,
                               int year, int duration, double rating, long ratingCount, long viewCount,
                               boolean isVip, boolean isHot, boolean isNew, String coverUrl,
                               String tags, String director, String cast, String country) {
        Video video = new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setType(type);
        video.setCategory(category);
        video.setYear(year);
        video.setDurationMinutes(duration);
        video.setRating(rating);
        video.setRatingCount(ratingCount);
        video.setViewCount(viewCount);
        video.setIsVip(isVip);
        video.setIsHot(isHot);
        video.setIsNew(isNew);
        video.setIsRecommended(isHot);
        video.setCoverUrl(coverUrl);
        video.setTags(tags);
        video.setDirector(director);
        video.setCast(cast);
        video.setCountry(country);
        video.setVideoUrl("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
        video.setReleaseDate(LocalDate.of(year, 1, 1));
        return video;
    }

    private Video createVideoSeries(String title, String description, Video.VideoType type, Category category,
                                     int year, int duration, double rating, long ratingCount, long viewCount,
                                     boolean isVip, boolean isHot, boolean isNew, String coverUrl,
                                     String tags, String director, String cast, String country, int episodeCount) {
        Video video = createVideo(title, description, type, category, year, duration, rating, ratingCount,
                viewCount, isVip, isHot, isNew, coverUrl, tags, director, cast, country);
        video.setEpisodeCount(episodeCount);
        return video;
    }

    private Banner createBanner(String title, String subtitle, String imageUrl, String linkUrl,
                                 Long videoId, int sortOrder, String badgeText, String badgeColor) {
        Banner banner = new Banner();
        banner.setTitle(title);
        banner.setSubtitle(subtitle);
        banner.setImageUrl(imageUrl);
        banner.setLinkUrl(linkUrl);
        banner.setVideoId(videoId);
        banner.setSortOrder(sortOrder);
        banner.setIsActive(true);
        banner.setBadgeText(badgeText);
        banner.setBadgeColor(badgeColor);
        return banner;
    }
}
