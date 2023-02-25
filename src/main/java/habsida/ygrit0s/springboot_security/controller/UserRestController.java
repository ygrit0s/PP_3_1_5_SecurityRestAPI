package habsida.ygrit0s.springboot_security.controller;

import habsida.ygrit0s.springboot_security.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/info")
public class UserRestController {

	public UserRestController() {
	}

	@GetMapping()
	public User showUser(@AuthenticationPrincipal User user){
		return user;
	}
}


