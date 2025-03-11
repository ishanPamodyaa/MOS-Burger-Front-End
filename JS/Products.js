import {
  fetchProducts,
  addProduct,
  removeProduct,
} from "./productDataManage.js";

let uploadedImage = "";
const product = fetchProducts();
console.log("Product data:", product);

let selectedCatogary = "Burgers";

window.onload = function () {
  console.log(selectedCatogary);
  displayProductList(selectedCatogary);
};

// window.onload = async function () {
//   try {
//     if (!product) {
//       product = fetchProducts(); // Load product data
//     }
//     console.log("Products loaded:", product);
//     displayProductList(selectedCatogary);
//   } catch (error) {
//     console.error("Error loading products:", error);
//   }
// };

//when select product catogery default catogery is Burger
document
  .getElementById("burgers")
  .addEventListener("click", displayProductList.bind(null, "Burgers"));

document
  .getElementById("submarines")
  .addEventListener("click", displayProductList.bind(null, "Submarines"));

document
  .getElementById("fries")
  .addEventListener("click", displayProductList.bind(null, "Fries"));

document
  .getElementById("pasta")
  .addEventListener("click", displayProductList.bind(null, "Pasta"));

document
  .getElementById("chicken")
  .addEventListener("click", displayProductList.bind(null, "Chicken"));

document
  .getElementById("beverages")
  .addEventListener("click", displayProductList.bind(null, "Beverages"));

function displayProductList(catogary) {
  console.log("display ekata awa");

  selectedCatogary = catogary;

  console.log("Selected catogary:", selectedCatogary, catogary);

  // const selectedCatogarye = product[catogary];

  const dynamicProductTile = document.getElementById("productTile");
  dynamicProductTile.innerHTML = "";

  if (!selectedCatogary) return;

  product[catogary].forEach((item, index) => {
    const productTile = document.createElement("div");
    productTile.classList.add(
      "col",
      "col-sm",
      "col-md-4",
      "col-lg-3",
      "col-xl-2",
      "mt-3",
      "custom-card-col"
    );

    productTile.innerHTML = `

            <div class="card card-custom"  >
                    <div class="imgDiv">
                        <img src="${item.img}" class="card-img-top"
                            alt="${item.name}" cap">
                    </div>
                    <div class="card-body cardBody">
                        <div class="nameDiv">
                            <p class="productName">${item.name}</p>
                        </div>
                        <div class="priceDiv" >
                            <h5 class="price text-center fw-bold ">LKR ${item.price}</h5>
                        </div>
                        <div class="d-flex justify-content-sm-between flex-row ">
                            
   
                                <i class="fa fa-pencil-square-o fa-2x icon" data-index="${index}" data-action="edit" aria-hidden="true"></i>
                                <i class="fa fa-trash-o fa-2x icon" data-index="${index}" data-action="delete" aria-hidden="true"></i>
                                <i class="fa fa-shopping-cart fa-2x icon" data-index="${index}" data-action="shop" aria-hidden="true"></i>
                            </div>
                        <div class="dateDiv pt-2" data-index="${index}">
                                <p class="text-center fw-bold mb-0">${item.expiryDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
    `;

    dynamicProductTile.appendChild(productTile);
  });

  const dataDives = document.querySelectorAll(".dateDiv");
  const currentDate = new Date();
  dataDives.forEach((div) => {
    const pElement = div.querySelector("p");
    const expDate = new Date(pElement.textContent.trim());

    if (expDate < currentDate) {
      pElement.classList.add("expired");
    } else {
      pElement.classList.add("not-expired");
    }
  });

  document.querySelectorAll(".icon").forEach((icon) => {
    icon.addEventListener("click", (evt) => {
      const action = evt.target.dataset.action;
      const index = evt.target.dataset.index;

      if (action == "edit") {
        editProduct(index, catogary);
      } else if (action == "delete") {
        removeProduct(index, catogary);
        displayProductList(catogary);
      } else if (action == "shop") {
        //
      }
    });
  });
}

document
  .getElementById("addProductForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addNewProduct();
  });

function addNewProduct() {
  const productCode = document.getElementById("itemCode").value;
  const cat = document.getElementById("itemCategory");
  const productCatogery = cat.options[cat.selectedIndex].text;
  const productName = document.getElementById("itemName").value;
  const productPrice =
    parseFloat(document.getElementById("itemPrice").value) || 0;
  const productDiscount =
    parseFloat(document.getElementById("itemDiscount").value) || 0;
  const productQty = parseFloat(document.getElementById("itemQty").value) || 0;
  const productExpDate = document.getElementById("itemExpDate").value;
  const imageInput = document.getElementById("itemImg");
  const file = imageInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e){

        const arrayBuffer =e.target.result;
        const unit8Array = new Uint8Array(arrayBuffer);
        const byteArray = Array.from(unit8Array);


  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "productId": productName,
    "productType": productCatogery,
    "productName": productName,
    "price": productPrice,
    "discount": productDiscount,
    "qtyInHand": productQty,
    "productImage":byteArray ,
    "expireDate": productExpDate,
    "orderIds": []
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8080/product/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

};

reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
} else {
  console.error("No image selected!");
}


}

function previewImage(event) {
  const file = event.target.files[0];
  console.log("file ekaaaa", file);

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      uploadedImage = e.target.result;
      console.log("e.target.result;", e.target.result);
      console.log("uploadedImage", uploadedImage);
    };
    reader.readAsDataURL(file);
  }
  console.log(uploadedImage);
}
document.getElementById("itemImg").addEventListener("change", previewImage);

function updateProduct(newProduct, index, catogary) {
  const dynamicProductTile = document.getElementById("productTile");
  console.log("update eka atule", index, catogary);

  const productTile = document.createElement("div");
  productTile.classList.add(
    "col",
    "col-sm",
    "col-md-4",
    "col-lg-3",
    "col-xl-2",
    "mt-3",
    "custom-card-col"
  );
  console.log("img seen", newProduct.img);

  productTile.innerHTML = `

<div class="card card-custom" >
        <div class="imgDiv">
            <img src="${newProduct.img}" class="card-img-top"
                alt="${newProduct.name}" cap">
        </div>
        <div class="card-body cardBody">
            <div class="nameDiv">
                <p class="productName">${newProduct.name}</p>
            </div>
            <div class="priceDiv" >
                <h5 class="price text-center fw-bold ">LKR ${newProduct.price}</h5>
            </div>
            <div class="d-flex justify-content-sm-between flex-row ">
                

                    <i class="fa fa-pencil-square-o fa-2x icon" data-index="${index}" data-action="edit" aria-hidden="true"></i>
                    <i class="fa fa-trash-o fa-2x icon" data-index="${index}" data-action="delete" aria-hidden="true"></i>
                    <i class="fa fa-shopping-cart fa-2x icon" data-index="${index}" data-action="shop" aria-hidden="true"></i>
                </div>

            </div>
        </div>
    </div>
`;

  // Attach event listeners to the new icons
  console.log("methana p1");

  const editIcon = productTile.querySelector(".fa-pencil-square-o");
  const deleteIcon = productTile.querySelector(".fa-trash-o");
  const shopIcon = productTile.querySelector(".fa-shopping-cart");

  console.log("methana p2");

  editIcon.addEventListener("click", (evt) => {
    editProduct(index, catogary);
    console.log("Edit eken passe");
  });

  deleteIcon.addEventListener("click", (evt) => {
    removeProduct(index, catogary);
    displayProductList(catogary);
  });

  shopIcon.addEventListener("click", (evt) => {
    // console.log("Shop action triggered for index:", index);
    // Implement shop functionality
  });
  console.log("methana p3");

  // Append the product tile to the DOM
  dynamicProductTile.appendChild(productTile);
  console.log("methana p4");
}

function editProduct(index, catogary) {
  // Ensure category is selected and product array exists
  console.log("edit product ", index, catogary);

  if (!product[catogary]) {
    console.error("Category or product data is not defined");
    return;
  }

  const productToEdit = product[catogary][index];

  if (!productToEdit) {
    console.error("Invalid product index:", index);
    return;
  }
  console.log("image eekaa ", productToEdit.img);

  // Populate form fields with the selected product's data
  document.getElementById("itemCode").value = productToEdit.itemCode;
  document.getElementById("itemName").value = productToEdit.name;
  document.getElementById("itemPrice").value = productToEdit.price;
  document.getElementById("itemDiscount").value = productToEdit.discount;
  document.getElementById("itemQty").value = productToEdit.quantity;
  document.getElementById("itemExpDate").value = productToEdit.expiryDate;

  document.getElementById("imagePreview").src = productToEdit.img;
  document.getElementById("imagePreview").style.display = "block";

  document.getElementById("itemCategory").value = catogary;
  console.log("imageeeee", uploadedImage);
  const myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
  myModal.show();
}
