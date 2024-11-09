package plankton.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import plankton.backend.entity.Accident;

@Repository
public interface AccidentRepository extends JpaRepository<Accident, Long> {
}
