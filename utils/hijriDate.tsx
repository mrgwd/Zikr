const date: Date = new Date()
date.setDate(date.getDate() - 1)
const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const hijriDate = formatter.format(date)

export { hijriDate }
