import React, { FormEvent, useState } from 'react'
import { IonButton, IonCardContent, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react'
import { eyeOff, eye } from 'ionicons/icons'
import { loginThunk } from '../redux/user/userThunk'
import { useDispatch } from 'react-redux'
import { RootDispatch } from '../redux/dispatch'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import styles from './loginForm.module.css'

const LoginForm: React.FC = () => {
  const [password, setPassword] = useState('')
  const [viewPW, setViewPW] = useState(false)
  const error = useSelector((state:RootState)=>state.user.error)
  const dispatch = useDispatch<RootDispatch>()

  function SubmitLoginForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form: any = event.target
    const body = {
      username: form.username.value,
      password: form.password.value,
    }
    dispatch(loginThunk(body))
  }
  function viewPassword() {
    viewPW === true ? setViewPW(false) : setViewPW(true)
  }
  return (
    <form onSubmit={SubmitLoginForm}>
      <IonItem className={error?styles.error:''} >
        <IonLabel>Username:</IonLabel>
        <IonInput
          required
          type="text"
          name="username"
          placeholder="Enter Here"
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Password:</IonLabel>
        <IonInput 
          required
          type={viewPW ? 'text' : 'password'}
          name="password"
          placeholder="Enter Here"
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
      <IonButton type="submit">Submit </IonButton>
      <IonCardContent className={styles.errorMessage}>{error?error:''}</IonCardContent>
    </form>
  )
}

export default LoginForm
