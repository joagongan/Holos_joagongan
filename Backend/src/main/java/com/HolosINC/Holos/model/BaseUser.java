package com.HolosINC.Holos.model;

import java.sql.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
public class BaseUser {

    @Id
	@SequenceGenerator(name = "entity_seq", sequenceName = "entity_sequence", initialValue = 100)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entity_seq")
	protected Integer id;

    @Size(min = 2, max = 255)
    @Column(name = "first_name")
	@NotNull
	protected String name;
    
    @Size(min = 2, max = 255)
    @Column(unique = true)
	protected String username;

    @Size(min = 2, max = 255)
	protected String password;

    @Size(max = 255)
    @Column(unique = true)
    @NotNull
    protected String email;

    @Size(max = 15)
    @Column(name = "phone_number")
    protected String phoneNumber;

    @Size(max = 255)
    @Column(name = "image_profile")
    protected String imageProfile;

    @Column(name = "created_user")
    @NotNull
    protected Date createdUser;
}
