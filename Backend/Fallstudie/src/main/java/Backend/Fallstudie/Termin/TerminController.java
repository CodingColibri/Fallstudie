package Backend.Fallstudie.Termin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TerminController {
    @Autowired
    private TerminService terminservice;
}
