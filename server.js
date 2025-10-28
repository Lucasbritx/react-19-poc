// Simple SSR server for React 19 POC
import { createServer } from 'vite'

async function startServer() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  const app = vite.middlewares

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template = await vite.transformIndexHtml(url, `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>React 19 SSR POC</title>
          </head>
          <body>
            <div id="root"><!--ssr-outlet--></div>
            <script type="module" src="/src/main.jsx"></script>
          </body>
        </html>
      `)

      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')

      const appHtml = await render(url)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  const port = 3000
  vite.listen(port)
  console.log(`React 19 SSR server running at http://localhost:${port}`)
}

startServer()
