const FORM_USER_EDIT = document.getElementById("form-user-edit")

async function editModal(id) {
    fetch('http://localhost:8888/api/admin/users/' + id)
        .then(res => {
        res.json()
            .then(async user => {
                console.log(user);
                FORM_USER_EDIT.id.value = user.id;
                FORM_USER_EDIT.name.value = user.name;
                FORM_USER_EDIT.surname.value = user.surname;
                FORM_USER_EDIT.age.value = user.age;
                FORM_USER_EDIT.username.value = user.username;
                FORM_USER_EDIT.password.value = user.password;
                FORM_USER_EDIT.roles.option[1].setAttribute('selected', 'true');
                if (user.roles.length === 2) {
                   FORM_USER_EDIT.roles.option[2].setAttribute('selected', 'true');
                }
            })
    })
}

FORM_USER_EDIT.addEventListener('submit', async (e) => {
    e.preventDefault();

    let roleList = getEditRoles(Array.from(FORM_USER_EDIT.roles.selectedOptions).map(role => role.value));


    await fetch('http://localhost:8888/api/admin/users', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: FORM_USER_EDIT.id.value,
            name: FORM_USER_EDIT.name.value,
            surname: FORM_USER_EDIT.surname.value,
            age: FORM_USER_EDIT.age.value,
            username: FORM_USER_EDIT.username.value,
            password: FORM_USER_EDIT.password.value,
            roles: roleList,
        })
    })
        .then(() => {
            ADMIN_TAB.click();
            userList();
            FORM_USER_EDIT.close.click();
        })
})

function getEditRoles(role) {
    let roles = [];
    if (role.indexOf("ADMIN") >= 0) {
        roles.push({"id": 2, "name": 'ROLE_ADMIN'});
    }
    return roles;
}
