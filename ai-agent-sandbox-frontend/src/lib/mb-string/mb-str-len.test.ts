// 絶対厳守：編集前に必ずAI実装ルールを読む
import { describe, expect, it } from "vitest";

import { mbStrLen } from "../mb-string";

describe("src/lib/mb-string.ts mbStrLen", () => {
  type TestTable = {
    description: string;
    text: string;
    expected: number;
  };

  const asciiText = "hello";
  const asciiExpected = Array.from(asciiText).length;

  const emojiText = "😀😃";
  const emojiExpected = Array.from(emojiText).length;

  const mixedText = "A😀BC🇯🇵";
  const mixedExpected = Array.from(mixedText).length;

  const emptyText = "";
  const emptyExpected = Array.from(emptyText).length;

  it.each`
    description                         | text         | expected
    ${"ASCII文字列の長さを返す"}        | ${asciiText} | ${asciiExpected}
    ${"サロゲートペアのみの長さを返す"} | ${emojiText} | ${emojiExpected}
    ${"混在した文字列の長さを返す"}     | ${mixedText} | ${mixedExpected}
    ${"空文字列は0を返す"}              | ${emptyText} | ${emptyExpected}
  `("$description", ({ text, expected }: TestTable) => {
    expect(mbStrLen(text)).toBe(expected);
  });
});
