export default function getHtmlTemplate(title: string, content: string, routesFile: string, routerFile: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root">${content}</div>
  <script src="${routesFile}"></script>
  <script src="${routerFile}"></script>
</body>
</html>
`;
}
