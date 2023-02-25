package habsida.ygrit0s.springboot_security.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("login");
		registry.addViewController("/login").setViewName("login");
		registry.addViewController("/user/info").setViewName("user/info");
		registry.addViewController("/admin/users").setViewName("admin/users");

	}
}
