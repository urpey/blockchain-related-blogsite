import {
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useHistory } from 'react-router'
import './PageHeader.css'

export interface HeaderProps {
  name?: string
}

const PageHeader: React.FC<HeaderProps> = ({ name }) => {
  // const role = useSelector((state: RootState) => state.user.user.role)
  // const dispatch = useDispatch<RootDispatch>()
  const history = useHistory()
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{name}</IonTitle>
        {/* {role === 'guest'
        ? <></>
        :<IonButtons slot="end">
          <IonButton onClick={e=>{         
            dispatch(logoutThunk())
          }
          }><DoorExit />Log out</IonButton>
        </IonButtons>
        } */}
        <IonButtons slot="end">
          <IonButton
            color="light"
            onClick={(e) => {
              history.goBack()
            }}
          >
            BACK
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default PageHeader

// {role === 'guest'
// ? <></>
// :<IonButtons slot="end">
//   <IonButton onClick={e=>{
//     dispatch(logoutThunk())
//   }
//   }
//   >
//     <DoorExit />Log out</IonButton>
// </IonButtons>
// }
