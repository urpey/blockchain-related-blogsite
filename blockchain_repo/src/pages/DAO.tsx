import React, { useEffect, useMemo, useState } from 'react'
import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonList,
  IonButton,
} from '@ionic/react'
import PageHeader from '../components/PageHeader'
import { add, closeOutline, checkmarkOutline, handRightOutline, handRightSharp} from 'ionicons/icons'

import { API_ORIGIN } from '../api'
import { routes } from '../Routes'
import './DAO.css'




const DAO: React.FC = () => {
  const [segment, setSegment] = useState('Articles')
  return (
    <IonPage>
      <PageHeader name="DAO" />
      <IonContent>
        {/*-- Segment with default selection --*/}
        <IonSegment
          onIonChange={(e) => setSegment(e.detail.value || 'Articles')}
          value={segment}
        >
          <IonSegmentButton value="Articles">
            <IonLabel>Article Approve</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Members">
            <IonLabel>Member's Vote</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Others">
            <IonLabel>Others</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {
          {
            Articles: <Articles />,
            Members: <Members />,
            Others: <Others />,
          }[segment]
        }
      </IonContent>
    </IonPage>
  )
}

// let user = {
//   id:1,
//   userName: '123'
type PendingArticle = {
  article_id: number
  version_id: number
  title: string
  content: string
  ref_site: string
  updated_at: string
  author: string
}

const Articles = () => {
  // const { id } = useParams<{ id: string }>()
  // const [content, setContent] = useState('')
  const [ data, setData ] = useState<PendingArticle[]>([])
  useEffect(() => {
    ( async () => {
      let res = await fetch(API_ORIGIN + '/article/pending');
      let result = await res.json();
      // console.log(result);
      // let serverArticles = [1, 2, 3, 4, 5, 6, 7, 8]
    
      setData(result)
      
      // let content = json.content
      // let parser = new DOMParser()
      // let doc = parser.parseFromString
    })()
  },[])
// const [ strings, setStrings ] = useState<string>("hello")
  // useEffect(() => {
  //   console.log(strings);
  // },[strings])
  return (
    <>
      {/* <IonInput value={strings} placeholder="Enter Input" onIonChange={e => setStrings(e.detail.value!)} clearInput></IonInput> */}
      <IonList className="DAO">
      {data.sort((a,b)=>b.version_id - a.version_id).map((article, ) => (
        <IonItem key={article.version_id} href={ routes.edit(article.article_id, article.version_id) }>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{article.title}</IonCardTitle>
              <IonCardSubtitle>[a{article.article_id},v{article.version_id}]</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
            <div
                className="dao-article"
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
            >
            </div>
            {/* {article.content} */}
            </IonCardContent>
            
          </IonCard>
        </IonItem>

      ))}
      </IonList>
    </>
  )
}
// need to add onClick function
const Members = () => {
  const [editors, setEditors] = useState<any[]>([]) 
  useEffect(() => {
    const fetchEditors = async () => {
      const res = await fetch(API_ORIGIN + '/getEditors')
      const data = (await res.json()).result
      if (res.ok) {
        setEditors(data)
      }
    }
    fetchEditors()
  },[])

  const genEditors = useMemo(()=> {
    return editors.map((editor, index) => {
      return <IonItem key={index}>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>{editor.username}</IonLabel>
    </IonItem>
    })
  }, [editors])
  return (
    <>
    {
      editors.length > 0 && genEditors
    }
  
      {/*-- fab placed to the (vertical) center and end --*/}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton>
            <IonIcon icon={handRightSharp} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  )
}

const Others = () => {
  return (
      <>
      <IonItem>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>Lower the voting mechanism to 50%</IonLabel>
    </IonItem>
    <IonItem>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>Marketing event 2k tokens</IonLabel>
    </IonItem>
    <IonItem>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>Reward Editors 30k tokens</IonLabel>
    </IonItem>
    <IonItem>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>Charity event 5k tokens</IonLabel>
    </IonItem>
    <IonItem>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>Reward 1000tokens for marketing team</IonLabel>
    </IonItem>
    <IonItem>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>Office expansion 10k tokens</IonLabel>
    </IonItem>
    <IonItem>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>Beach barbecue event</IonLabel>
    </IonItem>
    <IonItem>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>Reward 5000tokens to Arthur John</IonLabel>
    </IonItem>
    <IonItem>
      <IonButton slot= "end" >
        <IonIcon className="checkmark-outline"icon={checkmarkOutline}></IonIcon>
        </IonButton>
      <IonButton slot= "end" >
        <IonIcon className="close-outline"icon={closeOutline}></IonIcon>
      </IonButton>
      <IonLabel>Crypto Drinks</IonLabel>
      </IonItem>
      {/*-- fab placed to the (vertical) center and end --*/}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton>
            <IonIcon icon={handRightOutline} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  )
}

export default DAO
