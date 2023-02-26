const USERS_TABLE = document.getElementById("table-users");
const ADMIN_TAB = document.getElementById("nav-admin-tab")
function userList() {
    fetch('http://localhost:8888/api/admin/users')
        .then((res) => res.json())
        .then(
            (users) => {
                if (users.length > 0) {

                    let temp = '';

                    users.forEach((user) => {
                        let roles = user.roles.map(role => " " + role.name.substring(5))
                        temp += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td>${roles}</td> 
                            <td>
                                <a type="button" class="btn btn-sm btn-info text-light"
                                data-bs-toggle="modal" data-bs-target="#modalEdit"
                                onclick="editModal(${user.id})">Edit</a>
                            </td>
                            <td>
                                <a type="button" class="btn btn-sm btn-danger"
                                data-bs-toggle="modal" data-bs-target="#modalDelete"
                                onclick="deleteModal(${user.id})">Delete</a>
                            </td>
                        </tr>`;
                    })
                    USERS_TABLE.innerHTML = temp;
                }
            }
        )
}

userList()