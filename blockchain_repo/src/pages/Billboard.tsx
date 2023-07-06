import {
  IonContent,
  IonItem,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { API_ORIGIN } from '../api'
import { routes } from '../Routes'


const BillboardPage: React.FC = () => {
  const [segment, setSegment] = useState('Hot')

  return (
    <IonPage>
      <PageHeader name="BILLBOARD_PAGE" />
      <IonContent>
        <IonSegment
          value={segment}
          onIonChange={(e) => setSegment(e.detail.value || 'Hot')}
          color="secondary"
        >
          <IonSegmentButton value="Hot">Hot List</IonSegmentButton>
          <IonSegmentButton value="Community">
            Community's Pick
          </IonSegmentButton>
        </IonSegment>
        {
          {
            Hot: <HotList />,
            Community: <CommunityPick />,
          }[segment]
        }
      </IonContent>
    </IonPage>
  )
}

type ServerView = {
  user_id: number
  id: number
  version_id: number
  title: string
  content: string
  ref_site: string
  updated_at: string
  author: string
}

type ServerVote = {
  is_apporve: number
  id: number
  version_id: number
  title: string
  content: string
  ref_site: string
  updated_at: string
  author: string
}
// type Article = {
//   id: number
//   title: string
//   editor: string
//   content: string
//   ref_site: string
//   updated_at: string
//   approved_at: string}

const HotList = () => {
  // const homePage = useGet<{ currentNews: Article[]; error?: string }>(
  //   'trending articles',
  //   '/HomePageOverview',
  //   { currentNews: [], error: 'loading' }
  // )

  const [view, setView] = useState<ServerView[]>([])
  useEffect(() => {
    ;(async () => {
      let res = await fetch(API_ORIGIN + '/HomePageOverview')
      let result = await res.json()
      console.log(result)
      setView(result.currentNews)
    })()
  }, [])
  return (
    <>
      <IonList className="DAO">
        {view
          .sort((a, b) => b.version_id - a.version_id)
          .map((article) => (
          <IonItem
              key={article.version_id}
              href={routes.view(article.id)}
            >
              <IonList>{article.title}</IonList>
              {/* <IonContent>
                <div
                  className="dao-article"
                  dangerouslySetInnerHTML={{
                    __html: article.content,
                  }}
                ></div>
              </IonContent> */}
            </IonItem>
          ))}
      </IonList>
    </>
  )
}

const CommunityPick = () => {

  const [vote, setVote] = useState<ServerVote[]>([])
  useEffect(() => {
    ;(async () => {
      let res = await fetch(API_ORIGIN + '/HomePageOverview')
      let result = await res.json()
      console.log(result)
      setVote(result.currentNews)
    })()
  }, [])

  return (
    <>
      <IonList className="DAO">
        {vote.map((votes) => (
          <IonItem href={routes.view(votes.id)}>
            <IonList>{votes.title}</IonList>
          </IonItem>
        ))}
      </IonList>
    </>
  )
}

export default BillboardPage
