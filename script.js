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

let cart = [];


// Abrir modal carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
})

// //Fechar quando clicar fora
cartModal.addEventListener("click", function(event) {
    if(event.target == cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event) {
    // console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")


    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

//Adicionar no carrinho
        addToCart(name, price)
    }
})


// //Funcao para adicionar no carrinho

function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)
    

    if(existingItem){
        // Se o item ja existe, aumenta apenas a quantidade
        existingItem.quantity += 1;
    } else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal();

}


//Atualiza carrinho

function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div> 
                <p class="font-bold">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                <hr> <hr> 
            </div>


            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
        </div>
    `

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;

}


// Função para remover o item do carrinho

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();

    }
}


addresInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addresInput.classList.remove("border-red-500")
        addresWarn.classList.add("hidden")
    }

})


// Finalizar pedido
checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        
        Toastify({
            text: "Ops, o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
        }).showToast();
        
        return;
    }

    if(cart.length === 0 )return;

    if(addresInput.value === ""){
        addresWarn.classList.remove("hidden")
        addresInput.classList.add("border-red-500")
        return;
    }

    // Enviar o pedido para a API WhatsApp
    const cartItems = cart.map((item) => {
        return(
            ` ${item.name} Quantidade: (${item.quantity}) Preço:R$ ${item.price}`
        )
    }) .join("")

    const message = encodeURIComponent(cartItems)
    const phone = "24992900144"

    window.open(`https://wa.me/${phone}?text=${message} *Endereço:* ${addresInput.value}`, "_blank")

    cart.length = 0;
    updateCartModal();
})

// Verificar hora e manipular o card horario
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}