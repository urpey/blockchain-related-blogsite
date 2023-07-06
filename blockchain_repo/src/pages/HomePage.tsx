import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonCol,
  IonRow,
  IonSlide,
  IonSlides,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFooter,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  isPlatform,
} from '@ionic/react'
import { useState } from 'react'
// import { Article } from 'tabler-icons-react'
import PageHeader from '../components/PageHeader'
import { useGet } from '../hooks/useGet'
import './HomePage.css'
import './dark.css'
import { routes } from '../Routes'
import moment from 'moment'
import { Article, Bookmarks, News } from 'tabler-icons-react'

type Articles = {
  id: number
  title: string
  editor: string
  content: string
  ref_site: string
  updated_at: string
  approved_at: string
}

const HomePage: React.FC = () => {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')

  const homePage = useGet<{ currentNews: Articles[]; error?: string }>(
    'trending articles',
    '/HomePageOverview',
    { currentNews: [], error: 'loading' }
  )


  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  }

  return (
    <IonPage>
      <PageHeader name="NEWS_FEED" />
      <IonHeader>
        {/* <IonToolbar className="ion-header" >
          <IonSearchbar className='search-bar'
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            showCancelButton="focus"
          ></IonSearchbar>
        </IonToolbar> */}
      </IonHeader>
      <IonContent className="ion-content" fullscreen>
        {homePage.render((json) => (
          <IonRow className="">
            <IonCol className="ion-col-hp">
              <IonItem
                lines="none"
                detail={false}
                color="okd"
                button
                onClick={() => {
                  console.log('Trending news button clicked.')
                }}
              >
                <News size={24} strokeWidth={2} color={'black'} />
                <IonLabel className="ion-left-padding">
                  <b>TRENDING ARTICLES</b>
                </IonLabel>
              </IonItem>
              {/* Trending Posts Slides */}

              {/* Mapping Card Slides */}
              {json.currentNews.length > 0 ? (
                <IonSlides pager={true} options={slideOpts}>
                  {json.currentNews.map((elem: Articles) => (
                    // elem.id < 4 ? (
                    <IonSlide className="slider-container" key={elem.id}>
                      <IonCard
                        className="ion-card"
                        button
                        // routerLink='/article/:id'
                        // href={`/article/${elem.id}`}
                        routerLink={routes.view(elem.id)}
                        onClick={() => {
                          console.log('Card 1 button clicked.')
                        }}
                      >
                        <IonCardHeader>
                          <IonCardSubtitle className="card-ref-site">
                            {elem.ref_site}
                          </IonCardSubtitle>
                          <IonCardTitle
                            className="card-title"
                            hidden={!isPlatform('desktop')}
                          >
                            {elem.title}
                          </IonCardTitle>
                          <IonCardTitle
                            className="card-title"
                            hidden={isPlatform('desktop')}
                          >
                            {elem.title}
                          </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className="ion-card-content">
                          <div
                            className="card-article-content"
                            dangerouslySetInnerHTML={{
                              __html: elem.content,
                            }}
                          ></div>

                          <IonItem
                            button
                            // routerLink={}
                            lines="none"
                            // href={`/article/${elem.id}`}
                            routerLink={routes.view(elem.id)}
                            className="ctvm-button"
                          >
                            <IonLabel slot="start">
                              <p>
                                {'Updated ' +
                                  moment(elem.approved_at)
                                    .startOf('days')
                                    .fromNow()}
                              </p>
                            </IonLabel>

                            <IonLabel className="ctvm-text" slot="end">
                              <p>VIEW MORE</p>
                            </IonLabel>
                          </IonItem>
                        </IonCardContent>
                      </IonCard>
                    </IonSlide>
                  ))}
                </IonSlides>
              ) : (
                <>No article at the moment.</>
              )}
              {/* Mapping Card Slides */}
              {/* Trending Posts Slides */}
              {/* List items for menu */}
              <IonAccordionGroup>
                <IonAccordion value="first" className="accordion-group">
                  <IonItem
                    className="accordion-title"
                    slot="header"
                    color="okd"
                    // lines="none"
                    detail={false}
                    button
                    onClick={() => {
                      console.log('Newest article  button clicked.')
                    }}
                  >
                    <Article size={24} strokeWidth={2} color={'black'} />
                    <IonLabel>
                      <b>NEWEST ARTICLES</b>
                    </IonLabel>
                  </IonItem>

                  {/* Mapping Current News Item */}
                  {json.currentNews.length > 0 ? (
                    json.currentNews.map((elem: Articles) => (
                      <IonItem
                        className="accordion-items"
                        // routeLink = 'article/:id
                        href={routes.view(elem.id)}
                        slot="content"
                        detail={false}
                        button
                        onClick={() => {
                          console.log('Newest article Item  clicked.')
                        }}
                        key={elem.id}
                      >
                        <IonLabel>{elem.title}</IonLabel>
                        <IonLabel slot="end">
                          <p>
                            {'updated ' +
                              moment(elem.approved_at)
                                .startOf('days')
                                .fromNow()}
                          </p>
                        </IonLabel>
                      </IonItem>
                    ))
                  ) : (
                    <>No Article Found</>
                  )}

                  {/* Mapping Current News Item */}
                  <IonItem
                    className="accordion-items"
                    // href=""
                    slot="content"
                    button
                    onClick={() => {
                      console.log('Newest article Item  clicked.')
                    }}
                  >
                    <IonLabel>{title}</IonLabel>
                    <IonLabel slot="end">{time}</IonLabel>
                  </IonItem>
                </IonAccordion>
                {/* <IonAccordion value="second">
                  <IonItem
                    slot="header"
                    color=""
                    lines="none"
                    button
                    onClick={() => {
                      console.log("TOP10 editors' pick button clicked.")
                    }}
                  >
                    <IonLabel>
                      <b>TOP 10 EDITORS' PICK</b>
                    </IonLabel>
                  </IonItem>
                  <IonItem
                    className="accordion-items"
                    // href=""
                    slot="content"
                    button
                    onClick={() => {
                      console.log("TOP 10 EDITORS' PICK Item  clicked.")
                    }}
                  >
                    <IonLabel>{title}</IonLabel>
                    <IonLabel slot="end">{time}</IonLabel>
                  </IonItem>
                </IonAccordion> */}
                <IonAccordion value="third">
                  <IonItem
                    slot="header"
                    color="okd"
                    // lines="none"
                    button
                    onClick={() => {
                      console.log('Other News button clicked.')
                    }}
                  >
                    <Bookmarks size={24} strokeWidth={2} color={'black'} />
                    <IonLabel>
                      <b>SAVED TOPICS</b>
                    </IonLabel>
                  </IonItem>
                  <IonItem
                    className="accordion-items"
                    // href=""
                    slot="content"
                    button
                    onClick={() => {
                      console.log('Other News Item  clicked.')
                    }}
                  >
                    <IonLabel>{title}</IonLabel>
                    <IonLabel slot="end">{time}</IonLabel>
                  </IonItem>
                </IonAccordion>
              </IonAccordionGroup>

              {/* List items for menu */}
            </IonCol>
          </IonRow>
        ))}
      </IonContent>

      <IonFooter>
        {/* <IonToolbar>Search Text: {searchText ?? '(none)'}</IonToolbar> */}
      </IonFooter>
    </IonPage>
  )
}

export default HomePage
