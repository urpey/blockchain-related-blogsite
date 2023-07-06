import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonModal,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react'
import { useLocation } from 'react-router-dom'
import './Menu.css'
import {logInOutline} from 'ionicons/icons'
import logo2 from './logo/logo2.png'
import './Menu.css'
import { AppPage } from '../types'
import { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {
  PencilPlus,
  BrandFinder,
  UserCircle,
  ThreeDRotate,
  ZodiacLibra,
  Planet,
} from 'tabler-icons-react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import { routes } from '../Routes'

const appPages: AppPage[] = [
  {
    title: 'HOME',
    url: '/page/HomePage',
    iosIcon: planetIcon(),
    mdIcon: planetIcon(),
    color: '#fff',
  },
  {
    title: 'MY ACCOUNT',
    url: '/page/UserPage',
    iosIcon: Circle(),
    mdIcon: Circle(),
    color: '#F200FE',
  },
  {
    title: 'COMPOSE ARTICLE',
    url: routes.compose,
    iosIcon: pen(),
    mdIcon: pen(),
    color: '#fff',
  },
  {
    title: 'BILLBOARD',
    url: '/page/Billboard',
    iosIcon: FinderIcon(),
    mdIcon: FinderIcon(),
    color: '#fff',
  },

  {
    title: 'BLOCK EXPLORER',
    url: '/page/BlockExp',
    iosIcon: Block(),
    mdIcon: Block(),
    color: '#FCE927',
  },
  {
    title: 'DAO',
    url: '/page/DAO',
    iosIcon: Libra(),
    mdIcon: Libra(),
    color: '#33B8C1',
  },
  // {
  //   title: 'SETTINGS',
  //   url: '/page/UserSetting',
  //   iosIcon: SettingAuto(),
  //   mdIcon: SettingAuto(),
  //   color: '#fff',
  // },
]

function planetIcon() {
  return (
    <div slot="start">
      <Planet />
    </div>
  )
}

function pen() {
  return (
    <div slot="start">
      <PencilPlus />
    </div>
  )
}

function FinderIcon() {
  return (
    <div slot="start">
      <BrandFinder />
    </div>
  )
}

// function SettingAuto() {
//   return (
//     <div slot="start">
//       <SettingsAutomation />
//     </div>
//   )
// }

function Circle() {
  return (
    <div slot="start">
      <UserCircle />
    </div>
  )
}

function Block() {
  return (
    <div slot="start">
      <ThreeDRotate />
    </div>
  )
}

function Libra() {
  return (
    <div slot="start">
      <ZodiacLibra />
    </div>
  )
}
// function Day(){
//   return(
//     <div slot='start'>
//       <Bulb color={"#73849a"}/>
//     </div>
//   );
// }
// function night(){
//   return(
//     <div slot='start'>
//       <Moon color={"#73849a"}/>
//     </div>
//   )
// }
// function edit() {
//   return (
//     <div slot="start">
//       <EditCircle color={'#73849a'} />
//     </div>
//   )
// }

// function capitalizeFirstLetter(string: string) {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }

const Menu: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const username = useSelector((state: RootState) => state.user.user.username)
  const role = useSelector((state: RootState) => state.user.user.role)
  // const history = useHistory()
  // const dispatch = useDispatch<RootDispatch>()
  // const [dayTheme, setDayClass] = useState(false);
  // const [nightTheme, setNightClass] = useState(true);

  function switchForm() {
    showLogin === true ? setShowLogin(false) : setShowLogin(true)
  }
  const location = useLocation()
  useEffect(() => {
    if (role === 'user' || role === 'editor') {
      setShowModal(false)
    }
  }, [role])
  return (
    <IonMenu
      contentId="main"
      type="overlay"
      swipeGesture={true}
      class="ion-menu-split-container"
    >
      <IonContent>
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => {
            setShowModal(false)
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowModal(false)}>
                  {' '}
                  Cancel{' '}
                </IonButton>
              </IonButtons>
              <IonTitle>{showLogin ? 'Login' : 'Register'}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={switchForm}>
                  {!showLogin ? 'Login Here!' : 'Register Now!'}
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {showLogin ? <LoginForm /> : <RegisterForm />}
          </IonContent>
        </IonModal>
        <IonList id="inbox-list">
          <IonListHeader className="logoHeader">
            <img className="logoSize" src={logo2} alt="OKD logo"></img>
            <IonTitle hidden={!isPlatform('desktop')}>
              <b className="logoTitle md">OK_DAO</b>
            </IonTitle>
            <IonTitle hidden={isPlatform('desktop')}>
              <b className="logoTitle ios">OKD</b>
            </IonTitle>
          </IonListHeader>
          <IonMenuToggle className="" key="0" autoHide={false}>
            {role === 'guest' ? (
              <IonItem
                onClick={() => {
                  setShowModal(true)
                }}
                className="ion-menu-toggle"
                routerLink={location.pathname}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon
                  className="register-button"
                  color="light"
                  slot="start"
                  ios={logInOutline}
                  md={logInOutline}
                />
                <IonLabel className="register-text">Login / Register</IonLabel>
              </IonItem>
            ) : (
              <IonItem className="ion-menu-toggle">
                <IonLabel>
                  <p className="role-label">Welcome {username}, </p>
                  <p className="role-label">
                    You are logged in as an '{role}'.
                  </p>
                </IonLabel>
              </IonItem>
            )}
          </IonMenuToggle>
          <IonMenuToggle key={1} autoHide={false}></IonMenuToggle>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index + 1} autoHide={false}>
                <IonItem
                  color={appPage.color}
                  className={`${appPage.title} + '' + 
                    ${location.pathname === appPage.url ? 'selected' : ''}`}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  {typeof appPage.mdIcon === 'string' ? (
                    <IonIcon
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                    />
                  ) : (
                    appPage.mdIcon
                  )}
                  <IonLabel className="menu-item-label">{`${appPage.title}`}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonLabel className="footer-text">@OPEN KNOWLEDGE DAO</IonLabel>

        {/* <IonItem>
          {role === 'guest' ? (
            <></>
          ) : (
            <IonItem
              button
              lines="none"
              detail={false}
              onClick={(e) => {
                dispatch(logoutThunk())
              }}
            >
              <IonIcon
                className="logout-icon"
                slot="start"
                icon={logOutOutline}
              ></IonIcon>
              <IonLabel className="logout-text">LOG OUT</IonLabel>
            </IonItem>
          )}
        </IonItem> */}
      </IonFooter>
    </IonMenu>
  )
}

// Language selector
// {/* <IonSelect interface="popover" placeholder="LANGUAGE">
//             <IonSelectOption value="English">English</IonSelectOption>
//             <IonSelectOption value="Chinese">Chinese</IonSelectOption>
//           </IonSelect> */}
export default Menu
