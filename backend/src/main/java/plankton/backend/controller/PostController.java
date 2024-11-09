package plankton.backend.controller;

import jakarta.validation.Valid;
import org.jose4j.lang.JoseException;
import org.springframework.http.HttpStatus;
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
import org.springframework.beans.factory.annotation.Value;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private List<Subscription> subscriptions = new ArrayList<>(); // 메모리에 구독 정보 저장

    private String publicKey = "MYPUBLICKEY"; // ToDo

    private String privateKey = "MYPRIVATEKEY"; //ToDo

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{id}")
    @Transactional
    @Operation(summary = "Get a Post by ID", responses = {
            @ApiResponse(responseCode = "200", description = "Successful operation",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = PostDTO.class))),
            @ApiResponse(responseCode = "404", description = "Post not found",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        PostDTO postDto = postService.getPostById(id);
        return ResponseEntity.ok(postDto);
    }

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    @Operation(summary = "Create a new Post with image", responses = {
            @ApiResponse(responseCode = "201", description = "Post created successfully",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = SuccessResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> createPost(@Valid @ModelAttribute PostRequest postRequest,
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
                .image(imageName)
                .level(Integer.parseInt(postRequest.getLevel()))
                .createdAt(LocalDateTime.now())
                .eventId(Long.valueOf(postRequest.getEventId()))
                .build();

        postService.createPost(postDto);
        return ResponseEntity.status(201).body("Post created successfully");
    }

    @PostMapping("/save-subscription")
    public ResponseEntity<?> saveSubscription(@RequestBody Subscription subscription) {
        subscriptions.add(subscription);
        return ResponseEntity.status(200).body("Subscription saved.");
    }

    @PostMapping("/send-alert")
    public ResponseEntity<String> sendAlert() {
        String payload = "{ \"title\": \"긴급 공지사항\", \"content\": \"긴급 사고 발생으로 인해 해당 구역 접근을 제한합니다.\", \"url\": \"https://example.com/notice\" }";
        subscriptions.forEach(subscription -> sendPushNotification(subscription, payload));
        return new ResponseEntity<>("Notifications sent!", HttpStatus.OK);
    }

    private void sendPushNotification(Subscription subscription, String payload) {
        try {
            PushService pushService = new PushService(publicKey, privateKey);
            Notification notification = new Notification(subscription.getEndpoint(), subscription.getKeys().getP256dh(),
                    subscription.getKeys().getAuth(), payload);
            pushService.send(notification);
            System.out.println("Notification sent to: " + subscription.getEndpoint());
        } catch (GeneralSecurityException | IOException | JoseException | ExecutionException | InterruptedException e) {
            System.err.println("Notification error: " + e.getMessage());
        }
    }
}

// Subscription 클래스 (구독 정보 DTO)
class Subscription {
    private String endpoint;
    private Long expirationTime;
    private Keys keys;

    // Getters와 Setters
    public String getEndpoint() {
        return endpoint;
    }

    public Long getExpirationTime() {
        return expirationTime;
    }

    public Keys getKeys() {
        return keys;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public void setExpirationTime(Long expirationTime) {
        this.expirationTime = expirationTime;
    }

    public void setKeys(Keys keys) {
        this.keys = keys;
    }

    public static class Keys {
        private String p256dh;
        private String auth;

        public String getP256dh() {
            return p256dh;
        }

        public String getAuth() {
            return auth;
        }

        public void setP256dh(String p256dh) {
            this.p256dh = p256dh;
        }

        public void setAuth(String auth) {
            this.auth = auth;
        }
    }
}
