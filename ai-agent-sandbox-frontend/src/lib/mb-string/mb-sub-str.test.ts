// 絶対厳守：編集前に必ずAI実装ルールを読む
import { describe, expect, it } from "vitest";

import { mbString } from "../mb-string";

describe("src/lib/mb-string.ts mbString", () => {
  type TestTable = {
    description: string;
    text: string;
    begin: number;
    end: number;
    expected: string;
  };

  const ZERO = 0;

  const hello = "hello";
  const separator = " ";
  const world = "world";
  const asciiText = `${hello}${separator}${world}`;
  const helloLength = Array.from(hello).length;
  const separatorLength = Array.from(separator).length;
  const worldLength = Array.from(world).length;
  const worldStart = helloLength + separatorLength;
  const worldEnd = worldStart + worldLength;

  const prefix = "A";
  const emoji = "😀";
  const middle = "BC";
  const flag = "🇯🇵";
  const surrogateText = `${prefix}${emoji}${middle}${flag}`;
  const codePoints = Array.from(surrogateText);
  const emojiStart = codePoints.indexOf(emoji);
  const emojiEnd = emojiStart + 1;
  const middleEnd = emojiEnd + Array.from(middle).length;
  const flagLength = Array.from(flag).length;
  const flagStart = codePoints.length - flagLength;
  const flagEnd = flagStart + flagLength;

  const overflowText = "こんにちは世界";
  const overflowTotalLength = Array.from(overflowText).length;
  const overflowBegin = Array.from("こん").length;
  const overshootEnd = overflowTotalLength + Array.from("追加").length;

  it.each`
    description                               | text             | begin                  | end             | expected
    ${"ASCII: 先頭部分を取得する"}            | ${asciiText}     | ${ZERO}                | ${helloLength}  | ${hello}
    ${"ASCII: 後半部分を取得する"}            | ${asciiText}     | ${worldStart}          | ${worldEnd}     | ${world}
    ${"サロゲート: 絵文字のみ取得する"}       | ${surrogateText} | ${emojiStart}          | ${emojiEnd}     | ${emoji}
    ${"サロゲート: 先頭からASCIIまで取得"}    | ${surrogateText} | ${ZERO}                | ${middleEnd}    | ${`${prefix}${emoji}${middle}`}
    ${"サロゲート: 国旗を取得する"}           | ${surrogateText} | ${flagStart}           | ${flagEnd}      | ${flag}
    ${"範囲外: 終端超過でも切り出せる"}       | ${overflowText}  | ${overflowBegin}       | ${overshootEnd} | ${"にちは世界"}
    ${"範囲外: 開始位置が終端以上なら空文字"} | ${overflowText}  | ${overflowTotalLength} | ${overshootEnd} | ${""}
  `("$description", ({ text, begin, end, expected }: TestTable) => {
    expect(mbString(text, begin, end)).toBe(expected);
  });
});
