package plankton.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatusService {

    private final WebClient webClient;

    @Value("${citydata.api.key}")
    private String apiKey;

    public String getCityData(String location, int startIndex, int endIndex) {
        String url = String.format(
                "http://openapi.seoul.go.kr:8088/%s/json/citydata/%d/%d/%s",
                apiKey,
                startIndex,
                endIndex,
                location
        );

        log.info(url);

        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}
