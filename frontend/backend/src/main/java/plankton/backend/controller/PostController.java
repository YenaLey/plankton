package plankton.backend.controller;

import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.web.multipart.MultipartFile;
import plankton.backend.dto.PostDTO;
import plankton.backend.dto.request.PostRequest;
import plankton.backend.dto.response.SuccessResponse;
import plankton.backend.service.PostService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{id}")
    @Transactional
    @Operation(
            summary = "Get a Post by ID",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successful operation",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = PostDTO.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Post not found",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    )
            }
    )
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        PostDTO postDto = postService.getPostById(id);
        return ResponseEntity.ok(postDto);
    }


    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    @Operation(
            summary = "Create a new Post with image",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Post created successfully",
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
    public ResponseEntity<?> createPost(
            @Valid @ModelAttribute PostRequest postRequest,
            @RequestParam("image") MultipartFile image) throws IOException {

        // 이미지 처리
        String imageName = null;
        if (!image.isEmpty()) {
            imageName = image.getOriginalFilename();
            Path imagePath = Paths.get("src/main/resources/static/" + imageName);
            Files.createDirectories(imagePath.getParent());
            image.transferTo(imagePath.toFile());
        }

        // Post 생성
        PostDTO postDto = PostDTO.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .image(imageName)  // 저장한 이미지 이름만 설정
                .level(Integer.parseInt(postRequest.getLevel()))
                .createdAt(LocalDateTime.now())
                .eventId(Long.valueOf(postRequest.getEventId()))
                .build();

        postService.createPost(postDto);
        return ResponseEntity.status(201).body("Post created successfully");
    }
}
