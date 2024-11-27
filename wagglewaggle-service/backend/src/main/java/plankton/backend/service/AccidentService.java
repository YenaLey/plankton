package plankton.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import plankton.backend.dto.AccidentDTO;
import plankton.backend.entity.Accident;
import plankton.backend.entity.Event;
import plankton.backend.repository.AccidentRepository;
import plankton.backend.repository.EventRepository;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

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
                .longitude(accidentDTO.getLongitude())
                .latitude(accidentDTO.getLatitude())
                .title(accidentDTO.getTitle())
                .content(accidentDTO.getContent())
                .category(accidentDTO.getCategory())
                .img(accidentDTO.getImg()) // 바이트 배열로 이미지 저장
                .event(event)
                .build();

        accidentRepository.save(accident);
    }

    @Transactional(readOnly = true)
    public List<AccidentDTO> getAllAccidents() {
        return accidentRepository.findAll().stream()
                .map(accident -> AccidentDTO.builder()
                        .accidentId(accident.getAccidentId())
                        .longitude(accident.getLongitude())
                        .latitude(accident.getLatitude())
                        .title(accident.getTitle())
                        .content(accident.getContent())
                        .category(accident.getCategory())
                        .img(accident.getImg())
                        .eventId(accident.getEvent().getEventId())
                        .build())
                .collect(Collectors.toList());
    }
}
