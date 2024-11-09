package plankton.backend.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Accident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accidentId;

    private String title;

    private String content;

    private int category; // 0 또는 1

    private String img;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;

    @Builder
    public Accident(Long accidentId, String title, String content, int category, String img, Event event) {
        this.accidentId = accidentId;
        this.title = title;
        this.content = content;
        this.category = category;
        this.img = img;
        this.event = event;
    }
}
