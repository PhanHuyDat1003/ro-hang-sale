// Nhận diện các cách gõ giá kiểu tiếng Việt trong ô tìm kiếm, ví dụ:
// "5 triệu", "3 - 5 triệu", "3tr đến 5tr"
export function parsePriceHints(text) {
  if (!text) return null;

  const range = text.match(
    /(\d+(?:[.,]\d+)?)\s*(?:-|đến|tới)\s*(\d+(?:[.,]\d+)?)\s*(triệu|tr)\b/i
  );
  if (range) {
    const a = parseFloat(range[1].replace(",", ".")) * 1_000_000;
    const b = parseFloat(range[2].replace(",", ".")) * 1_000_000;
    return {
      min: Math.min(a, b),
      max: Math.max(a, b),
      strip: range[0],
    };
  }

  const single = text.match(/(\d+(?:[.,]\d+)?)\s*(triệu|tr)\b/i);
  if (single) {
    const v = parseFloat(single[1].replace(",", ".")) * 1_000_000;
    return { min: v - 1_000_000, max: v + 1_000_000, strip: single[0] };
  }

  return null;
}
