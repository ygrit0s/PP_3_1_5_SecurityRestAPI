const FORM_USER_DEL = document.getElementById("form-user-delete")
function deleteModal(id) {
    fetch('http://localhost:8888/api/admin/users/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json()
            .then(user => {
                FORM_USER_DEL.id.value = user.id;
                FORM_USER_DEL.name.value = user.name;
                FORM_USER_DEL.surname.value = user.surname;
                FORM_USER_DEL.age.value = user.age;
                FORM_USER_DEL.username.value = user.username;
            })
    })
}

async function deleteUser() {
    await fetch('http://localhost:8888/api/admin/users/' + FORM_USER_DEL.id.value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(FORM_USER_DEL.id.value)
        })
        .then(() => {
            ADMIN_TAB.click();
            userList();
            FORM_USER_DEL.close.click();})
}
