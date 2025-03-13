package com.HolosINC.Holos.model;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.HolosINC.Holos.auth.Authorities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    private String imageProfile;

    @Column(name = "created_user")
    @NotNull
    protected Date createdUser;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "authority")
    Authorities authority;

    public Boolean hasAuthority(String auth) {
        return authority.getAuthority().equals(auth);
    }

    public Boolean hasAnyAuthority(String... authorities) {
        Boolean cond = false;
        for (String auth : authorities) {
            if (auth.equals(authority.getAuthority()))
                cond = true;
        }
        return cond;
    }
}
