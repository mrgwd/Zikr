const today = new Date()
const dd = today.getDate()
const mm = today.getMonth() + 1
const yyyy = today.getFullYear()

export const presentDate = new Date(`${mm}/${dd}/${yyyy}`)
