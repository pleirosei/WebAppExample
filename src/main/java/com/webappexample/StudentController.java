package com.webappexample;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by sean on 12/4/14.
 */
@Controller
public class StudentController {
    @RequestMapping("/home")
    public String home() {
        return "index";
    }
}
