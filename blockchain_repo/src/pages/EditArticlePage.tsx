
import React, { useEffect, useState } from 'react'
import {
  IonPage,
  IonButton,
  IonContent,
  IonLoading,
  useIonToast,
} from '@ionic/react'
import PageHeader from '../components/PageHeader'
import { useParams } from 'react-router'
import { API_ORIGIN } from '../api'
import { ArticleDraft, ArticleEditor } from '../components/ArtticleEditor'
import { compressMobilePhoto, dataURItoBlob } from '@beenotung/tslib/image'
import sanitize from 'sanitize-html'
import { useToken } from '../hooks/useToken'

const EditArticlePage: React.FC = () => {
  const { id,version} = useParams<{ id: string,version: string }>()
  const [ loading, setLoading ] = useState(true)
  const [ content,setContent] = useState('')
  const [ title,setTitle] = useState('')
  const [ ref_site,setRef_site] = useState('')
  // const editorId = useSelector((state: RootState) => state.user.user.id)
  // const post = usePost() 
  const [presentToast] = useIonToast()

  

  const token = useToken()
  
  // type AproveArticle = {
  //   article_id: number
  //   version_id: number
  //   title: string
  //   content: string
  //   ref_site: string
  //   updated_at: string
  //   author: string
  //   editor_id: string
  // }

  function Approve(){
  

    // const body = {
    //   article_id:id,
      
    //   version_id: version,
    //   title,
    //   content,
    //   ref_site,
    //   editor_id: editorId,
    
    // }
    
    // post('approve article', `/article/${id}/version/${version}/approve`, body,json => {console.log(json)})

    let parser = new DOMParser()
        let doc = parser.parseFromString(content, 'text/html')
        let imgList = doc.querySelectorAll('img')

        let formData = new FormData()
        formData.append('articleId', id)
        let ps: Promise<void>[] = []

        let jsonFormData = {
          image: [] as File[],
          'image-src': [] as string[],
          content: '',
        }
        let article = content
        imgList.forEach((img, i) => {
          let originalSrc = img.src;
          if (!originalSrc.startsWith("data:")) {
            return;
          }
          let tmpSrc = "/image/idx/" + i;
          article = article.replace(originalSrc, tmpSrc);
          ps.push(
            compressMobilePhoto({ image: originalSrc }).then((dataUrl) => {
              let blob: Blob = dataURItoBlob(dataUrl)
              let ext = blob.type.split('/').pop()
              let filename = `image-${i}.${ext}-version${version}`
              let file = new File([blob], filename, {
                type: blob.type,
                lastModified: Date.now(),
              })
              formData.append('image', file)
              formData.append('imageSrc', tmpSrc)

              jsonFormData.image.push(file)
              jsonFormData['image-src'].push(tmpSrc)
            })
          )
        })
        let sanitizedContent = sanitize(content, {
          allowedTags: [...sanitize.defaults.allowedTags, 'img'],

        })
        formData.set('content', sanitizedContent)
        formData.set('title', title)
        formData.set('refSite', ref_site)
        formData.set('version', version)

        jsonFormData.content = content


        Promise.all(ps)
          .then(() =>{
          console.log('test fetch')
          return fetch(API_ORIGIN + `/article/${id}/version/${version}/approve`, {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + token,
              },
              body: formData,
            })
          })
          .then((res) => res.json())
          .catch((err) => ({ error: String(err) }))
          .then((json) => {
            console.log('fetch body:', jsonFormData)
            console.log('fetch result:', json)
            setTitle('')
            setContent('')
            setRef_site('')
            // history.push("/page/HomePage")
            presentToast('Approved', 2000)
            
          })
          
      .catch((err) => ({ error: String(err) }))
  }
  function amend(){}
  function ban(){}
  
  useEffect(() => {
    setLoading(true)
    fetch(API_ORIGIN + `/article/${id}/version/${version}`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json)
        
        if (json.error) {
        }else{
          setLoading(false)
        }

        setTitle(json.title)
        let content = json.content
        let parser = new DOMParser()
        let doc = parser.parseFromString (content, 'text/html')
        let imgList = doc.querySelectorAll('img')

        imgList.forEach((img) => {
          let originalSrc = img.src;
        if(originalSrc.startsWith("/uploads/")){
          content = content.replace(/\/uploads\//g, API_ORIGIN + '/uploads/')
        }})
        

        setContent(json.content)
        setTitle(json.title)
        setRef_site(json.ref_site)

        // presentToast('successfully approve', 2000)

        // let content = json.content
        // content = content.replace(/\/uploads\//g, API_ORIGIN + '/uploads/')
        // setContent(content)
        // setAuthor(json.author)
        // setEditor(json.editor)
        // setRefSite(json.ref_site)
      })
      .catch((e) => console.log(e))
  },[id,version])

  return (
    <IonPage>
      <PageHeader name="Editor" />
      <IonContent fullscreen>
        {loading ?(
          <IonLoading
            isOpen={loading}
            message={'Loading...'}
            spinner="circles"
          />
        ) : (
          <></>
        )}
        
        <ArticleEditor
        article={{title,ref_site,content}}
        setArticle={(article: ArticleDraft) => {console.log(article)}}
        ></ArticleEditor>
        <IonButton onClick={Approve}>Approve</IonButton>
        <IonButton onClick={amend} color="success">Amend</IonButton>
        <IonButton onClick={ban} color="danger">Ban</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default EditArticlePage

