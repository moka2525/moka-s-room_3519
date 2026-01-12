const blogUpdatedDates = [
    "2025-10-03",
    "2025-10-12",
    "2025-10-14" 
];

const blogUpdatedLinks = {
    "2025-10-03": "#blog-2025-10-03",
    "2025-10-12": "#blog-2025-10-12",
    "2025-10-14": "#blog-2025-10-14" 
};

function renderCalendarWidget() {
    const calendarDiv = document.getElementById('calendar-widget');
    if (!calendarDiv) return;

    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();

    if (now.getDate() > 27) {
        month += 1;
        if (month > 11) {
            month = 0;
            year += 1;
        }
    }

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let html = `<div class="calendar-header">
        <span class="calendar-title">${year}年${month + 1}月</span>
    </div>
    <table>
        <thead>
            <tr>
                <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
            </tr>
        </thead>
        <tbody>
            <tr>
    `;

    for (let i = 0; i < firstDay; i++) html += `<td></td>`;

    for (let d = 1; d <= lastDate; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        let tdClass = "";
        let cellContent = d;

        if (dateStr === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`) {
            tdClass = "today";
        }
        if (blogUpdatedLinks[dateStr]) {
            tdClass += (tdClass ? " " : "") + "blog-updated";
            
            cellContent = `<a href="${blogUpdatedLinks[dateStr]}" style="color:inherit;text-decoration:none;">${d}</a>`;
        }

        html += `<td class="${tdClass}">${cellContent}</td>`;
        if ((firstDay + d) % 7 === 0 && d !== lastDate) html += `</tr><tr>`;
    }

    const lastDay = (firstDay + lastDate) % 7;
    if (lastDay !== 0) for (let i = lastDay; i < 7; i++) html += `<td></td>`;

    html += `</tr></tbody></table>`;
    calendarDiv.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", renderCalendarWidget);


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('comment-form');
    const list = document.getElementById('comments-list');
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');

    
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('blog-comments') || '[]');
        list.innerHTML = '';
        comments.forEach(c => {
            const li = document.createElement('li');
            li.textContent = `${c.name}: ${c.text}`;
            list.appendChild(li);
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        if (!name || !text) return;
        const comments = JSON.parse(localStorage.getItem('blog-comments') || '[]');
        comments.push({ name, text });
        localStorage.setItem('blog-comments', JSON.stringify(comments));
        nameInput.value = '';
        textInput.value = '';
        loadComments();
    });

    loadComments();
});