package com.chat.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class UserController {


    @GetMapping
    public String home(){
        return "Welcome to Home page.....!";
    }

    @GetMapping("/user")
    public String User(){

        return "Welcome user this for you.....$";
    }
}
