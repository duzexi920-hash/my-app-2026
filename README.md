# Movie Search App (Modern Dark)

TMDB APIを使用した、モダンなダークテーマの映画検索アプリです。GitHub Pagesで簡単に公開できます。

## 機能
- **トレンド表示**: 今週のトレンド映画を自動的に取得して表示。
- **検索機能**: 好きな映画タイトルで検索可能。
- **レスポンシブデザイン**: PC、タブレット、スマホのすべてのデバイスに最適化。
- **モダンなUI**: ダークブルーを基調とした洗練されたデザイン。

## セットアップ手順

このアプリを動かすには、[The Movie Database (TMDB)](https://www.themoviedb.org/) のAPIキーが必要です。

1. **APIキーを取得する**:
   - TMDBにサインアップ（無料）します。
   - [API設定ページ](https://www.themoviedb.org/settings/api) から APIキー（v3 auth）を取得します。

2. **APIキーをコードに設定する**:
   - `script.js` を開き、1行目の `YOUR_TMDB_API_KEY_HERE` を取得したキーに置き換えます。
   ```javascript
   const API_KEY = 'あなたのAPIキー';
   ```

3. **ローカルで確認する**:
   - `index.html` をブラウザで開きます。

## GitHub Pages での公開方法

1. GitHubに新しいリポジトリを作成します。
2. このプロジェクトのファイルをリポジトリにプッシュします。
3. リポジトリの **Settings** > **Pages** に移動します。
4. **Build and deployment** > **Source** で `Deploy from a branch` を選択。
5. **Branch** で `main` (または `master`) を選択して **Save** をクリック。
6. 数分後、公開されたURLが表示されます。

## 使用技術
- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Glassmorphism)
- JavaScript (Fetch API, Async/Await)
- TMDB API
