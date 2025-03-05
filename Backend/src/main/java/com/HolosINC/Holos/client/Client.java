package com.HolosINC.Holos.client;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import com.HolosINC.Holos.model.BaseUser;

import lombok.Data;

@Data
@Entity
@Table(name = "clients")
public class Client{

    @Id
	@SequenceGenerator(name = "entity_seq", sequenceName = "entity_sequence", initialValue = 100)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entity_seq")
	protected Integer id;
  
    @OneToOne
    private BaseUser baseUser;
}
