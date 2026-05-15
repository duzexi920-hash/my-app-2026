# My Movie Journal

自分だけの映画観賞記録を保存できる、モダンなダークテーマのジャーナルアプリです。GitHub Pagesで簡単に公開できます。

## 機能
- **左右分割レイアウト**: 左側にポスター画像、右側に感想を表示する見やすい構成。
- **カスタムポスターの追加**: 自分のデバイスから好きな画像をアップロード可能。
- **LocalStorageによる保存**: 記録した内容はブラウザに保存され、ページを閉じても消えません。
- **レスポンシブデザイン**: PC、スマホの両方で快適に利用可能。

## 使い方
1. `index.html` をブラウザで開きます（または GitHub Pages のURLにアクセス）。
2. 映画のタイトル、ポスター画像、感想を入力して「ジャーナルに保存」をクリック。
3. 下のリストにあなたの記録が追加されます。

## GitHub Pages での公開方法
1. GitHubにリポジトリを作成し、ファイルをプッシュします。
2. リポジトリの **Settings** > **Pages** に移動します。
3. **Build and deployment** > **Source** で `Deploy from a branch` を選択。
4. **Branch** で `main` を選択して **Save** をクリック。
5. 公開まで数分かかる場合があります。

## 使用技術
- HTML5 / CSS3 (Flexbox, Grid)
- JavaScript (FileReader API, LocalStorage)
