package plankton.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request object to create post")
public class PostRequest {
    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "eventId",
            description = "eventId",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "1")
    private String eventId;


    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "title",
            description = "title",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "공지글1")
    private String title;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "content",
            description = "content",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "메인 무대 전방 깔림 사고 주의")
    private String content;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "level",
            description = "level",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "0")
    private String level;
}
