let order = {};

function verifyOrder() {
  if (
    order.principal !== undefined &&
    order.drink !== undefined &&
    order.dessert !== undefined
  ) {
    const button = document.querySelector(".button");
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
    }

    selected.classList.add("option-selected");
    const selectedInformations = selected.children[1].innerText.split("\n\n");
    order[category] = {
      name: selectedInformations[0],
      price: selectedInformations[2],
    };
  }

  verifyOrder();
}

function ordering() {}
