# Notes リポジトリ開発指針

## 組織
- 組織正式名: **Rubydog JP**
- GitHub org: rubydogjp

## リポジトリ構成
```
notes/
├── gitnote/          # Git講座 (React + Vite + Tailwind)
├── flutternote/      # Flutter講座 (Flutter Web)
├── firebase.json     # Firebase Hosting 設定
├── .firebaserc       # Firebase ターゲット設定
└── .github/workflows/
    ├── deploy-gitnote.yml
    └── deploy-flutternote.yml
```

## ブランチ運用
- **main ブランチで開発**
- `gitnote` ブランチへ push → gitnote.rubydog.jp デプロイ
- `flutternote` ブランチへ push → flutternote.rubydog.jp デプロイ

## Firebase Hosting ターゲット
- gitnote → rubydogjp-gitnote (gitnote.rubydog.jp)
- flutternote → rubydogjp-flutternote (flutternote.rubydog.jp)
- Firebase プロジェクト: rubydog-sites

## Git Note (gitnote) 詳細

### 名称
- コードネーム: gitnote
- 日本語名: Git講座
- 英語名: Git Note
- チュートリアル用リポ: rubydogjp/honeycomb
- 旧名: hunny / Hunny / ハニー (完全にリネーム済み)

### 技術スタック
- React 19 + TypeScript 5.9 (strict) + Vite 7 + Tailwind CSS 4
- React Router DOM 7 (SPA)
- React Markdown + remark-gfm + rehype-raw
- Firebase Hosting (SPA rewrite)

### カラーパレット（amber/cream 系）
| 変数 | 値 | 用途 |
|---|---|---|
| --color-gitnote-50 | #fefce8 | ページ背景 |
| --color-gitnote-500 | #eab308 | メインカラー |
| --color-gitnote-700 | #a16207 | リンク・見出し |
| --color-gitnote-800 | #854d0e | リンク hover |

### デザインの哲学
1. **テーマ**: 蜂・ハチミツ・蜂の巣。amber/cream 系の暖色パレットで統一
2. **ダークモード対応**: dark: プレフィックスで全要素対応
3. **モバイルファースト**: sm→md→lg でレスポンシブ
4. **教育的**: プログレッシブに導く UI、前/次ナビ
5. **インタラクティブ**: ハチの巣 SVG が中心的な体験

### ルーティング
```
/                    → HomePage
/tutorial/:slug      → TutorialPage
/git/:slug           → GitPage
/develop/:slug       → DevelopPage
/honeycomb           → ViewerPage (ハチの巣)
```

### ファイル構成
```
gitnote/src/
├── main.tsx
├── App.tsx
├── index.css             # Tailwind + テーマ変数
├── components/
│   ├── Layout.tsx        # ヘッダー/フッター
│   └── DocsLayout.tsx    # サイドバー + markdown
├── pages/
│   ├── HomePage.tsx
│   ├── TutorialPage.tsx
│   ├── GitPage.tsx
│   ├── DevelopPage.tsx
│   └── ViewerPage.tsx
└── content/
    ├── tutorial.ts
    ├── git.ts
    └── develop.ts
```

### 命名規則
- コンポーネント: PascalCase (HomePage, HexCell)
- 関数: camelCase (makeHexPoints, getContrastColor)
- 定数: UPPER_SNAKE_CASE (COLUMNS, HEX_W)
- ファイル: PascalCase.tsx

## Flutter Note (flutternote) 詳細

### 名称
- コードネーム: flutternote
- 日本語名: Flutter講座
- 英語名: Flutter Note

### 技術スタック
- Flutter Web (Dart)
- Riverpod + Flutter Hooks
- Google Fonts (NotoSansJP)
- パッケージ名: banana (内部コードネーム)

### 構成
- lib/hello_rubydog/ : サイト本体（ホーム画面、動画リスト、詳細ページ）
- lib/part*/ : 各講座パートのサンプルコード
- assets/ : フォント、画像、スタブデータ

## 画像リソースの表示ルール
- **icon**: 余白なしの透過アイコン。白背景 + 余白のフレーム内に中央配置して表示
- **profile**: 正方形、円形や角丸に切り取って使うことを想定。そのまま角丸でOK
- **ogp / pr**: OGP や PR 用の横長画像。アイコン的には使わない
