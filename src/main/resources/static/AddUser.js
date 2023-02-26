const FORM_USER_ADD = document.getElementById("form-user-add");

FORM_USER_ADD.addEventListener('submit', (e)=>{
    e.preventDefault();

    let roleList = getRoles(Array.from(FORM_USER_ADD.roles.selectedOptions).map(role => role.value));

    fetch('http://localhost:8888/api/admin/users', {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            name: FORM_USER_ADD.name.value,
            surname: FORM_USER_ADD.surname.value,
            age: FORM_USER_ADD.age.value,
            username: FORM_USER_ADD.username.value,
            password: FORM_USER_ADD.password.value,
            roles: roleList,
        })
    })
        .then(data => {
            const USER = [];
            USER.push(data);
            userList(USER);
        })
        .then(() => {
            ADMIN_TAB.click();})
})

function getRoles(role) {
    let roles = [];
    if (role.indexOf("ADMIN") >= 0) {
        roles.push({"id": 2});
    }
    return roles;
}