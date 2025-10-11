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

@src/app/page.tsx（src/app/page.tsx を参照）
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

## GitとGitHubワークフロールール

### GitHubの利用ルール

GitHubのMCPサーバーを利用してGitHubへのPRを作成する事が可能です。

許可されている操作は以下の通りです。

- GitHubへのPRの作成
- GitHubへのPRへのコメントの追加
- GitHub Issueへのコメントの追加

### PR作成ルール

- ブランチはユーザーが作成しますので現在のブランチをそのまま利用します
- PRのタイトルは日本語で入力します
- PRの作成先は特別な指示がない場合は `main` ブランチになります
- PRの説明欄は @.github/PULL_REQUEST_TEMPLATE.md を参考に入力します
- 対応issueがある場合は、PRの説明欄に `#<issue番号>` を記載します
- Issue番号は現在のブランチ名から取得出来ます、例えば `feature/issue7/add-docs` の場合は `7` がIssue番号になります
- PRの説明欄には主に以下の情報を含めてください

#### PRの説明欄に含めるべき情報

- 変更内容の詳細説明よりも、なぜその変更が必要なのかを重視
- 他に影響を受ける機能やAPIエンドポイントがあれば明記

#### 以下の情報はPRの説明欄に記載する事を禁止する

- 1つのissueで1つのPRとは限らないので `fix #issue番号` や `close #issue番号` のようなコメントは禁止します
- 全てのテストをパス、Linter、型チェックを通過などのコメント（テストやCIが通過しているのは当たり前でわざわざ書くべき事ではない）

## コーディング時に利用可能なツールについて

コーディングを効率的に行う為のツールです。必ず以下に目を通してください。

### Serena MCP ― コード検索・編集ツールセット（必ず優先）

| 分類                        | 主要ツール (mcp**serena**)                                                                        | 典型的な用途                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **ファイル / ディレクトリ** | `list_dir` / `find_file`                                                                          | ツリー俯瞰・ファイル名で高速検索                 |
| **全文検索**                | `search_for_pattern` / `replace_regex`                                                            | 正規表現を含む横断検索・一括置換                 |
| **シンボル検索**            | `get_symbols_overview` / `find_symbol` / `find_referencing_symbols`                               | 定義探索・参照逆引き                             |
| **シンボル編集**            | `insert_after_symbol` / `insert_before_symbol` / `replace_symbol_body`                            | 挿入・追記・リファクタ                           |
| **メモリ管理**              | `write_memory` / `read_memory` / `list_memories` / `delete_memory`                                | `.serena/memories/` への長期知識 CRUD            |
| **メンテナンス**            | `restart_language_server` / `switch_modes` / `summarize_changes` / `prepare_for_new_conversation` | LSP 再起動・モード切替・変更要約・新チャット準備 |

> **禁止**: 組み込み `Search / Read / Edit / Write` ツールは使用しない。
> **ロード手順**: チャット開始直後に `/mcp__serena__initial_instructions` を必ず実行してから作業を行う。

Serena MCPが使えない環境では仕方ないので通常の `Search / Read / Edit / Write` を使用しても良いが、Serena MCPの機能を優先的に利用すること。

### Gemini CLI ― Web 検索専用

外部情報を取得する必要がある場合は、次の Bash ツール呼び出しを **唯一の手段として使用** する。

```bash
gemini --prompt "WebSearch: <query>"
```

`gemini` が使えない環境の場合は通常のWeb検索ツールを使っても良い。

## **絶対禁止事項**

1. **依頼内容に関係のない無駄な修正を行う行為は絶体に禁止。**
2. **ビジネスロジックが誤っている状態で、テストコードを“上書きしてまで”合格させる行為は絶対に禁止。**
