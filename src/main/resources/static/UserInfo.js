const USER_NAME = document.getElementById("header-username");
const USER_ROLE = document.getElementById("header-roles");
const USER_TABLE = document.getElementById("table-user");

function userInfo() {
    fetch('http://localhost:8888/api/user/info')
        .then((res) => res.json())
        .then((user) => {

            let roles = user.roles.map(role => " " + role.name.substring(5))

            USER_NAME.innerHTML = `${user.username}`;
            USER_ROLE.innerHTML = `${roles}`;
            USER_TABLE.innerHTML = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.age}</td>
                <td>${user.username}</td>
                <td>${roles}</td> 
            </tr>`;
        });
}
userInfo()