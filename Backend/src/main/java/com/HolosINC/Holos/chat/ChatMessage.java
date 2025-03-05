package com.HolosINC.Holos.chat;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Blob;
import java.time.LocalDateTime;

import com.HolosINC.Holos.model.BaseUser;

@Data
@Entity
@Table(name = "chat_messages")
public abstract class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime creationDate = LocalDateTime.now();

    private String text;

    @Lob
    private Blob image;

    @ManyToOne
    @JoinColumn(name = "from_user", nullable = false)
    private BaseUser fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user", nullable = false)
    private BaseUser toUser;

}
