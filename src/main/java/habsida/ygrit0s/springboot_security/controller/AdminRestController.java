package habsida.ygrit0s.springboot_security.controller;

import habsida.ygrit0s.springboot_security.entity.*;
import habsida.ygrit0s.springboot_security.service.*;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminRestController {

	private final UserService userService;

	public AdminRestController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping()
	public List<User> userList() {
		return userService.userList();
	}

	@GetMapping("/{id}")
	public User getUser(@PathVariable("id") long id) {
		return userService.getUser(id);
	}

	@PutMapping()
	public String updateUser(@RequestBody User user) {
		userService.updateUser(user);
		return "User was successfully added/edited";
	}

	@DeleteMapping("/{id}")
	public String removeUser(@PathVariable("id") long id, Principal principal) {
		userService.removeUser(id, principal);
		return "User with ID = " + id + "was successfully removed";
	}
}


