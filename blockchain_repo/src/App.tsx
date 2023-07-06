import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import Menu from './components/Menu'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import ViewArticlePage from './pages/ViewArticlePage'
import HomePage from './pages/HomePage'
import ComposeArticlePage from './pages/ComposeArticlePage'
import DAO from './pages/DAO'
import BlockExp from './pages/BlockExp'
import EditArticlePage from './pages/EditArticlePage'
import UserSetting from './pages/UserSetting'
import UserPage from './pages/UserPage'
import BillboardPage from './pages/Billboard'
import { routes } from './Routes'
import UserProfile from './pages/UserProfile'
import UserSaveFolder from './pages/UserSaveFolder'

setupIonicReact()

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/HomePage" />
            </Route>
            <Route path="/page/HomePage" component={HomePage} />
            <Route path={routes.compose} component={ComposeArticlePage} />
            <Route path={routes.edit(':id',':version')} exact component={EditArticlePage} />
            <Route path="/page/Billboard" component={BillboardPage} />
            <Route path="/page/UserSetting" component={UserSetting} />
            <Route path="/page/UserPage" component={UserPage} />
            <Route path="/page/BlockExp" component={BlockExp} />
            <Route path="/page/DAO" component={DAO} />
    
            {/* <Route path="/page/:name" exact={true}>
              <Page/>
            </Route> */}
              <Route path={routes.view(':id')} exact>
              <ViewArticlePage />
            </Route>
            <Route path={routes.profile(':id')} exact>
              <UserProfile />
            </Route>
            <Route path={routes.saveFolder(':id')} exact>
              <UserSaveFolder />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

export default App

// function App() {
//   // const href = useHref('/123')
//   // const location = useLocation()
//   // console.log({ href, location })
//   return (
//     <div className="App">
//       <AppHeader />
//       {/* <AppRoutes /> */}
//     </div>
//   )
// }
