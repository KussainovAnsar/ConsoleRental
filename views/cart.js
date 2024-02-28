let cart = [];
const cartIcon = document.getElementById("cartIcn");

console.log("works");
const greenCircle = document.createElement("div");

cartIcon.style.position = "relative";
greenCircle.style.width = "10px";
greenCircle.style.height = "10px";
greenCircle.style.background = "green";
greenCircle.style.borderRadius = "100%";
greenCircle.style.position = "absolute";
greenCircle.style.top = "10px";
greenCircle.style.right = "3px";

function updateGreenCircle() {
    if (cart.length > 0) {
      cartIcon.appendChild(greenCircle);
    } else {
      greenCircle.remove();
    }
  }
  
  updateGreenCircle();

function addToCart(product) {
  const existingProduct = cart.find((p) => p.name === product.name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    const newProduct = {
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    };
    cart.push(newProduct);
  }

  updateCart();
  updateGreenCircle(); 

}

function addToCartFromCart(index) {
  const product = cart[index];

  product.quantity++;



  updateCart();
  updateGreenCircle(); 

}
function clearCart() {
    cart = [];
    updateCart();
    updateGreenCircle();
  }
  
  document.getElementById('orderButton').addEventListener('click', function() {
    alert('The order has been accepted. Our operators will contact you within 15 minutes at the number you specified during registration. Please be patient!');
    clearCart(); 
    $('#cart').modal('hide');
});


function updateCart() {
    const cartTable = document.getElementById("cart-table");
  
    cartTable.innerHTML = "";
  
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
  
      const row = document.createElement("tr");
      const itemId = `item-${i}`;
      row.innerHTML = `
        <td>${i + 1}</td>
        <td><img src="${product.image}" alt="${product.name}" width="50"></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>
          <button class="minus-button" onclick="removeFromCart(${i})">-</button>
          <button class="plus-button" onclick="addToCartFromCart(${i})">+</button>
        </td>
        <td><button onclick="deleteItem(${i})">Remove</button></td>
      `;
  
      cartTable.appendChild(row);
    }
  
    const price = cart.reduce((accumulator, cartItem) => {
      const numbersOnly = cartItem.price.replace(/[^0-9]/g, '');
      const result = parseInt(numbersOnly, 10);
      return accumulator + result * cartItem.quantity;
    }, 0);
  
    const totalPriceElement = document.getElementById("total");
    totalPriceElement.innerHTML = price;
  }
  
  function removeFromCart(index) {
    const product = cart[index];
  
    if (product.quantity > 1) {
      product.quantity--;
      const numbersOnly = product.price.replace(/[^0-9]/g, '');
      const price = parseInt(numbersOnly, 10);
    } else {
      cart.splice(index, 1);
    }
  
    updateCart();
    updateGreenCircle(); 

  }
  
  function deleteItem(index) {
    cart.splice(index, 1);
    updateCart();
    updateGreenCircle(); 
  }

document.querySelectorAll(".add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        name: button.getAttribute("data-product-name"),
        image: button.getAttribute("data-product-image"),
        price: button.getAttribute("data-product-price")
      };
      addToCart(product);
    });
  });