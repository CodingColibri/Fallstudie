package Backend.Fallstudie.Modul;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Modul {
    @Id @GeneratedValue private Integer mod_id;//primar key
    private String mod_name;
    private Integer mod_anzahlstd;

}
