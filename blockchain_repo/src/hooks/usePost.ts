import { useIonAlert, useIonToast } from '@ionic/react'
import { API_ORIGIN } from '../api'
import { useToken } from './useToken'

export function usePost() {
  const token = useToken()
  const [presentAlert] = useIonAlert()
  const [presentToast] = useIonToast()

  function post<T extends { error?: string }>(
    name: string,
    url: string,
    body: object,
    cb: (json: T) => void
  ) {
    fetch(API_ORIGIN + url, {
        method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }) // Change Route to fetch all articles
      .then((res) => res.json())
      .catch((e) => ({ error: String(e) }))
      .then((json) => {
        console.log(json)
        if (json.error) {
          presentAlert('fail to ' + name + ': ' + json.error, [
            { text: 'dismiss', role: 'cancel' },
          ])
        } else {
          cb(json)
          presentToast( 'approve successfully', 2000)

        }
      })
  }

  return post
}
