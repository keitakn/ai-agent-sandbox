# 🚨🚨🚨 【重要】ソースファイル必須事項（絶対厳守）

絶対厳守：編集前に必ずルールを読む

本ドキュメントはコーディング用AIエージェント向けの資料です。

## 📝 ソースファイル先頭コメント必須

全てのソースファイル（.ts .tsx）の先頭に必ず以下のコメントを記載：

```typescript
// 絶対厳守：編集前に必ずAI実装ルールを読む
```

既存ファイルにコメントがない場合は必ず追加すること。

## 他のファイルへの参照

**以下のように @<path> の形式で書かれている場合は別のファイルへの参照になりますので、対象ファイルを探して内容を確認してください。**

**以下に記載例を示します。**

@src/mastra/index.ts（src/mastra/index.ts を参照）
@docs/basic-coding-guidelines.md （docs/basic-coding-guidelines.md を参照）

## プロジェクト概要

React 19.2.0、TypeScript、Tailwind CSS 4 を使用した Next.js 15.5.4 フロントエンドアプリケーションです。Turbopack で高速ビルドを行い、ポート 7777 で実行されます。

## 開発コマンド

### アプリケーションの実行

```bash
npm run dev          # Turbopack で開発サーバーを http://localhost:7777 で起動
npm run build        # Turbopack で本番用ビルドを作成
npm start            # 本番サーバーをポート 7777 で起動
```

### コード品質

```bash
npm run lint         # ultracite (Biome) リンターと prettier を markdown/yaml に実行
npm run format       # ultracite で自動修正し、markdown/yaml を prettier でフォーマット
npm run lint:prettier # markdown/yaml のフォーマットのみチェック
npm run prettier     # markdown/yaml ファイルのみフォーマット
```

**重要**: このプロジェクトでは、TypeScript/JavaScript/CSS のリントに **ultracite** (Biome を拡張) を使用し、markdown と YAML ファイルには **Prettier** を使用します。`npm run lint` を実行すると両方がチェックされます。

## アーキテクチャ

### 技術スタック

- **フレームワーク**: Next.js 15 with App Router (Pages Router ではない)
- **UI**: React 19, Tailwind CSS 4 with PostCSS
- **リンティング**: ultracite 経由の Biome (設定を拡張)、markdown/yaml 用の Prettier
- **言語**: strict モード有効の TypeScript

### プロジェクト構造

```
src/
  app/                    # Next.js App Router ディレクトリ
    layout.tsx           # Geist フォントを使用したルートレイアウト
    page.tsx             # ホームページ
    globals.css          # CSS 変数を使用したグローバル Tailwind スタイル
```

### 主要な設定

- **ポート**: 開発環境と本番環境は **7777** ポートで実行 (デフォルトの 3000 ではない)
- **パスエイリアス**: `@/*` は `./src/*` にマッピング
- **TypeScript**: strict モードと `strictNullChecks` を有効化

## 備考

- プロジェクトは開発とビルドの両方で Turbopack (Next.js の新しいバンドラー) を使用
- テストフレームワークはまだ設定されていない
- biome の設定は追加のプリセットを提供する "ultracite" を拡張している

## 関連ドキュメント

### **重要: 基本的なコーディングガイドライン**

必ず以下のドキュメントを参照してから開発を開始してください:

@docs/basic-coding-guidelines.md

### **プロジェクト固有のコーディングガイドライン**

プロジェクト固有のコーディング規約とベストプラクティスについては以下に記載してありますので必ず見てください:

@docs/project-coding-guidelines.md

### **Tailwind CSS 4 コーディングガイドライン**

CSSはTailwind CSS 4を利用しています。以下のコーディングルールをご確認ください。

@docs/tailwind-css-v4-coding-guidelines.md
