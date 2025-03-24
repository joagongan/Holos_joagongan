package com.HolosINC.Holos.model;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HolosINC.Holos.exceptions.ResourceNotFoundException;


@Service
public class BaseUserService {
    private BaseUserRepository baseUserRepository;

	@Autowired
	public BaseUserService(BaseUserRepository baseUserRepository) {
		this.baseUserRepository = baseUserRepository;
	}

    public BaseUser save(BaseUser baseUser) {
        return baseUserRepository.save(baseUser);
    }

    public BaseUser login(String username, String password) {
        Optional<BaseUser> user = baseUserRepository.login(username, password);
        if (user.isEmpty()) {
            throw new BadCredentialsException("Invalid username or password");
        }
        return user.get();
    }

    public Boolean existsUser(String username) {
        return baseUserRepository.findUserByUsername(username).isPresent();
    }

    public BaseUser findById(Long id) {
        return baseUserRepository.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public BaseUser findCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null)
            throw new ResourceNotFoundException("No estás logeado");

        return baseUserRepository.findUserByUsername(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", auth.getName()));
    }
    
    @Transactional
    public BaseUser delete(Long id) {
        BaseUser user = baseUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        baseUserRepository.delete(user);
        return user;
    }
}
