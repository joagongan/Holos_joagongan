package com.HolosINC.Holos.model;

import java.sql.Blob;
import java.sql.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class BaseUser extends BaseEntity {

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

    @Lob
    private Blob imageProfile;

    @Column(name = "created_user")
    @NotNull
    protected Date createdUser;
}
