package Backend.Fallstudie.Dozent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DozentService {
    @Autowired
    private DozentRepository dozentrepository;
}
