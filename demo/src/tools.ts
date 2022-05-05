const hsl = (hue: number, alphaPercent?: number) => `hsl(${hue}, 60%, 63%, ${alphaPercent ?? 100}%)`

export { hsl }
