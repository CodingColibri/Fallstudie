package Backend.Fallstudie.Vorlesung;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VorlesungController {
    @Autowired
    private VorlesungService vorlesungservice;
}
