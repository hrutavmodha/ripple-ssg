import fs from 'fs'
import path from 'path'
import { marked } from 'marked' // lightweight markdown -> HTML

// ripple.config.ts ko dynamically load karenge
export async function loadRoutes(rootDir: string) {
  const configPath = path.resolve(rootDir, 'ripple.config.ts')
  const mod = await import(configPath)
  return mod.default
}

// SSR-friendly markdown renderer
export function renderMarkdownToString(markdownContent: string) {
  return marked(markdownContent) // plain HTML string
}

// Static site build
export async function buildStaticSite(rootDir: string, outDir: string) {
  const routes = await loadRoutes(rootDir)

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  for (const [route, mdPath] of Object.entries(routes)) {
    const absPath = path.resolve(rootDir, mdPath as any)
    if (!fs.existsSync(absPath)) continue

    const markdownContent = fs.readFileSync(absPath, 'utf-8')
    const html = renderMarkdownToString(markdownContent)

    // Output file path
    const filePath =
      route === '/' ? path.join(outDir, 'index.html') : path.join(outDir, `${route.replace(/^\//, '')}.html`)

    fs.writeFileSync(filePath, html as string)
    console.log(`✅ Built ${route} → ${filePath}`)
  }

  console.log('🎉 SSG build complete!')
}
