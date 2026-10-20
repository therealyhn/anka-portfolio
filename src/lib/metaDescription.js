// Meta description of at most `max` characters: whole sentences when they fit, otherwise
// whole words and an ellipsis, never a word cut in half (SEO-025).
export function toMetaDescription(text, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const head = clean.slice(0, max + 1)
  const sentenceEnds = [...head.matchAll(/[.!?](?=\s)/g)]
  const lastSentence = sentenceEnds.length > 0 ? sentenceEnds[sentenceEnds.length - 1].index + 1 : 0
  if (lastSentence >= 70) return clean.slice(0, lastSentence)
  const lastSpace = head.lastIndexOf(' ')
  return clean.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[\s,;:-]+$/, '') + '…'
}
