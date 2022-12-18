const coinManagementPage = `<h3>자판기 돈통 충전하기</h3>
<form id="coin-form" class="vending-machine-wrapper">
	<input type="number" required id="coin-charge-input" autofocus />
	<button type="submit" id="coin-charge-button">충전하기</button>
</form>
<p>보유 금액: <span id="coin-charge-amount">0</span>원</p>
<h3>동전 보유 현황</h3>
<table class="cashbox-remaining">
	<colgroup>
		<col />
		<col />
	</colgroup>
	<thead>
		<tr>
			<th>동전</th>
			<th>개수</th>
		</tr>
	</thead>
	<tbody id="coin-inventory">
	</tbody>
</table>
`;

export default coinManagementPage;
