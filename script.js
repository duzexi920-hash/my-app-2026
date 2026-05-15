// TMDB API Settings (APIキーは後ほどユーザーが設定)
const API_KEY = 'YOUR_TMDB_API_KEY_HERE';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const movieGrid = document.getElementById('movie-grid');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const sectionTitle = document.getElementById('section-title');

// 初期表示: トレンド映画を取得
getTrendingMovies();

async function getTrendingMovies() {
    try {
        const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ja-JP`);
        const data = await res.json();
        
        if (data.results) {
            displayMovies(data.results);
        } else {
            movieGrid.innerHTML = '<p class="loader">映画が見つかりませんでした。APIキーを確認してください。</p>';
        }
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        movieGrid.innerHTML = '<p class="loader">エラーが発生しました。しばらくしてからお試しください。</p>';
    }
}

async function searchMovies(query) {
    try {
        movieGrid.innerHTML = '<div class="loader">検索中...</div>';
        const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ja-JP`);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            movieGrid.innerHTML = '<p class="loader">該当する映画が見つかりませんでした。</p>';
        }
    } catch (error) {
        console.error('Error searching movies:', error);
        movieGrid.innerHTML = '<p class="loader">エラーが発生しました。</p>';
    }
}

function displayMovies(movies) {
    movieGrid.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, release_date } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');

        const poster = poster_path ? IMG_URL + poster_path : 'https://via.placeholder.com/300x450?text=No+Image';

        movieEl.innerHTML = `
            <img src="${poster}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <div class="rating">
                    <span>★ ${vote_average.toFixed(1)}</span>
                    <small>${release_date ? release_date.split('-')[0] : '不明'}</small>
                </div>
            </div>
        `;

        movieGrid.appendChild(movieEl);
    });
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;

    if (searchTerm && searchTerm !== '') {
        searchMovies(searchTerm);
        sectionTitle.textContent = `「${searchTerm}」の検索結果`;
        searchInput.value = '';
    } else {
        window.location.reload();
    }
});
