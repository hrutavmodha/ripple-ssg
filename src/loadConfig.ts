import { resolve } from 'path'

export default async function loadRoutes(rootDir: string) {
  const configPath = resolve(rootDir, 'ripple.config.ts')
  const mod = await import(configPath)
  return mod.default
}