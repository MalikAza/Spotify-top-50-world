import * as dotenv from 'dotenv'
dotenv.config()

export const TOKEN = process.env.SPOTIFY_TOKEN ?? ''
export const CLIENT_ID = process.env.CLIENT_ID ?? ''
export const CLIENT_SECRET = process.env.CLIENT_SECRET ?? ''