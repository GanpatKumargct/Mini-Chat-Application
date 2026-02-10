package com.chat.service;

import com.chat.entity.Message;
import com.chat.entity.User;
import com.chat.repository.MessageRepository;
import com.chat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Message save(String content) {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();

        User sender = userRepository.findByEmail(email).orElseThrow();

        Message message = new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setTimestamp(LocalDateTime.now());

        return messageRepository.save(message);
    }


    public List<Message> getAll() {
        return messageRepository.findAll();
    }
}
