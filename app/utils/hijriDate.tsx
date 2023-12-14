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
  1633: 1,
  1634: 2,
  1635: 3,
  1636: 4,
  1637: 5,
  1638: 6,
  1639: 7,
  1640: 8,
  1641: 9,
}
const hijriDate = `${hijri[0]} ${
  arabicMonths[arabicMap[`${hijri[1].charCodeAt(0)}`]]
} ${hijri[2]}`

export { hijriDate }
