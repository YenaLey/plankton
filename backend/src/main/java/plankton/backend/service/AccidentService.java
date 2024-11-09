package plankton.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import plankton.backend.dto.AccidentDTO;
import plankton.backend.entity.Accident;
import plankton.backend.entity.Event;
import plankton.backend.repository.AccidentRepository;
import plankton.backend.repository.EventRepository;

@Service
public class AccidentService {

    private final AccidentRepository accidentRepository;
    private final EventRepository eventRepository;

    public AccidentService(AccidentRepository accidentRepository, EventRepository eventRepository) {
        this.accidentRepository = accidentRepository;
        this.eventRepository = eventRepository;
    }

    @Transactional
    public void createAccident(AccidentDTO accidentDTO) {
        Event event = eventRepository.findById(accidentDTO.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        Accident accident = Accident.builder()
                .title(accidentDTO.getTitle())
                .content(accidentDTO.getContent())
                .category(accidentDTO.getCategory())
                .img(accidentDTO.getImg())
                .event(event)
                .build();

        accidentRepository.save(accident);
    }
}
