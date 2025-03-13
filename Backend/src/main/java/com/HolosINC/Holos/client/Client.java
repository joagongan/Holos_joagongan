package com.HolosINC.Holos.client;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import com.HolosINC.Holos.model.BaseUser;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "clients")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@EqualsAndHashCode(callSuper = true)
public class Client extends BaseUser{
}
