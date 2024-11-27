package plankton.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import plankton.backend.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
