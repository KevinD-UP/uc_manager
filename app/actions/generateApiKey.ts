"use server"

export async function generateApiKey(selectedData: any[]) {
  // Générer une chaîne aléatoire basée sur la date actuelle et un nombre aléatoire
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substr(2, 5)

  // Combiner avec une partie basée sur les données sélectionnées
  const dataPart = selectedData
    .map((item) => Object.values(item).join(""))
    .join("")
    .slice(0, 10)
    .replace(/[^a-zA-Z0-9]/g, "")

  // Combiner toutes les parties pour former la clé API
  // Ici, vous pouvez ajouter la logique pour sauvegarder la clé dans une base de données si nécessaire

  return `${timestamp}-${randomPart}-${dataPart}`.toUpperCase()
}

