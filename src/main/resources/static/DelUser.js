function deleteModal(id) {
    fetch('http://localhost:8888/api/admin/users/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json()
            .then(user => {
                document.getElementById('idDel').value = user.id;
                document.getElementById('nameDel').value = user.name;
                document.getElementById('surnameDel').value = user.surname;
                document.getElementById('ageDel').value = user.age;
                document.getElementById('usernameDel').value = user.username;
            })
    })
}

async function deleteUser() {
    await fetch('http://localhost:8888/api/admin/users/' + document.getElementById('idDel').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(document.getElementById('idDel').value)
        })
        .then(() => {
            document.getElementById("nav-admin-tab").click();
            userList();
            document.getElementById("closeDeleteModal").click();})
}
