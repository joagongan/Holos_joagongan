package com.HolosINC.Holos.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HolosINC.Holos.configuration.jwt.JwtUtils;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/v1/baseUser")
@Tag(name = "Base User Controller", description = "The API for all users")
public class BaseUserController {

	@SuppressWarnings("unused")
	private final AuthenticationManager authenticationManager;
	@SuppressWarnings("unused")
	private final JwtUtils jwtUtils;
	// private final BaseUserService baseUserService;

	@Autowired
	public BaseUserController(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
		// this.baseUserService = baseUserService;
		this.authenticationManager = authenticationManager;
		this.jwtUtils = jwtUtils;
	}
}