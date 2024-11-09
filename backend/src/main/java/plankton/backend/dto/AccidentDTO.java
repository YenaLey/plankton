package plankton.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AccidentDTO {

    private Long accidentId;
    private String title;
    private String content;
    private int category;
    private String img;
    private Long eventId;

    @Builder
    public AccidentDTO(Long accidentId, String title, String content, int category, String img, Long eventId) {
        this.accidentId = accidentId;
        this.title = title;
        this.content = content;
        this.category = category;
        this.img = img;
        this.eventId = eventId;
    }
}
