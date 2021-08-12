const url = "http://localhost:3000/product";
let id = "";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((user) => {
      renderUsers(user);
      renderPro(user);
    });
  });

const tableUsers = document.querySelector("#listPro");
const renderUsers = (user) => {
  const output = `
  <option value="${user.cateId}">${user.cateId}</option>
		
      `;
  tableUsers.insertAdjacentHTML("beforeend", output);
};

const tablePro = document.querySelector("#detailPro");
const renderPro = (user) => {
  const output1 = `
  <div
  class="fillter col-3  text-center"
  
>
  <img class="card-img-top" src="${user.image}" alt="Card image cap" />
  <div class="card-body">
    <h5 class="card-title">${user.productName}</h5>
    <p class="card-text">${user.price} VND</p>
    <div class="card-body">
      <a
        href="detail.html?id=${user.id}"
        class="btn-edit btn btn-primary"
        target="_blank"
        >Chi tiết</a
      >
      <a href="#" class="btn btn-primary mt-2">Thêm vào giỏ hàng</a>
    </div>
  </div>
</div>
    `;
  tablePro.insertAdjacentHTML("beforeend", output1);
};
// chức năng lọc
document.querySelector("#listPro").addEventListener("change", function () {
  var id = document.querySelector("#listPro").value;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      var output = "";
      data.forEach((user) => {
        if (user.cateId == id) {
          output += `
      <img class="card-img-top" src="${user.image}" alt="Card image cap">
			<div class="card-body">
			  <h5 class="card-title">${user.productName}</h5>
			  <p class="card-text">${user.price} VND</p>
			  <div class="card-body ">
				<a href="detail.html?id=${user.id}" class="btn-edit btn btn-primary" target="_blank">Chi tiết</a>
				<a href="#" class="btn btn-primary mt-2">Thêm vào giỏ hàng</a>
			  </div>
			  
			</div>
      `;
        }
      });
      document.querySelector("#detailPro").innerHTML = output;
    });
});
// chức năng tìm kiếm
$(document).ready(function () {
  $("#search").on("keyup", function (event) {
    event.preventDefault();
    /* Act on the event */
    var tukhoa = $(this).val().toLowerCase();
    $("#detailPro .fillter").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(tukhoa) > -1);
    });
  });
});
