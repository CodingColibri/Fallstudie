package Backend.Fallstudie.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
@RequestMapping("/")
    public String sayHello(){
        return "<h1>Hello World</h1>";
    }
}
