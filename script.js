const journalForm = document.getElementById('journal-form');
const movieTitleInput = document.getElementById('movie-title');
const moviePosterInput = document.getElementById('movie-poster');
const movieThoughtsInput = document.getElementById('movie-thoughts');
const imagePreview = document.getElementById('image-preview');
const journalList = document.getElementById('journal-list');
const exportBtn = document.getElementById('export-btn');
const exportContainer = document.getElementById('export-container');

let journalEntries = JSON.parse(localStorage.getItem('movieJournalEntries')) || [];

// Initialize: Display existing entries
displayEntries();

// Handle Image Preview
moviePosterInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.innerHTML = '<span>画像を選択してください</span>';
    }
});

// Handle Form Submission
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
                date: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
            };

            journalEntries.unshift(newEntry);
            saveToLocalStorage();
            displayEntries();
            journalForm.reset();
            imagePreview.innerHTML = '<span>画像を選択してください</span>';
        };
        reader.readAsDataURL(file);
    }
});

// Save to LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('movieJournalEntries', JSON.stringify(journalEntries));
}

// Display Entries
function displayEntries() {
    if (journalEntries.length === 0) {
        journalList.innerHTML = '<p class="empty-msg">まだ物語が綴られていません。</p>';
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
                <div class="entry-header">
                    <h3>${entry.title}</h3>
                    <span class="entry-date">${entry.date}</span>
                </div>
                <div class="entry-thoughts">${entry.thoughts}</div>
                <div class="entry-footer">
                    <button class="btn-delete" onclick="deleteEntry(${entry.id})">記憶を消去</button>
                </div>
            </div>
        `;
        journalList.appendChild(entryEl);
    });
}

// Delete Entry
window.deleteEntry = function(id) {
    if (confirm('この記録を削除してもよろしいですか？')) {
        journalEntries = journalEntries.filter(entry => entry.id !== id);
        saveToLocalStorage();
        displayEntries();
    }
};

// Export as Image
exportBtn.addEventListener('click', function() {
    if (journalEntries.length === 0) {
        alert('書き出す記録がありません。');
        return;
    }

    const originalBtnText = exportBtn.innerText;
    exportBtn.innerText = '書き出し中...';
    exportBtn.disabled = true;

    // Hide delete buttons temporarily for a clean export
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(btn => btn.style.display = 'none');

    html2canvas(exportContainer, {
        backgroundColor: '#121212',
        scale: 2, // High quality
        useCORS: true,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `movie-journal-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Restore UI
        exportBtn.innerText = originalBtnText;
        exportBtn.disabled = false;
        deleteButtons.forEach(btn => btn.style.display = 'block');
    }).catch(err => {
        console.error('Export failed:', err);
        alert('画像の書き出しに失敗しました。');
        exportBtn.innerText = originalBtnText;
        exportBtn.disabled = false;
        deleteButtons.forEach(btn => btn.style.display = 'block');
    });
});
