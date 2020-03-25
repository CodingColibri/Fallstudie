package Backend.Fallstudie.Semester;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Semester {
    @Id @GeneratedValue private Integer sem_id;//primary key
    private String sem_name;
}
