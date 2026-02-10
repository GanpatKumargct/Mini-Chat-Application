package com.chat.controller;

import com.chat.entity.Message;
import com.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "*")


public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public Message send(@RequestBody Map<String, String> request) {
        return messageService.save(request.get("content"));
    }


    @GetMapping
    public List<Message> getAll() {
        return messageService.getAll();
    }
}
