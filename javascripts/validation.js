function emailValidation() {
  const form = document.getElementById("form");
  const email = document.getElementById("email");
  const emailConfirm = document.getElementById("email_confirm");

    //メールアドレスの一致チェック
  function checkEmail() {
    const oldError = document.getElementById("email_error");

    // 既存のエラーメッセージがあれば削除
    if (oldError) {
      oldError.remove();
    }

    // メールアドレスの背景色をリセット
    emailConfirm.style.backgroundColor = "";

    // メールアドレスが一致しない場合にエラーメッセージを表示
    if (emailConfirm.value !== "" && email.value !== emailConfirm.value) {
      const errorRow = document.createElement("tr");
      errorRow.setAttribute("id", "email_error");

      const emptyCell = document.createElement("td");
      const messageCell = document.createElement("td");

      messageCell.innerText = "Eメールが一致しません";
      messageCell.style.color = "#d14539";

      // エラーメッセージのセルを結合して中央揃えにする
      errorRow.appendChild(emptyCell);
      errorRow.appendChild(messageCell);

      // エラーメッセージをメール確認欄の下に挿入
      const emailConfirmRow = emailConfirm.parentElement.parentElement;
      emailConfirmRow.parentElement.insertBefore(errorRow, emailConfirmRow.nextElementSibling);

      // メール確認欄の背景色を赤に変更
      emailConfirm.style.backgroundColor = "rgba(230,169,171,.5)";
    }
  }

  // メールアドレスの入力欄にイベントリスナーを追加
  emailConfirm.addEventListener("input", checkEmail);

  // フォームの送信時にメールアドレスの一致をチェック
  form.addEventListener("submit", function(e) {
    if (email.value !== emailConfirm.value) {
      e.preventDefault();
      checkEmail();
    }
  });
}

window.onload = emailValidation;