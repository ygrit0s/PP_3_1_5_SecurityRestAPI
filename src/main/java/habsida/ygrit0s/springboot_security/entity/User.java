package habsida.ygrit0s.springboot_security.entity;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "user")
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	@Size(max = 31)
	private String name;

	@Size(max = 31)
	private String surname;

	@Min(value = 0)
	@Max(value = 127)
	private Byte age;

	@Email
	@Column(name = "email", unique = true, nullable = false)
	private String username;

	@NotEmpty
	@Size(min = 4)
	private String password;

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinTable(
			name = "users_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id")
	)
	private Set<Role> roles;

	public User() {
	}

	public User(String name, String surname, Byte age, String username, String password, Set<Role> roles) {
		this.name = name;
		this.surname = surname;
		this.age = age;
		this.username = username;
		this.password = password;
		this.roles = roles;
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getSurname() {
		return surname;
	}
	
	public void setSurname(String surname) {
		this.surname = surname;
	}
	
	public Byte getAge() {
		return age;
	}
	
	public void setAge(Byte age) {
		this.age = age;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return getRoles();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String toString() {
		return  """
                
                User  [ ID =        %s,
                        Name =      %s,
                        Surname = 	%s,
                        Age =       %s,
                        Email = 	%s,
                        Password =	%s,
                        Roles =		%s ]
                """
				.formatted(id, name, surname, age, username, password, roles);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		User user = (User) o;
		return Objects.equals(id, user.id) && Objects.equals(name, user.name)
				&& Objects.equals(surname, user.username) && Objects.equals(age, user.age)
				&& Objects.equals(username, user.username) && Objects.equals(password, user.password)
				&& Objects.equals(roles, user.roles);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, surname, age, password, username, roles);
	}
}
