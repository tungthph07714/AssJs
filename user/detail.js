const url = "http://localhost:3000/product";
const urlParams = new URL(document.URL);
var id = urlParams.searchParams.get("id");

fetch(`${url}/${id}`)
  .then((res) => res.json())
  .then((user) => {
    
      renderUsers(user);
    
  });

const tableUsers = document.querySelector("#detail");
const renderUsers = (user) => {
  const output = `
    <tr>
                <td>${user.productName}</td>
                <td>${user.productDesc}</td>
                <td>${user.price}</td>
                <td>
                <img src="${user.image}" alt="">
                </td>
                <td>${user.cateId} </td>
                
            </tr>
    `;
  tableUsers.insertAdjacentHTML("beforeend", output);
};
