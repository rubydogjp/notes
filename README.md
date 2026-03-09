# Rubydog Notes

Rubydog JP の講座サイトを管理するリポジトリ

# Step by Step 教材
Progress (今全体のどこにいるか)
Title (Step のタイトル)
Index (Step の目次)
Visual (左側にある視覚的にみやすい表現)
Control (サブステップの戻る進む)
Details (右側にある読み上げに適した説明)
Action (手を動かしてやること)

## 開発

git で `main` ブランチで開発し、対応するブランチへ push すると GitHub Actions によってデプロイされる.

| ブランチ | CI | 公開サイトURL |
|---|---|---|
| gitnote | deploy-gitnote.yml | [gitnote.rubydog.jp](https://gitnote.rubydog.jp) |
| flutternote | deploy-flutternote.yml | [flutternote.rubydog.jp](https://flutternote.rubydog.jp) |

## 講座一覧

### Git Note (gitnote)
- 日本語名: Git講座
- 技術スタック: React 19 + Vite 7 + Tailwind CSS 4 (TypeScript strict)
- テーマ: 蜂・ハチミツ・蜂の巣 (amber/cream 暖色パレット)
- チュートリアル用リポジトリ: [rubydogjp/honeycomb](https://github.com/rubydogjp/honeycomb)

### Flutter Note (flutternote)
- 日本語名: Flutter講座
- 技術スタック: Flutter Web (Dart)
- 入門動画リストとサンプルコードを提供
