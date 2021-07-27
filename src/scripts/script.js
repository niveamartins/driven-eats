let order = {};

function verifyOrder() {
  if (
    order.principal !== undefined &&
    order.drink !== undefined &&
    order.dessert !== undefined
  ) {
    const button = document.querySelector(".confirm-button");
    button.disabled = false;
    button.innerText = "Fechar Pedido";
    button.classList.remove("disabled");
    button.classList.add("enabled");
  }
}

function selectOption(category, selected) {
  if (selected !== null) {
    if (order[category] !== undefined) {
      const options = document.querySelector("." + category);
      const previouslySelected = options.querySelector(".option-selected");
      previouslySelected.classList.remove("option-selected");

      const icon = previouslySelected.querySelector(".icon");
      icon.classList.remove("check-selected");
      icon.classList.add("deselected");
    }

    selected.classList.add("option-selected");
    const icon = selected.querySelector(".icon");
    icon.classList.add("check-selected");
    icon.classList.remove("deselected");
    const selectedInformations = selected.children[1].innerText.split("\n\n");
    order[category] = {
      name: selectedInformations[0],
      price: selectedInformations[2],
    };
  }

  verifyOrder();
}

function confirmOrder() {
  const orderModal = document.querySelector(".order")
  orderModal.classList.remove("deselected");
  orderModal.classList.add("show")
  showingOrder(orderModal)
  orderModal.querySelector(".total").innerHTML = `<p><strong>TOTAL</strong></p>  <p>${totalOrder()}</p>`
}

function showingOrder(orderModal) {
    console.log(order)
    for (let key in order) {
        orderModal.querySelector("." + key).innerHTML = `<p>${order[key].name}</p>  <p>${order[key].price}</p>`; 
    }
}

function totalOrder() {
    let sum = 0
    for(let key in order) {
        let number = order[key].price.replace("R$ ", "").replace(",", ".")
        number = Number(number)
        sum += number
    }

    sum = sum.toFixed(2)

    return "R$ " + sum.toString().replace(".", ",")
}

function closeOrder() {
  const clientName = prompt("Nome");
  const clientAddress = prompt("Endereço");

  let text = encodeURIComponent(
    `Olá, gostaria de fazer o pedido: \n - Prato: ${
      order.principal.name
    } \n - Bebida: ${order.drink.name} \n - Sobremesa: ${
      order.dessert.name
    } \n Total: R$ ${totalOrder()} \n \n Nome: ${clientName} \n Endereço: ${clientAddress}`
  );
  window.open(`https://wa.me/5521976850839?text=${text}`);
}

function cancelOrder() {
  const orderModal = document.querySelector(".order");
  orderModal.classList.add("deselected");
  orderModal.classList.remove("show")
}
