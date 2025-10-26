import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import loadRoutes from './loadConfig.js'
import getHtmlTemplate from './template.js'
import type { Route } from '../types/routes.js'
import { __dirname } from './constants.js'

export function renderMarkdownToString(markdownContent: string) {
  return marked(markdownContent)
}

export async function buildHtml(rootDir: string, outDir: string) {
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
    const html = await renderMarkdownToString(markdownContent)
    const filePath =
      route === '/' ?
        path.join(outDir, 'index.html') :
        path.join(outDir, `${route.replace(/^\//, '')}.html`)
    
    fs.writeFileSync(filePath, html as string)
    console.log(`✅ Built ${route} → ${filePath}`)
  }
}

export async function buildStaticSite(rootDir: string, outDir: string) {
  await buildHtml(rootDir, outDir)

  const routes = await loadRoutes(rootDir)
  const routesObject: Route = {}
  for (const [route, mdPath] of Object.entries(routes)) {
    routesObject[route as any] = mdPath as any;
  }

  const routesFileContent = `window.routes = ${JSON.stringify(routesObject)};`
  fs.writeFileSync(path.join(outDir, 'routes.js'), routesFileContent)
  const routerFileContent = fs.readFileSync(path.resolve(__dirname, './router.js'), 'utf-8');
  fs.writeFileSync(path.join(outDir, 'router.js'), routerFileContent);

  for (const [route, mdPath] of Object.entries(routes)) {
    const filePath =
      route === '/' ?
        path.join(outDir, 'index.html') :
        path.join(outDir, `${route.replace(/^\//, '')}.html`)
    
    const html = fs.readFileSync(filePath, 'utf-8')
    const finalHtml = getHtmlTemplate(route, html, './routes.js', './router.js');
    fs.writeFileSync(filePath, finalHtml as string)
  }

  console.log('🎉 Static Site Generation build complete!')
}
