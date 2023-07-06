

// function getEnv(name: string) {
//   let value = process.env[name]
//   if (!value) {
//     let error = Error('missing environment variable: ' + name)
//     document.body.innerText = error.message
//     throw error
//   }
//   return value
// }

// export let API_ORIGIN: string = getEnv('REACT_APP_API_ORIGIN')

let appProductionOrigins = ['https://urpey.xyz', 'https://www.urpey.xyz']

let is_production_env = appProductionOrigins.includes(window.location.origin)

export let API_ORIGIN: string = is_production_env
  ? 'https://okd.urpey.xyz'
  : 'http://localhost:8100'

  // export let IMAGE_URL_PREFIX = is_production_env
  // ? 'http://cdn.urpey.xyz.s3-website-ap-southeast-1.amazonaws.com'
  // : API_ORIGIN + '/uploads/'

export function post(url: string, body: object, cb: (json: any) => void) {
  fetch(API_ORIGIN + url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((json) => cb(json))
    .catch((e) => {
      console.error('fail to post:', { url, body })
      cb({ error: String(e) })
    })
}
