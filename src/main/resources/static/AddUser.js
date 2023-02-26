const FORM_USER_ADD = document.getElementById("form-user-add");

FORM_USER_ADD.addEventListener('submit', (e)=>{
    e.preventDefault();

    let nameValue = document.getElementById('nameAdd').value;
    let surnameValue = document.getElementById('surnameAdd').value;
    let ageValue = document.getElementById('ageAdd').value;
    let usernameValue = document.getElementById('usernameAdd').value;
    let passwordValue = document.getElementById('passwordAdd').value;
    let rolesValue = getRoles(Array.from(document.getElementById("rolesAdd").selectedOptions).map(role => role.value));

    fetch('http://localhost:8888/api/admin/users', {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            name: nameValue,
            surname: surnameValue,
            age: ageValue,
            username: usernameValue,
            password: passwordValue,
            roles: rolesValue,
        })
    })
        .then(data => {
            const USER = [];
            USER.push(data);
            userList(USER);
        })
        .then(() => {
            document.getElementById("nav-admin-tab").click();})
})

function getRoles(role) {
    let roles = [];
    if (role.indexOf("ADMIN") >= 0) {
        roles.push({"id": 2});
    }
    return roles;
}