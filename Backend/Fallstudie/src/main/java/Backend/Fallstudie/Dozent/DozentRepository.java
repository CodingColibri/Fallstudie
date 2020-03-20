package Backend.Fallstudie.Dozent;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface DozentRepository extends JpaRepository<Dozent, Integer> {
    ;
}
