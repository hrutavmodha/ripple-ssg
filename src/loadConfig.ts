import path from "path";
import { pathToFileURL } from "url";

export async function loadUserRoutes(rootDir: string) {
  const configPath = path.resolve(rootDir, "ripple.config.ts");

  const fileUrl = pathToFileURL(configPath).href;
  const configModule = await import(fileUrl);

  const routes = configModule.default;
  if (!routes || typeof routes !== "object")
    throw new Error("ripple.config.ts must export a default Routes object");

  return routes;
}
