"use server"

export async function generateApiKey(length = 32): Promise<string> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = '';

  for (let i = 0; i < length; i++) {
    apiKey += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Ajout de tirets pour améliorer la lisibilité (ex: XXXX-XXXX-XXXX-XXXX)
  return apiKey.match(/.{1,4}/g)?.join('-') || apiKey;
}


