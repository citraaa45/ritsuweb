const product = [
    {
        id: "1",
        name: "Rice Bowl Chicken Katsu",
        image: "katsu.png",
        price: 12000
      }
    ];

    const divContainer = document.getElementById("product-list");
    const cartContainer = document.getElementById("cart-items");
    let cart = [];

    product.forEach(function(data) {
      const divCard = document.createElement("div");
      divCard.className = "product-card";
      divCard.innerHTML = `
        <img src="${data.image}" alt="${data.name}">
        <h1>${data.name}</h1>
        <p>Harga: Rp. ${data.price.toLocaleString()}</p>
        <button onclick="tambahkeranjang('${data.id}')">Simpan ke keranjang</button>
      `;
      divContainer.append(divCard);
    });

    function tambahkeranjang(id) {
      const produk = product.find(p => p.id === id);
      const produkDiKeranjang = cart.find(item => item.id === id);

      if (produkDiKeranjang) {
        produkDiKeranjang.quantity += 1;
      } else {
        cart.push({
          ...produk,
          quantity: 1
        });
      }
      updateKeranjang();
    }

    function updateKeranjang() {
      cartContainer.innerHTML = "";

      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Keranjang kosong</p>";
        return;
      }

      cart.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
          <h4>${item.name}</h4>
          <p>Rp. ${item.price.toLocaleString()} x ${item.quantity}</p>
          <p>Total: Rp. ${(item.price * item.quantity).toLocaleString()}</p>
          <div>
            <button class="quantity-btn btn-minus" onclick="kurangiQty('${item.id}')">-</button>
            <button class="quantity-btn btn-plus" onclick="tambahQty('${item.id}')">+</button>
          </div>
        `;
        cartContainer.appendChild(itemDiv);
      });

      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const totalDiv = document.createElement("div");
      totalDiv.style.marginTop = "10px";
      totalDiv.style.fontWeight = "bold";
      totalDiv.innerText = `Total Pesanan: Rp. ${total.toLocaleString()}`;
      cartContainer.appendChild(totalDiv);

      const checkoutBtn = document.createElement("button");
      checkoutBtn.className = "checkout";
      checkoutBtn.innerText = "Checkout via WhatsApp";
      checkoutBtn.onclick = CheckoutToWhatsapp;
      cartContainer.appendChild(checkoutBtn);
    }

    function tambahQty(id) {
      const item = cart.find(p => p.id === id);
      if (item) {
        item.quantity += 1;
        updateKeranjang();
      }
    }

    function kurangiQty(id) {
      const itemIndex = cart.findIndex(p => p.id === id);
      if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity -= 1;
        } else {
          cart.splice(itemIndex, 1);
        }
        updateKeranjang();
      }
    }

    function CheckoutToWhatsapp() {
      let pesan = "Halo kak, saya mau pesan:\n";
      cart.forEach((item, index) => {
        pesan += `${index + 1}. ${item.name} x ${item.quantity}\n`;
      });
      const encoded = encodeURIComponent(pesan);
      window.open(`https://wa.me/6289650022527?text=${encoded}`, "_blank");
    }
