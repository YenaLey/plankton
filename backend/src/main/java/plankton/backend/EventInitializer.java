package plankton.backend;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import plankton.backend.entity.Event;
import plankton.backend.repository.EventRepository;

import java.time.LocalDate;

@Component
public class EventInitializer {

    private final EventRepository eventRepository;

    public EventInitializer(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @PostConstruct
    public void init() {
        if (eventRepository.count() == 0) {
            Event event = Event.builder()
                    .eventName("여의도 불꽃축제")
                    .eventDate(LocalDate.of(2024, 11, 9))
                    .build();
            eventRepository.save(event);
        }
    }
}

