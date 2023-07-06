import {
  IonCardContent,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react'
import React from 'react'

import PageHeader from '../components/PageHeader'

import { RootState } from '../redux/state'
import { routes } from '../Routes'
import styles from './userPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootDispatch } from '../redux/dispatch'

import { logoutThunk } from '../redux/user/userThunk'
import { contrastOutline } from 'ionicons/icons'

const UserPage: React.FC = () => {
  // const username = 'admin'
  // const [username, setUsername] = useState('')
  const dispatch = useDispatch<RootDispatch>()
  const id = useSelector((state: RootState) => state.user.user.id)
  const username = useSelector((state: RootState) => state.user.user.username)
  const role = useSelector((state: RootState) => state.user.user.role)
  // const { json } = useGet<Article[]>('/', [])

  return (
    <IonPage>
      <PageHeader name="MY_ACCOUNT" />
      <IonContent>
        <IonItem
          className={styles.details}
          routerLink={
            typeof id === 'number' ? routes.profile(id) : '/page/UserPage'
          }
        >
          <IonCardContent>
            <img
              className={styles.icon}
              src="https://picsum.photos/50/50"
              alt=""
            />
          </IonCardContent>
          <IonCardContent className={styles.detail}>
            名字：{username}
          </IonCardContent>
        </IonItem>
        {role !== 'guest' ? (
          <IonItem routerLink={routes.saveFolder(':id')}>
            <IonLabel>Favourite Articles</IonLabel>
          </IonItem>
        ) : (
          <></>
        )}
        {role !== 'guest' ? (
          <IonItem routerLink={routes.saveFolder(':id')}>
            <IonLabel>Account Setting</IonLabel>
          </IonItem>
        ) : (
          <></>
        )}
        {role === 'guest' ? (
          <></>
        ) : (
          <IonItem
            onClick={(e) => {
              dispatch(logoutThunk())
            }}
            button
          >
            Log out
          </IonItem>
        )}
        <IonItem className="toggles">
          <IonItem lines="none" button detail={false}>
            <IonIcon className="logout-icon" icon={contrastOutline}></IonIcon>
            <IonLabel className="logout-text">LIGHT MODE</IonLabel>
          </IonItem>
        </IonItem>
      </IonContent>
    </IonPage>
  )
}

export default UserPage
