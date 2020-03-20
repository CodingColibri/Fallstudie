package Backend.Fallstudie.Modul;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ModulController {
    @Autowired
    private ModulService modulservice;

}
