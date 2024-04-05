const hijriDate = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(Date.now())
export { hijriDate }
