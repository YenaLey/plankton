package plankton.backend.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private String title;

    private String content;

    private String image;

    private int level; // 0: 1단계, 1: 2단계

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;

    @Builder
    public Post(Long postId, String title, String content, String image, int level,
                LocalDateTime createdAt, Event event) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.image = image;
        this.level = level;
        this.createdAt = createdAt;
        this.event = event;
    }
}