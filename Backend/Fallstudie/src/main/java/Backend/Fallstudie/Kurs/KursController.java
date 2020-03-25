package Backend.Fallstudie.Kurs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KursController {
    @Autowired
    private KursService kursservice;
}
