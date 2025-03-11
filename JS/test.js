import {
    fetchProducts,
    addProduct,
    removeProduct,
  } from "./productDataManage.js";
  
let uploadedImage = "";
const product = fetchProducts();
console.log("Product data:", product);








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


  let selectedCatogary = "Burgers";


  window.onload = function () {
 
    displayProductList(selectedCatogary);
  };
  

function displayProductList(catogary) {

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
      "custom-card-col",
      // "productCardCust"
    );
    // productTile.setAttribute("data-index", index);
   
    productTile.innerHTML = `

            <div class="card card-custom productCardCust" data-index="${index}"  >
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
  const dataDives = document.querySelectorAll('.dateDiv');
  const currentDate = new Date();
  dataDives.forEach(div => {
    const pElement = div.querySelector('p');
    const expDate = new Date(pElement.textContent.trim());

    if (expDate < currentDate) {
      pElement.classList.add('expired');
  }else{
    pElement.classList.add('not-expired');
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

  for (let i = 0; i < product[productCatogery].length; i++) {
    if (product[productCatogery][i].itemCode === productCode) {
      // console.log("ADD NEW", productCode, product[productCatogery][i].itemCode);
      removeProduct(i, productCatogery);
      displayProductList(selectedCatogary);
    }
  }

  const newProduct = {
    itemCode: productCode,
    name: productName,
    price: productPrice,
    discount: productDiscount,
    quantity: productQty,
    expiryDate: productExpDate,
    img: uploadedImage,
  };

  if (!product[productCatogery]) {
    product[productCatogery] = [];
  }

  selectedCatogary = productCatogery;
  
  addProduct(newProduct, selectedCatogary);
  updateProduct(
    newProduct,
    product[selectedCatogary].length - 1,
    selectedCatogary
  );


  // console.log(newProduct);
}



function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      uploadedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  console.log(uploadedImage);
}
document.getElementById("itemImg").addEventListener("change", previewImage);

function updateProduct(newProduct, index, catogary) {
  const dynamicProductTile = document.getElementById("productTile");
  console.log(index, catogary);

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
               <div class="card card-custom productCardCust" data-index="${index}"  >
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
                           <div class="dateDiv pt-2" data-index="${index}">
                                <p class="text-center fw-bold mb-0">${newProduct.expiryDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
    `;

    const dataDives = document.querySelectorAll('.dateDiv');
    const currentDate = new Date();
    // dataDives.forEach(div => {
      const pElement = div.querySelector('p');
      const expDate = new Date(pElement.textContent.trim());

      if (expDate < currentDate) {
        pElement.classList.add('expired');
    }else{
      pElement.classList.add('not-expired');
    }

 

  // Attach event listeners to the new icons
  const editIcon = productTile.querySelector(".fa-pencil-square-o");
  const deleteIcon = productTile.querySelector(".fa-trash-o");
  const shopIcon = productTile.querySelector(".fa-shopping-cart");



  editIcon.addEventListener("click", (evt) => {
    editProduct(index, catogary);
    // console.log("Edit action triggered for index:", index);
  });

  deleteIcon.addEventListener("click", (evt) => {
    removeProduct(index, catogary);
    displayProductList(catogary);
  });

  shopIcon.addEventListener("click", (evt) => {
    // console.log("Shop action triggered for index:", index);
    // Implement shop functionality
  });

  // Append the product tile to the DOM
  dynamicProductTile.appendChild(productTile);
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

  const myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
  myModal.show();
}












 // const imgFilePath =  productToEdit.img;
  // document.getElementById("imagePreview").src =imgFilePath;
  // document.getElementById("imagePreview").style.display = "block";
  // const filePath = imgFilePath;
  
  // const fileName = imgFilePath.split('/').pop(); // Extracts 'Paneer Burger.png'
  
  // console.log("file name" , fileName);

  // document.getElementById("itemImg").setAttribute("data-filename", fileName); // For reference
// document.getElementById("filenameField").value = fileName; // Display it in another input field

// document.getElementById("itemImg").value=fileName;
 


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
    
    fetchImageAsBase64(productToEdit.img).then((base64String) => {
        // After the Base64 conversion, log the result
        console.log("Converted Base64 String:", base64String);
        uploadedImage = base64String;
        console.log("imageeeee 1 ", uploadedImage);
      });
    
  
    document.getElementById("itemCategory").value = catogary;
    console.log("imageeeee", uploadedImage);
    const myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
    myModal.show();
  }
  
  
  async function fetchImageAsBase64(imagePath) {
  
    console.log("fetch ekat awa");
    
      const response = await fetch(imagePath); // Fetch the file from the server
      const blob = await response.blob(); // Convert it to a Blob object
      const reader = new FileReader();
  
      return new Promise((resolve, reject) => {
        reader.onloadend = function () {
          const base64String = reader.result; // Base64-encoded string
          resolve(base64String); // Resolve the promise with the base64 string
        };
        reader.onerror = function (error) {
          reject(error); // Reject if there's an error during reading
        };
        reader.readAsDataURL(blob); // Read the Blob as Base64
      });
    
  }
  
async function editProduct(index, catogary) {
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
  
    // Fetch the image as Base64 using async/await
    uploadedImage = await fetchImageAsBase64(productToEdit.img);  // Wait for the Base64 conversion to finish
    console.log("imageeeee 1", uploadedImage);  // This will log the Base64 image string
  
    // Now you can safely log the value of uploadedImage
    console.log("imageeeee", uploadedImage);  // This will also log after it's been updated
  
    document.getElementById("itemCategory").value = catogary;
  
    const myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
    myModal.show();
    console.log("edit eke antima" , uploadedImage);
    
  }
  
  async function fetchImageAsBase64(imagePath) {
    console.log("fetch ekat awa");
  
    const response = await fetch(imagePath); // Fetch the file from the server
    const blob = await response.blob(); // Convert it to a Blob object
    const reader = new FileReader();
  
    return new Promise((resolve, reject) => {
      reader.onloadend = function () {
        const base64String = reader.result; // Base64-encoded string
        resolve(base64String); // Resolve the promise with the base64 string
      };
      reader.onerror = function (error) {
        reject(error); // Reject if there's an error during reading
      };
      reader.readAsDataURL(blob); // Read the Blob as Base64
    });
    
   
   
  } 
  