package Backend.Fallstudie.Vorlesung;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Vorlesung {
    @Id @GeneratedValue private Integer mod_id;
    private Date ter_datum;
    private Integer vor_terminanzahl;
    private Integer ter_id;

}
