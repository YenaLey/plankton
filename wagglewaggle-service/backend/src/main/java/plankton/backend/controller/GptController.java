package plankton.backend.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import plankton.backend.dto.response.SuccessResponse;
import plankton.backend.service.GptService;

import java.util.ArrayList;


@RestController
@Slf4j
@RequestMapping("/openai")
@RequiredArgsConstructor
public class GptController {

    private final GptService gptService;

    int count = 0;
    @GetMapping("")
    @Transactional
    @Operation(
            summary = "get Ai Response from Backend Server",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successful operation",
                            content = @Content(
                                    mediaType = "application/json",
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
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Bad credentials",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    )
            }
    )
    public ResponseEntity<?> getAiResponse(@RequestParam String query) throws InterruptedException {

        JsonArray jsonArray = gptService.listAssistants();
        String assistantId = null;

        for (JsonElement element : jsonArray) {
            JsonObject assistant = element.getAsJsonObject();
            if (assistant.has("name") && "plankton".equals(assistant.get("name").getAsString())) {
                log.info("already exist: {}", assistant.get("name").getAsString());
                assistantId = assistant.get("id").getAsString();
                log.info("assistantId: {}", assistantId);
                break;
            }
        }

        if (assistantId == null) {
            log.info("new");
            assistantId = gptService.getAssistantId("gpt-4o", "plankton");
        }

        String gptFeedback = response(query, assistantId);

        return ResponseEntity.ok().body(gptFeedback);
    }

    private String response(String content, String assistantId) throws InterruptedException {
        log.info("response 호출");
        String threadId = gptService.createThreadAndGetId();
        String messageId = gptService.createMessageAndGetId(threadId, content);
        String runId = gptService.createRun(threadId, assistantId);
        return gptService.getResponse(threadId, runId);
    }

    private String response(ArrayList<String> content, String assistantId) throws InterruptedException {
        log.info("content: {}", String.valueOf(content));

        String threadId = gptService.createThreadAndGetId();
        String messageId = gptService.createMessageAndGetId(threadId, String.valueOf(content));
        String runId = gptService.createRun(threadId, assistantId);
        return gptService.getResponse(threadId, runId);
    }

//    @PostMapping("/file")
//    @Transactional
//    @Operation(
//            summary = "get Ai Response from Backend Server",
//            responses = {
//                    @ApiResponse(
//                            responseCode = "200",
//                            description = "Successful operation",
//                            content = @Content(
//                                    mediaType = "application/json",
//                                    schema = @Schema(implementation = SuccessResponse.class)
//                            )
//                    ),
//                    @ApiResponse(
//                            responseCode = "400",
//                            description = "Bad request",
//                            content = @Content(
//                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
//                                    schema = @Schema(implementation = ErrorResponse.class)
//                            )
//                    ),
//                    @ApiResponse(
//                            responseCode = "401",
//                            description = "Bad credentials",
//                            content = @Content(
//                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
//                                    schema = @Schema(implementation = ErrorResponse.class)
//                            )
//                    )
//            }
//    )
//    public ResponseEntity<?> getAiResponse(@RequestParam String query) throws InterruptedException {
//
//        JsonArray jsonArray = gptService.listAssistants();
//        String assistantId = null;
//
//        for (JsonElement element : jsonArray) {
//            JsonObject assistant = element.getAsJsonObject();
//            if (assistant.has("name") && "plankton".equals(assistant.get("name").getAsString())) {
//                log.info("already exist: {}", assistant.get("name").getAsString());
//                assistantId = assistant.get("id").getAsString();
//                log.info("assistantId: {}", assistantId);
//                break;
//            }
//        }
//
//        if (assistantId == null) {
//            log.info("new");
//            assistantId = gptService.getAssistantId("gpt-4o", "plankton");
//        }
//
//        String gptFeedback = response(query, assistantId);
//
//        return ResponseEntity.ok().body(gptFeedback);
//    }
}
