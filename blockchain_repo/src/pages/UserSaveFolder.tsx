import {
    IonCardContent,
    IonContent,
    IonItem,
    IonPage,
  } from '@ionic/react'
  import React from 'react'
  import { useSelector } from 'react-redux'
  import PageHeader from '../components/PageHeader'
  import { RootState } from '../redux/state'
  import styles from './userPage.module.css'
  
  const UserSaveFolder: React.FC = () => {
    // const username = 'admin'
    // const [username, setUsername] = useState('')
  
    const username = useSelector((state: RootState) => state.user.user.username)
    // const { json } = useGet<Article[]>('/', [])
  
    return (
      <IonPage>
        <PageHeader name="My Account"/>
        <IonContent>
        <IonItem className={styles.details}>
            <IonCardContent>
              <img
                className={styles.icon}
                src="https://picsum.photos/50/50"
                alt=""
              />
            </IonCardContent>
            <IonCardContent className={styles.detail}>
              名字：{username} <br></br>
              介紹： 'safhsdjfasdnaskdnasdasjkfndsfsdfdsfsdfdsfsdfsdffgdfsgdsfjgiodsfgjsdfkjsdkfjsdpfjsdpfjsadkjfsdkfsdjfsdfas'
            </IonCardContent>
          </IonItem>
  
      
        </IonContent>
      </IonPage>
    )
  }
  
  export default UserSaveFolder
  