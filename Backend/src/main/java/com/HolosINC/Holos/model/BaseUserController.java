package com.HolosINC.Holos.model;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/baseUser")
@Tag(name = "Base User Controller", description = "The API for all users")
public class BaseUserController {

	private final BaseUserService baseUserService;

	@Autowired
	public BaseUserController(BaseUserService baseUserService) {
		this.baseUserService = baseUserService;
	}

	@PostMapping("/signin")
	public ResponseEntity<String> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		try{
			baseUserService.login(loginRequest.getUsername(), loginRequest.getPassword());
			return ResponseEntity.ok().build();
		}catch(BadCredentialsException exception){
			return ResponseEntity.badRequest().build();
		}
	}
}