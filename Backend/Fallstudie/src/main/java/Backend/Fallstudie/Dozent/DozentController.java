package Backend.Fallstudie.Dozent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DozentController {

    @Autowired
    private DozentService dozentservice;

}
