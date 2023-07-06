import { IonContent, IonPage } from '@ionic/react'
import PageHeader from '../components/PageHeader'

const UserSetting: React.FC = () => {
  return (
    <IonPage>
      <PageHeader name="USER_SETTINGS" />
      <IonContent>
        <div className="container">
          <strong>Setting</strong>
          <p>
            Explore{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://ionicframework.com/docs/components"
            >
              UI Components
            </a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default UserSetting
