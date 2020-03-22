package Backend.Fallstudie.Dozent;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Dozent {
    @Id @GeneratedValue private int doz_id; //primary key
    private String doz_first_name;
    private String doz_last_name;
    private String doz_email;
    private Integer mod_id;
}
