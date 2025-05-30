document.addEventListener("DOMContentLoaded", () => {
  fetch("/products")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#productTable tbody");
      tbody.innerHTML = "";
      data.forEach(product => {
        const row = `<tr>
          <td class="border px-4 py-2">${product.name}</td>
          <td class="border px-4 py-2">${product.description}</td>
          <td class="border px-4 py-2">${product.price}</td>
        </tr>`;
        tbody.innerHTML += row;
      });
    });

  document.getElementById("productForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const product = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      price: parseFloat(document.getElementById("price").value)
    };

    const res = await fetch(`/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
      credentials: "include"
    });
    

    if (res.ok) {
      alert("Product added!");
      location.reload();
    } else {
      alert("Failed to add product");
    }
  });
});

// 수정 버튼 클릭 시
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.dataset.id;
    const newName = prompt("새 이름?");
    const newDesc = prompt("새 설명?");
    const newPrice = prompt("새 가격?");
    if (!newName || !newDesc || !newPrice) return;

    fetch(`/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName,
        description: newDesc,
        price: parseFloat(newPrice)
      }),
      credentials: "include"
    }).then(res => {
      if (res.ok) {
        alert("수정 완료");
        location.reload();
      } else {
        alert("수정 실패");
      }
    });
  }

  // 삭제 버튼 클릭 시
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    if (!confirm("정말 삭제하시겠습니까?")) return;

    fetch(`/products/${id}`, {
      method: "DELETE",
      credentials: "include"
    }).then(res => {
      if (res.ok) {
        alert("삭제 완료");
        location.reload();
      } else {
        alert("삭제 실패");
      }
    });
  }
});