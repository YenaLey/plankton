package plankton.backend.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@NoArgsConstructor
public class Accident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accidentId;

    private double longitude;  // 경도
    private double latitude;   // 위도

    private String title;

    @Lob
    private String content;

    private int category; // 0 또는 1

    @Lob
    private byte[] img;;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;

    @Builder
    public Accident(Long accidentId, double longitude, double latitude, String title,
                    String content, int category, byte[] img, Event event) {
        this.accidentId = accidentId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.title = title;
        this.content = content;
        this.category = category;
        this.img = img;
        this.event = event;
    }
}
