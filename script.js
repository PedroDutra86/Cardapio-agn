const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-model-btn")
const cartCounter = document.getElementById("cart-count")
const addresInput = document.getElementById("adress")
const addresWarn = document.getElementById("adress-warn")


// Abrir modal carrinho
cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex"
})

//Fechar quando clicar fora
cartModal.addEventListener("click", function(event) {
    if(event.target == cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})