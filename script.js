let tg = window.Telegram.WebApp;
tg.expand();

// Настройка MainButton как в ЛР6
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";
tg.MainButton.hide();

let currentQuery = "";

const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

searchBtn.addEventListener("click", function () {
    currentQuery = document.getElementById("searchInput").value.trim();

    if (!currentQuery) {
        alert("Введите запрос!");
        return;
    }

    // Просто красиво показываем, что запрос принят
    resultsDiv.innerHTML = `
        <div style="text-align:center; padding:30px; background:rgba(255,255,255,0.15); border-radius:15px; color:white;">
            <h2>Запрос отправлен в бота</h2>
            <p style="font-size:18px; margin:15px 0;"><strong>${currentQuery}</strong></p>
            <p>Нажми зелёную кнопку снизу → и я найду все вузы в чате!</p>
        </div>
    `;

    // Показываем MainButton (как в лабораторной)
    tg.MainButton.setText(`Найти вузы: "${currentQuery}"`);
    tg.MainButton.show();
});

// Клик по зелёной кнопке — отправляем запрос в бота
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    tg.sendData(currentQuery);           // ← вот и всё, что нужно по ЛР6
    tg.MainButton.setText("Отправлено!");
    setTimeout(() => tg.close(), 1000);
});

// Примеры запросов
function setExample(text) {
    document.getElementById("searchInput").value = text;
    searchBtn.click();
}

// Enter в поле ввода
document.getElementById("searchInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") searchBtn.click();
});
