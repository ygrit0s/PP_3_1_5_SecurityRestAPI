package habsida.ygrit0s.springboot_security.service;

import habsida.ygrit0s.springboot_security.entity.Role;
import habsida.ygrit0s.springboot_security.entity.User;
import habsida.ygrit0s.springboot_security.repository.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;

@Service
@Transactional
public class UserService implements UserDetailsService {

	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public List<User> userList() {
		return userRepository.findAll();
	}

	public User getUser(Long id) {
		var user = userRepository.findById(id);
		if (user.isEmpty()) {
			throw new UsernameNotFoundException(String.format("User with id %s not found", id));
		} else {
			return user.get();
		}
	}

	public boolean addUser(User user) {
		if (getByUsername(user.getUsername()) != null) {
			return false;
		}
		updateUser(user);
		return true;
	}

	public void updateUser(User user) {
		user.getRoles().add(new Role(1L,"ROLE_USER"));
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}


	public boolean removeUser(Long id, Principal principal) {
		if (id.equals(getByUsername(principal.getName()).getId())) {
			return false;
		}
		userRepository.deleteById(id);
		return true;
	}

	public User getByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = getByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("User with email '%s' not found", username));
		} else {
			return user;
		}
	}
}
