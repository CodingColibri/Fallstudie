package Backend.Fallstudie.Modul;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModulRepository extends JpaRepository<Modul, Integer> {
    ;
}
