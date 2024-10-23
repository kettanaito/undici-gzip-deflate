import http from 'node:http'
import zlib from 'node:zlib'

const server = new http.Server((req, res) => {
  res.setHeader('content-encoding', 'gzip, deflate')
  res.end(zlib.deflateSync(zlib.gzipSync('hello world')))
})

server.listen(56789, async () => {
  const response = await fetch('http://localhost:56789/', {
    headers: { 'accept-encoding': 'gzip, deflate' },
  })
  const text = await response.text()
  console.assert(text === 'hello world')
})
