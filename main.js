import "./style.css";
const productList = document.querySelector(".product-list");
const modal = document.querySelector("#default-modal");
const btnClose = document.querySelector("#btn-close");
const btnPannier = document.querySelector("#pannier");
const listCart = document.querySelector(".list-cart");
const total = document.querySelector(".total");
const compteur = document.querySelector(".compteur");

btnPannier.onclick = () => {
  modal.style.transform = "scale(1)";
};
btnClose.onclick = () => {
  modal.style.transform = "scale(0)";
};

class Cart {
  constructor() {
    this.products = [];
    this.total = 0;
    this.compteur = 0;
  }
  updateTotal() {
    total.innerHTML = `${this.total}$`;
  }
  updateCompteur() {
    compteur.innerHTML = `${this.compteur}`;
  }

  updateQuantity(id) {
    for (let product of this.products) {
      if (id == product.id) {
        product.quantity += 1;
      }
    }
  }
  isExistProduct(id) {
    let exist = false;
    for (let product of this.products) {
      if (id == product.id) {
        exist = true;
        break;
      }
    }
    return exist;
  }
  updateCount(p) {
    this.compteur += 1;
    this.updateCompteur();
    this.total += p;
    this.updateTotal();
  }
  // updateDecremQuantity(id){
  //   for(let product of this.products){
  //     if(id == product.id){
  //       product.quantity -= 1
  //     }
  //   }
  // }
  //product = new Product(this.name, this.price, this.id)
  add(product) {
    let p = false;
    for (let indexProduct of this.products) {
      if (indexProduct.id == product.id) {
        p = true;
        break;
      }
    }
    if (!p) {
      this.products.push(product);
    }
    // this.updateQuantity(product.id)
  }
  remove(id) {
    let newTabProd = [];
    for (let product of this.products) {
      if (id !== product.id) {
        newTabProd.push(product);
      }
      if (id == product.id) {
        // this.updateDecremQuantity(product.quantity)
        this.total -= product.price;
        this.updateTotal();
        this.compteur -= 1;
        this.updateCompteur();
      }
    }
    this.products = newTabProd;
  }
}
const pannier = new Cart();
// pannier.add(new Product("cc", 15))

class Product {
  constructor(name, price, url, quantity, id) {
    this.name = name;
    this.price = price;
    this.url = url;
    this.quantity = quantity;
    this.id = id;
  }
  insertToCart() {
    listCart.insertAdjacentHTML(
      "beforeend",
      `
        <div class="${
          "p" + this.id
        } cart-product flex justify-between items-center">
            <div class="flex gap-4">
            <img src="${
              this.url
            }" class="w-32 h-32 object-cover rounded-md" alt="" />
            <div class="flex flex-col gap-3">
                <span>${this.name}</span>
                <span>${this.price}$ X <span class="${"qte" + this.id}">${
        this.quantity
      }</span></span>
            </div>
            </div>
            <img src="trash-svgrepo-com.svg" class="${
              "delete-" + this.id
            } w-6 h-6 cursor-pointer" />
        </div>
        `
    );
  }
  render() {
    productList.insertAdjacentHTML(
      "beforeend",
      `
        <div class="product">
            <div class="relative overflow-hidden">
            <img src="${this.url}" class="p-img" alt="" />
            <div class="bg-linear absolute flex items-center gap-2 justify-end p-3 w-full">
                <span class="text-white text-sm ">Add to Cart</span>
                <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="${
                  "i-" + this.id
                } icon bg-white rounded-full transition-all p-3 hover:bg-slate-200"
                >
                <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                </svg>
            </div>
            </div>
            <div class="flex justify-between p-1">
                <div class="flex gap-1">
                  <img src="${this.url}" class="h-5 w-5 rounded-full" alt="" />
                  <div class="text-sm font-semibold">${this.name}</div>
                </div>
                <div class="flex items-center gap-1">
                  <img src="money-bag-svgrepo-com.svg" class="h-5 w-5" alt="" />
                  <div class="text-sm">$${
                    this.price
                  }</div>
                </div>
            </div>
        </div>
        `
    );
    const addToCart = document.querySelector(".i-" + this.id);
    addToCart.addEventListener("click", () => {
      // pannier.add(new Product(this.name, this.price, this.id)) equivalent anle eo ambany
      pannier.updateCount(this.price);
      if (pannier.isExistProduct(this.id)) {
      } else {
        pannier.add(this);
        this.insertToCart();
        document.querySelector(".delete-" + this.id).onclick = () => {
          document.querySelector(".p" + this.id).remove();
          pannier.remove(this.id);
          // pannier.updateDecremQuantity(this.id)
        };
      }
      pannier.updateQuantity(this.id);
      document.querySelector(".qte" + this.id).innerHTML = `${this.quantity}`;
    });
  }
}
const products = [
  new Product("Coco chanel", 100, "img2.jpg", 0, 1),
  new Product("SHEIN", 300, "img3.jpg", 0, 2),
  new Product("Elevate your style with YSL", 100, "img10.jpg", 0, 3),
  new Product("Create ur own style with Us", 450, "img11.jpg", 0, 4),
  new Product("Maki Madagascar", 150, "img14.jpg", 0, 5),
  new Product("Aigle d'Or", 200, "img5.jpg", 0, 6),
];
// const p = new Product("dj", 200);

for (let indexProduct of products) {
  indexProduct.render();
}
