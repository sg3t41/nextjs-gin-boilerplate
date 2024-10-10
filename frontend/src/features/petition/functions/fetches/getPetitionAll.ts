export const getPetitionAll = async () => {
  const response = await fetch('http://syomei_api:8080/db')

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`)
  }

  const responseData = await response.json() // JSONに変換
  const petitions = responseData.data
  return { petitions }
}
