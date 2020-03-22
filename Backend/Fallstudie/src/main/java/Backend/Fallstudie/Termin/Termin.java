package Backend.Fallstudie.Termin;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Time;
import java.util.Date;

@Entity
public class Termin {
    @Id @GeneratedValue private Integer ter_id;
    private Integer mod_id;
    private Date ter_datum;
    private Time ter_start;
    private Time ter_ende;
}
