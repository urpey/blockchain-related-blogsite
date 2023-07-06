import { IonLoading } from '@ionic/react'
import { useState, useEffect } from 'react'
import { API_ORIGIN } from '../api'
import { useToken } from './useToken'

export function useGet<T extends { error?: string }>(
  name: string,
  url: string,
  defaultValue: T
) {
  const [json, setJson] = useState(defaultValue)
  const token = useToken()

  useEffect(() => {
    fetch(API_ORIGIN + url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }) // Change Route to fetch all articles
      .then((res) => res.json())

      .then((json) => {
        console.log(json)
        setJson(json)
      })
      .catch((e) => console.log(e))
  }, [url,token])

  function render(fn: (json: T) => any) {
    if (json.error === 'loading') {
      return (
        <IonLoading isOpen message={'Loading ' + name + ' ...'}></IonLoading>
      )
    }
    if (json.error) {
      return <p>{json.error}</p>
    }
    return fn(json)
  }

  return { json, render }
}
