package plankton.backend;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import plankton.backend.entity.Event;
import plankton.backend.entity.Post;
import plankton.backend.repository.EventRepository;
import plankton.backend.repository.PostRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class EventInitializer {

    private final EventRepository eventRepository;
    private final PostRepository postRepository;

    public EventInitializer(EventRepository eventRepository, PostRepository postRepository) {
        this.eventRepository = eventRepository;
        this.postRepository = postRepository;
    }

    @PostConstruct
    public void init() {
        if (eventRepository.count() == 0) {
            // Create and save the Event
            Event event = Event.builder()
                    .eventName("여의도 불꽃축제")
                    .eventDate(LocalDate.of(2024, 11, 9))
                    .build();
            eventRepository.save(event);

            // Create and save associated Posts
            Post post1 = Post.builder()
                    .title("메인 무대 앞 시서물 점검중")
                    .content("메인 무대 앞에서 시설물 점검 중입니다. 보행에 유의하세요!")
                    .image("No_image")
                    .level(0)
                    .createdAt(LocalDateTime.now())
                    .event(event)
                    .build();

            Post post2 = Post.builder()
                    .title("불꽃놀이 일정")
                    .content("불꽃놀이는 오후 8시에 시작합니다.")
                    .image("No_image")
                    .level(0)
                    .createdAt(LocalDateTime.now())
                    .event(event)
                    .build();
            Post post3 = Post.builder()
                    .title("푸드트럭 앞 쪽에서 끼임 사고 발생!")
                    .content("푸드트럭 앞에서 안전 사고가 발생했습니다. 주의 바랍니다!!")
                    .image("No_image")
                    .level(1)
                    .createdAt(LocalDateTime.now())
                    .event(event)
                    .build();

            postRepository.save(post1);
            postRepository.save(post2);
            postRepository.save(post3);
        }
    }
}
