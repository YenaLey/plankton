package plankton.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostDTO {

    private Long postId;
    private String title;
    private String content;
    private String image;
    private int level;
    private LocalDateTime createdAt;
    private Long eventId;

    @Builder
    public PostDTO(Long postId, String title, String content, String image, int level,
                   LocalDateTime createdAt, Long eventId) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.image = image;
        this.level = level;
        this.createdAt = createdAt;
        this.eventId = eventId;
    }
}
