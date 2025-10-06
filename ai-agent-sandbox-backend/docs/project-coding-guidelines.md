# コーディング規約

プロジェクト固有のコーディング規約です。

## カスタムエラークラス

プロトタイプ名を静的ブロックで設定してから拡張エラーを定義してください。

```typescript
class MyError extends Error {
  static {
    this.prototype.name = "MyError";
  }
}

// 追加プロパティを持つ例
class ParseError extends Error {
  static {
    this.prototype.name = "ParseError";
  }
  constructor(message = "", options = {}) {
    const { loc, ...rest } = options;
    // cause があれば Error に渡す
    super(message, rest);
    this.loc = loc;
  }
}
```

複数環境で正しいエラー名を得るためのベストプラクティスです。参考: https://www.wantedly.com/companies/wantedly/post_articles/492456

## Zod v4 の利用指針

メソッドチェーンではなくトップレベル関数を利用してください。ツリーシェイキング効率と記述性が向上します。

### 文字列フォーマットバリデーション

Zod v4 では `z.string().email()` 等が廃止予定のため、トップレベル関数に移行してください。

```typescript
// ✅ v4 スタイル
z.email();
z.url();
z.uuid();
z.ipv4();
z.ipv6();
z.cidrv4();
z.cidrv6();
z.e164();
z.base64();
z.base64url();
z.jwt();
z.lowercase();
z.iso.date();
z.iso.datetime();
z.iso.duration();
z.iso.time();
```

```typescript
// ❌ 非推奨の v3 スタイル
z.string().email();
z.string().url();
z.string().uuid();
z.string().ip();
```

## 型定義の原則

### Type の使用

原則として **`type`** を使用してください。一貫性のあるコーディングスタイルを保つため、オブジェクト型の定義にも `type` を使用します。

```typescript
// ✅ 推奨: type を使用
type User = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
};

// ✅ ユニオン型やプリミティブ型のエイリアスも type
type Status = "pending" | "approved" | "rejected";
type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };
```

**理由:**
- コードベース全体で一貫したスタイルを維持
- ユニオン型・インターセクション型との統一性
- Linter (Ultracite/Biome) の推奨に準拠
- シンプルで理解しやすい

### readonly の使用

オブジェクトのプロパティには可能な限り **`readonly`** を使用してください。

```typescript
// ✅ 推奨: readonly を使用
type Config = {
  readonly apiKey: string;
  readonly timeout: number;
  readonly retryCount: number;
};

// ✅ 関数パラメータにも適用
function processUser(user: Readonly<User>): void {
  // user のプロパティは変更できない
}

// ✅ 配列にも適用
type State = {
  readonly items: readonly string[];
};
```

**理由:**
- 意図しない変更を防ぐ
- イミュータブルなデータフローを促進
- バグの早期発見
- リファクタリングの安全性向上

## Branded Types の使用

ID などの値は **Branded Types** を使って型安全性を高めてください。

```typescript
// ✅ 推奨: Branded Types を使用
type UserId = string & { readonly __brand: "userId" };
type OrderId = string & { readonly __brand: "orderId" };

// 型の作成関数（型アサーションを使用）
function createUserId(id: string): UserId {
  return id as UserId;
}

function createOrderId(id: string): OrderId {
  return id as OrderId;
}

// 使用例
const userId = createUserId("user-123");
const orderId = createOrderId("order-456");

// 型の安全性を確認
function processUser(id: UserId): void {
  console.log(`Processing user: ${id}`);
}

processUser(userId); // OK
processUser(orderId); // エラー: 'OrderId' 型は 'UserId' 型に割り当てられません
```

**理由:**
- プリミティブ型の誤用を防ぐ
- 異なる種類のIDの混同を防止
- コンパイル時に型エラーを検出
- ドメインモデルの明確化

**適用すべきケース:**
- ユーザーID、注文ID などの識別子
- メールアドレス、URL などの特定フォーマットの文字列
- 通貨金額、パーセンテージなどの特定の意味を持つ数値
