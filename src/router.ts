import type { Route, url } from '../types/routes.js'
import { mount } from 'ripple'

let routes: Route = {}

export function setRoutes(newRoutes: Route): void {
    routes = newRoutes
}

export function navigate(to: url): void {
    window.history.pushState({}, '', to)
    renderRoute(to)
}

export function renderRoute(p: url): void {
    const target = document.getElementById('root') as HTMLDivElement
    const cleanUrl = p.startsWith('/') ? p : `/${p}`
    target.innerHTML = ''
    const Component = routes[cleanUrl]
    if (Component) {
        mount(Component, {
            target: target
        })
    } else {
        target.innerHTML = `<h1>404 - Not Found</h1>`
    }
}

window.addEventListener('popstate', () => {
    renderRoute(window.location.pathname as url)
})
