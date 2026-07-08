const productElement = document.getElementById("product");
const numberElement = document.getElementById("number");

const products = [
  { id: 1, name: "オリジナルブレンド200g", price: 500 },
  { id: 2, name: "オリジナルブレンド500g", price: 900 },
  { id: 3, name: "スペシャルブレンド200g", price: 700 },
  { id: 4, name: "スペシャルブレンド500g", price: 1200 }
];

const purchases = [];

function add() {
  const productId = parseInt(productElement.value, 10);
  const number = parseInt(numberElement.value, 10);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    window.alert("商品を選択してください");
    return;
  }

  if (!number || number < 1 || number > 5) {
    window.alert("数量は1〜5の範囲で入力してください");
    return;
  }

  const purchaseIndex = purchases.findIndex((purchase) => {
    return purchase.product.id === product.id;
  });

  if (purchaseIndex === -1) {
    purchases.push({
      product: product,
      number: number
    });
  } else {
    purchases[purchaseIndex].number += number;
  }

  window.alert(`${product.name} ${product.price}円を${number}個追加しました`);

  productElement.value = "";
  numberElement.value = "";
}

function display() {
  let text = "";

  purchases.forEach((purchase) => {
    text += `${purchase.product.name} ${purchase.product.price}円：${purchase.number}個\n`;
  });

  return text;
}

function subtotal() {
  let totalPrice = 0;

  purchases.forEach((purchase) => {
    totalPrice += purchase.product.price * purchase.number;
  });

  return totalPrice;
}

function calc() {
  const totalPrice = subtotal();

  if (totalPrice === 0) {
    window.alert("商品が追加されていません");
    return;
  }

  const shippingFee = calcShippingFee(totalPrice);
  const totalPayment = totalPrice + shippingFee;

  window.alert(`${display()}\n小計は${totalPrice}円です。\n送料は${shippingFee}円です。\n合計金額は${totalPayment}円です`);

  purchases.length = 0;
  productElement.value = "";
  numberElement.value = "";
}

function calcShippingFee(totalPrice) {
  if (totalPrice >= 3000) {
    return 0;
  } else if (totalPrice >= 2000) {
    return 250;
  } else {
    return 500;
  }
}