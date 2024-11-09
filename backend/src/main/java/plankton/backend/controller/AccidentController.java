package plankton.backend.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import plankton.backend.dto.AccidentDTO;
import plankton.backend.dto.response.SuccessResponse;
import plankton.backend.service.AccidentService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/accidents")
public class AccidentController {

    private final AccidentService accidentService;

    public AccidentController(AccidentService accidentService) {
        this.accidentService = accidentService;
    }

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    @Operation(
            summary = "Create a new Accident with image",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Accident created successfully",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = SuccessResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Bad request",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    )
            }
    )
    public ResponseEntity<?> createAccident(
            @RequestParam("longitude") double longitude,
            @RequestParam("latitude") double latitude,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("category") int category,
            @RequestParam("img") MultipartFile img) throws IOException {

        // 이미지 처리
        String imgName = null;
        if (!img.isEmpty()) {
            imgName = img.getOriginalFilename();
            Path imgPath = Paths.get("src/main/resources/static/" + imgName);
            Files.createDirectories(imgPath.getParent());
            img.transferTo(imgPath.toFile());
        }

        // Accident 생성
        AccidentDTO accidentDTO = AccidentDTO.builder()
                .longitude(longitude)
                .latitude(latitude)
                .title(title)
                .content(content)
                .category(category)
                .img(imgName) // 저장한 이미지 이름만 설정
                .build();

        accidentService.createAccident(accidentDTO);
        return ResponseEntity.status(201).body("Accident created successfully");
    }

    @GetMapping("/")
    @Operation(
            summary = "Get all Accidents",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successful retrieval of all accidents",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = AccidentDTO.class)
                            )
                    )
            }
    )
    public ResponseEntity<List<AccidentDTO>> getAllAccidents() {
        List<AccidentDTO> accidents = accidentService.getAllAccidents();
        return ResponseEntity.ok(accidents);
    }
}
