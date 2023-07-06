import {
  IonButton,
  IonButtons,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLoading,
  IonPage,
  IonToast,
  isPlatform,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_ORIGIN } from '../api'
import PageHeader from '../components/PageHeader'
import {
  Edit,
  Share,
  Star,
  StarOff,
  ThumbDown,
  ThumbUp,
} from 'tabler-icons-react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import styles from './ViewArticlePage.module.css'

const ViewArticlePage: React.FC = () => {
  const isDesktop = isPlatform('desktop')

  const { id } = useParams<{ id: string }>()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [editor, setEditor] = useState('')
  const [refSite, setRefSite] = useState('')
  const [loading, setLoading] = useState(true)
  const username = useSelector((state: RootState) => state.user.user.username)
  const role = useSelector((state: RootState) => state.user.user.role)
  const [liked, setLiked] = useState(false)
  const [stared, setStared] = useState(false)
  const [likeToast, setLikeToast] = useState(false)
  const [saveToast, setSaveToast] = useState(false)
  const [shareToast, setShareToast] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(API_ORIGIN + `/article/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json.error) {
        } else {
          setLoading(false)
        }
        setTitle(json.title)
        let content = json.content
        let parser = new DOMParser()
        let doc = parser.parseFromString(content, 'text/html')
        let imgList = doc.querySelectorAll('img')

        imgList.forEach((img, i) => {
          let originalSrc = img.src;
          if (originalSrc.startsWith("/uploads/")) {
          content = content.replace(/\/uploads\//g, API_ORIGIN + '/uploads/')
          }})

        setContent(content)
        setAuthor(json.author)
        setEditor(json.editor)
        setRefSite(json.ref_site)
      })
      .catch((e) => console.log(e))
  }, [id])

  function like() {
    setLiked(true)
    setLikeToast(true)
  }
  function unlike() {
    setLiked(false)
    setLikeToast(true)
  }
  function save() {
    setStared(true)
    setSaveToast(true)
  }
  function unsave() {
    setStared(false)
    setSaveToast(true)
  }

  return (
    <IonPage>
      <PageHeader name="@OPEN_KNOWLEDGE DAO"></PageHeader>
      {/* <IonContent fullscreen>
        <div>Author:{author}</div>
        <div>Editor:{editor}</div>
        <div>
          Reference Site: <a href={refSite}>{refSite}</a>{' '}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </IonContent> */}
      <IonContent fullscreen>
        {loading ? (
          <IonLoading
            isOpen={loading}
            message={'Loading...'}
            spinner="circles"
          />
        ) : (
          <></>
        )}
        <IonItem>
          <IonCardTitle className={styles.title}>{title}</IonCardTitle>
          <IonButtons className={isDesktop?'':styles.verticleButtons} slot="end">
            {stared ? (
              <IonButton onClick={(e) => unsave()} color="primary">
                <StarOff />
              </IonButton>
            ) : (
              <IonButton onClick={(e) => save()} color="primary">
                <Star />
              </IonButton>
            )}
            {role === 'editor' || username === author? (
              <IonButton href="editor/edit" color="secondary">
                {' '}
                <Edit />
              </IonButton>
            ) : (
              <></>
            )}
            {liked ? (
              <IonButton onClick={(e) => unlike()} color="primary">
                <ThumbDown />
              </IonButton>
            ) : (
              <IonButton onClick={(e) => like()} color="primary">
                <ThumbUp />
              </IonButton>
            )}
            <IonButton
              color="primary"
              onClick={(e) =>{
                navigator.clipboard.writeText(String(window.location.href));
                setShareToast(true)}
              }
            >
              <Share />
            </IonButton>
          </IonButtons>
        </IonItem>
        <IonItem className={styles.details}>
          <IonCardContent>
            <img
              className={styles.icon}
              src="https://i.redd.it/cfjfhl36mue61.jpg"
              alt="icon"
            />
          </IonCardContent>
          <IonCardContent>
            作者：{author} <br></br>
          </IonCardContent>
        </IonItem>

        <blockquote>
          編輯：{editor} <br></br>
        </blockquote>
        <blockquote>
          參考網址：<a href={refSite}>{refSite}</a>
        </blockquote>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <IonToast
          isOpen={likeToast}
          onDidDismiss={() => setLikeToast(false)}
          position="top"
          message={liked ? 'You have liked this article' : 'Like Cancelled'}
          duration={1000}
        />
        <IonToast
          isOpen={saveToast}
          onDidDismiss={() => setSaveToast(false)}
          position="top"
          message={stared ? 'You have saved this article' : 'Save Cancelled'}
          duration={1000}
        />
         <IonToast
          isOpen={shareToast}
          onDidDismiss={() => setShareToast(false)}
          position="top"
          message={'Link copied in Clipboard'}
          duration={1000}
        />
      </IonContent>
    </IonPage>
  )
}

export default ViewArticlePage
