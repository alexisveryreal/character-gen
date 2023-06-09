import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSquare = (
  character: string,
  size: number,
  text?: string,
) => {
  const squareSize: number = Math.max(size, 3); // Minimum size of 3

  const squareArr: string[] = [];

  for (let row = 0; row < squareSize; row++) {
    let rowText = "";

    for (let col = 0; col < squareSize; col++) {
      if (
        row === 0 || // Top edge
        row === squareSize - 1 || // Bottom edge
        col === 0 || // Left edge
        col === squareSize - 1 // Right edge
      ) {
        rowText += character;
      } else if (
        text &&
        row === Math.floor(squareSize / 2) &&
        col === Math.floor(squareSize / 2) - Math.floor(text.length / 2)
      ) {
        rowText += text;
        col += text.length - 1;
      } else {
        rowText += " ";
      }
    }

    squareArr.push(rowText);
  }

  return squareArr.join("\n");
};
