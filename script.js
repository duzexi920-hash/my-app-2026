const journalForm = document.getElementById('journal-form');
const movieTitleInput = document.getElementById('movie-title');
const moviePosterInput = document.getElementById('movie-poster');
const movieThoughtsInput = document.getElementById('movie-thoughts');
const imagePreview = document.getElementById('image-preview');
const journalList = document.getElementById('journal-list');

let journalEntries = JSON.parse(localStorage.getItem('movieJournalEntries')) || [];

// 初期化: 既存の記録を表示
displayEntries();

// 画像プレビューの処理
moviePosterInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.innerHTML = '<span>プレビュー画像がここに表示されます</span>';
    }
});

// フォーム送信時の処理
journalForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = movieTitleInput.value;
    const thoughts = movieThoughtsInput.value;
    const file = moviePosterInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const posterData = e.target.result;
            const newEntry = {
                id: Date.now(),
                title: title,
                poster: posterData,
                thoughts: thoughts,
                date: new Date().toLocaleDateString('ja-JP')
            };

            journalEntries.unshift(newEntry);
            saveToLocalStorage();
            displayEntries();
            journalForm.reset();
            imagePreview.innerHTML = '<span>プレビュー画像がここに表示されます</span>';
        };
        reader.readAsDataURL(file);
    }
});

// ローカルストレージに保存
function saveToLocalStorage() {
    localStorage.setItem('movieJournalEntries', JSON.stringify(journalEntries));
}

// 記録の表示
function displayEntries() {
    if (journalEntries.length === 0) {
        journalList.innerHTML = '<p class="empty-msg">まだ記録がありません。上のフォームから追加してください。</p>';
        return;
    }

    journalList.innerHTML = '';
    journalEntries.forEach(entry => {
        const entryEl = document.createElement('div');
        entryEl.classList.add('journal-entry');
        entryEl.innerHTML = `
            <div class="entry-poster">
                <img src="${entry.poster}" alt="${entry.title}">
            </div>
            <div class="entry-content">
                <h3>${entry.title} <small style="font-size: 0.8rem; color: var(--text-secondary); float: right;">${entry.date}</small></h3>
                <div class="entry-thoughts">${entry.thoughts}</div>
                <div class="entry-footer">
                    <button class="btn-delete" onclick="deleteEntry(${entry.id})">削除</button>
                </div>
            </div>
        `;
        journalList.appendChild(entryEl);
    });
}

// 記録の削除
window.deleteEntry = function(id) {
    if (confirm('この記録を削除してもよろしいですか？')) {
        journalEntries = journalEntries.filter(entry => entry.id !== id);
        saveToLocalStorage();
        displayEntries();
    }
};
