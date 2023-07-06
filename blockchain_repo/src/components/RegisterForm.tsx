import React, { FormEvent, useState } from 'react'
import { IonButton, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react'
import { eye, eyeOff } from 'ionicons/icons'
import { API_ORIGIN } from '../api'

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [viewPW, setViewPW] = useState(false)

  function viewPassword() {
    viewPW === true ? setViewPW(false) : setViewPW(true)
  }

  function SubmitLoginForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    fetch(API_ORIGIN + '/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <form onSubmit={SubmitLoginForm}>
      <IonItem>
        <IonLabel>Username:</IonLabel>
        <IonInput
          type="text"
          value={username}
          placeholder="Enter Here"
          maxlength={255}
          onIonChange={(e) => setUsername(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Password:</IonLabel>
        <IonInput
          type={viewPW ? 'text' : 'password'}
          value={password}
          placeholder="Enter Here"
          maxlength={255}
          onIonChange={(e) => setPassword(e.detail.value!)}
        ></IonInput>
        {password !== '' ? (
          <IonIcon
            slot="end"
            ios={viewPW ? eyeOff : eye}
            md={viewPW ? eyeOff : eye}
            onClick={viewPassword}
          />
        ) : (
          ''
        )}
      </IonItem>
      <IonItem>
        <IonLabel>Repeat Password:</IonLabel>
        <IonInput
          type={viewPW ? 'text' : 'password'}
          value={password2}
          placeholder="Enter Here"
          maxlength={255}
          onIonChange={(e) => setPassword2(e.detail.value!)}
        ></IonInput>
        {password2 !== '' ? (
          <IonIcon
            slot="end"
            ios={viewPW ? eyeOff : eye}
            md={viewPW ? eyeOff : eye}
            onClick={viewPassword}
          />
        ) : (
          ''
        )}
      </IonItem>
      <IonItem>
        <IonLabel>Email:</IonLabel>
        <IonInput
          type="email"
          value={email}
          placeholder="Enter Here"
          maxlength={255}
          onIonChange={(e) => setEmail(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <IonButton type="submit">Register </IonButton>
    </form>
  )
}

export default RegisterForm
