// 絶対厳守：編集前に必ずAI実装ルールを読む
const HIGH_SURROGATE_START = 0xd8_00;
const HIGH_SURROGATE_END = 0xdb_ff;
const LOW_SURROGATE_START = 0xdc_00;
const LOW_SURROGATE_END = 0xdf_ff;

const isSurrogatePear = (upper: number, lower: number): boolean =>
  upper >= HIGH_SURROGATE_START &&
  upper <= HIGH_SURROGATE_END &&
  lower >= LOW_SURROGATE_START &&
  lower <= LOW_SURROGATE_END;

export const mbStrLen = (str: string): number => {
  let logicalLength = 0;
  let index = 0;

  while (index < str.length) {
    const upper = str.charCodeAt(index);
    const nextIndex = index + 1;
    const lower = nextIndex < str.length ? str.charCodeAt(nextIndex) : 0;
    const step = isSurrogatePear(upper, lower) ? 2 : 1;

    logicalLength += 1;
    index += step;
  }

  return logicalLength;
};

export const mbString = (str: string, begin: number, end: number): string => {
  let result = "";
  let logicalIndex = 0;
  let rawIndex = 0;

  while (rawIndex < str.length) {
    const upper = str.charCodeAt(rawIndex);
    const nextIndex = rawIndex + 1;
    const lower = nextIndex < str.length ? str.charCodeAt(nextIndex) : 0;
    const isPair = isSurrogatePear(upper, lower);
    const step = isPair ? 2 : 1;
    const segment = isPair
      ? String.fromCharCode(upper, lower)
      : String.fromCharCode(upper);

    if (begin <= logicalIndex && logicalIndex < end) {
      result += segment;
    }

    logicalIndex += 1;
    rawIndex += step;
  }

  return result;
};
