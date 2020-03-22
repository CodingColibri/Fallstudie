package Backend.Fallstudie.Kurs;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Kurs {
    @Id @GeneratedValue private Integer kur_id;//primary key
    private String kur_name;

}
