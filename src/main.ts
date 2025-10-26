import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import loadRoutes from './loadConfig'

export function renderMarkdownToString(markdownContent: string) {
  return marked(markdownContent) 
}

export async function buildStaticSite(rootDir: string, outDir: string) {
  const routes = await loadRoutes(rootDir)
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {
      recursive: true
    })
  }
  for (const [route, mdPath] of Object.entries(routes)) {
    const absPath = path.resolve(rootDir, mdPath as any)
    if (!fs.existsSync(absPath)) {
      continue
    }
    const markdownContent = fs.readFileSync(absPath, 'utf-8')
    const html = renderMarkdownToString(markdownContent)
    const filePath =
      route === '/' ?
        path.join(outDir, 'index.html') :
        path.join(outDir, `${route.replace(/^\//, '')}.html`)
    fs.writeFileSync(filePath, html as string)
    console.log(`✅ Built ${route} → ${filePath}`)
  }
  console.log('🎉 Static Site Generation build complete!')
}
