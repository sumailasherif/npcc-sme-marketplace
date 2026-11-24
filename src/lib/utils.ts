import { createCn } from "cn/config";

/**
 * Joins class names and resolves Tailwind conflicts ("p-2 p-4" -> "p-4").
 *
 * We tell the merger about our custom tokens so it knows, for example, that
 * `text-h1` is a font size and `text-white` is a colour, and keeps both.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "body-l",
            "body",
            "label",
            "caption",
            "price",
          ],
        },
      ],
      shadow: [{ shadow: ["e1", "e2", "e3"] }],
      rounded: [{ rounded: ["chip", "button", "card", "sheet"] }],
    },
  },
});
