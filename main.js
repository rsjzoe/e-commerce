import "./style.css";
const productList = document.querySelector(".product-list");
const modal = document.querySelector("#default-modal");
const btnClose = document.querySelector("#btn-close");
const btnPannier = document.querySelector("#pannier");
const listCart = document.querySelector(".list-cart");
const total = document.querySelector(".total")

btnPannier.onclick = () => {
  modal.style.transform = "scale(1)";
};
btnClose.onclick = () => {
  modal.style.transform = "scale(0)";
};

class Cart {
  constructor() {
    this.products = [];
    this.total = 0
  }
  updateTotal(){
    total.innerHTML = `${this.total}$`
  }
  //product = new Product(this.name, this.price, this.id)
  add(product) {
    this.products.push(product);
    this.total += product.price
    this.updateTotal()
  }
  remove(id){
    let newTabProd = []
    for(let product of this.products){
        if(id !== product.id){
            newTabProd.push(product)
        }
        if(id == product.id){
            this.total -= product.price
            this.updateTotal()
        }
    }
    this.products = newTabProd
  }
}
const pannier = new Cart();
// pannier.add(new Product("cc", 15))

class Product {
  constructor(name, price, id) {
    this.name = name;
    this.price = price;
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
            <img src="login1.jpg" class="w-32 h-32" alt="" />
            <div class="flex flex-col gap-3">
                <span>${this.name}</span>
                <span>${this.price}$</span>
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
            <img src="img10.jpg" class="p-img" alt="" />
            <div class="bg-linear absolute flex justify-end p-3 w-full">
                <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="${"i-" + this.id} icon bg-white rounded-full p-3"
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
            <span>${this.name} et ${this.price}</span>
        </div>
        `
    );
    const addToCart = document.querySelector(".i-" + this.id);
    addToCart.addEventListener("click", () => {
      // pannier.add(new Product(this.name, this.price, this.id)) equivalent anle eo ambany
      pannier.add(this);
      this.insertToCart();
      document.querySelector(".delete-" + this.id).onclick = () => {
        document.querySelector(".p" + this.id).remove();
        pannier.remove(this.id)
      };

    });
  }
}
const products = [new Product("dj", 100, 1), new Product("zoe", 300, 2)];
// const p = new Product("dj", 200);

for (let indexProduct of products) {
  indexProduct.render();
}
