let tg = window.Telegram.WebApp;
tg.expand();

// Настройка MainButton
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";
tg.MainButton.hide();

let currentQuery = "";

// Ждём полной загрузки DOM — это главное изменение!
document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("results");

    if (!searchBtn || !searchInput || !resultsDiv) {
        console.error("Не найдены элементы: searchBtn, searchInput или resultsDiv");
        return;
    }

    // Обработчик кнопки "Найти"
    searchBtn.addEventListener("click", function () {
        currentQuery = searchInput.value.trim();
        if (!currentQuery) {
            alert("Введите запрос для поиска!");
            return;
        }

        resultsDiv.innerHTML = `
            <div style="text-align:center; padding:40px; background:rgba(255,255,255,0.15); border-radius:15px; color:white;">
                <h2>Запрос принят!</h2>
                <p style="font-size:18px; margin:20px 0;"><strong>${currentQuery}</strong></p>
                <p>Нажми зелёную кнопку внизу → получишь результаты в чате</p>
            </div>
        `;

        tg.MainButton.setText(`Найти вузы: "${currentQuery}"`);
        tg.MainButton.show();
    });

    // Обработчик MainButton
    tg.MainButton.onClick(function () {
        tg.sendData(currentQuery);
        tg.MainButton.setText("Отправлено в чат!");
        setTimeout(() => tg.close(), 1000);
    });

    // Примеры запросов
    window.setExample = function(text) {
        searchInput.value = text;
        searchBtn.click();
    };

    // Enter в поле ввода
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            searchBtn.click();
        }
    });
});
