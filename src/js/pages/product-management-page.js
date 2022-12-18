const productManagementPage = `<h3>상품 추가하기</h3>
  <form id="product-form" class="product-container">
    <input
      type="text"
      required
      id="product-name-input"
      placeholder="상품명"
    />
    <input
      type="number"
      required
      id="product-price-input"
      placeholder="가격"
    />
    <input
      type="number"
      required
      id="product-quantity-input"
      placeholder="수량"
    />
    <button type="submit" id="product-add-button">추가하기</button>
  </form>
  <table class="product-inventory">
    <colgroup>
      <col style="width: 140px" />
      <col style="width: 100px" />
      <col style="width: 100px" />
    </colgroup>
    <thead>
      <tr>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
      </tr>
    </thead>
    <tbody id="product-inventory-container"></tbody>
  </table>`;

export default productManagementPage;
