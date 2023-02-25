const FORM_USER_EDIT = document.getElementById("form-user-edit")

async function editModal(id) {
    fetch('http://localhost:8888/api/admin/users/' + id)
        .then(res => {
        res.json()
            .then(async user => {
                console.log(user);
                document.getElementById('idEdit').value = user.id;
                document.getElementById('nameEdit').value = user.name;
                document.getElementById('surnameEdit').value = user.surname;
                document.getElementById('ageEdit').value = user.age;
                document.getElementById('usernameEdit').value = user.username;
                document.getElementById('passwordEdit').value = user.password;
                document.getElementById('flag-user').setAttribute('selected', 'true');
                if (user.roles.length === 2) {
                   document.getElementById('flag-admin').setAttribute('selected', 'true');
                }
            })
    })
}

FORM_USER_EDIT.addEventListener('submit', async (e) => {
    e.preventDefault();

    let idValue = document.getElementById("idEdit").value;
    let nameValue = document.getElementById('nameEdit').value;
    let surnameValue = document.getElementById('surnameEdit').value;
    let ageValue = document.getElementById('ageEdit').value;
    let usernameValue = document.getElementById('usernameEdit').value;
    let passwordValue = document.getElementById('passwordEdit').value;
    let rolesValue = getEditRoles(Array.from(document.getElementById("rolesEdit").selectedOptions).map(role => role.value));


    await fetch('http://localhost:8888/api/admin/users', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idValue,
            name: nameValue,
            surname: surnameValue,
            age: ageValue,
            username: usernameValue,
            password: passwordValue,
            roles: rolesValue,
        })
    })
        .then(() => {
            document.getElementById("nav-admin-tab").click();
            userList();
            document.getElementById("button-edit-close").click();
        })
})

function getEditRoles(role) {
    let roles = [];
    // if (role.indexOf("USER") >= 0) {
    //     roles.push({"id": 1,
    //         "name": 'ROLE_USER'});
    // }
    if (role.indexOf("ADMIN") >= 0) {
        roles.push({"id": 2,
            "name": 'ROLE_ADMIN'});
    }
    return roles;
}
