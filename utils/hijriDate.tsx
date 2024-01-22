const date: Date = new Date()
const hijri: string[] = date.toLocaleDateString('ar-SA').split('/')
const month: string = hijri[1]
const arabicMonths = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الثاني',
  'جمادى الأول',
  'جمادى الثاني',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
]
const arabicMap: { [key: string]: number } = {
  1633: 0,
  1634: 1,
  1635: 2,
  1636: 3,
  1637: 4,
  1638: 5,
  1639: 6,
  1640: 7,
  1641: 8,
  1642: 9,
  1643: 10,
  1644: 11,
}
const hijriDate = `${hijri[0]} ${
  arabicMonths[arabicMap[`${hijri[1].charCodeAt(0)}`]]
} ${hijri[2]}`

export { hijriDate }
