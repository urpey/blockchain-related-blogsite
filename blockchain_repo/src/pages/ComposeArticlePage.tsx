import { IonContent, IonPage } from '@ionic/react'
import 'react-quill/dist/quill.snow.css'
import React, { FormEvent, useState } from 'react'
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react'
import { API_ORIGIN } from '../api'
import ReactQuill from 'react-quill';
import sanitize from 'sanitize-html'
import { dataURItoBlob, compressMobilePhoto } from '@beenotung/tslib/image'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/state';
import { useHistory } from 'react-router-dom';
import styles from './ComposeArticlePage.module.css'



// const ReactQuill = require('react-quill');

import PageHeader from '../components/PageHeader'

const ComposeArticlePage: React.FC = () => {
  const [title, setTitle] = useState('')
  const [refSite, setRefSite] = useState('')
  const [article, setArticle] = useState('')
  const authorId = useSelector((state:RootState)=>state.user.user.id);
  const history = useHistory();
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }



  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]
  function SubmitArticleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    fetch(API_ORIGIN + '/newArticleId', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        author_id: authorId,
      }),
    })
      .then((res) => res.json())
      .then((articleId) => {
        console.log(articleId)

        let parser = new DOMParser()
        let doc = parser.parseFromString(article, 'text/html')
        let imgList = doc.querySelectorAll('img')

        // if (imgList.length === 0) {
        //   return
        // }

        let formData = new FormData()
        formData.append('articleId', articleId.id)
        let ps: Promise<void>[] = []

        let jsonFormData = {
          image: [] as File[],
          'image-src': [] as string[],
          content: '',
        }
        let content = article
        imgList.forEach((img, i) => {
          let originalSrc = img.src;
          if (!originalSrc.startsWith("data:")) {
            return;
          }
          let tmpSrc = "/image/idx/" + i;
          content = content.replace(originalSrc, tmpSrc);
          ps.push(
            compressMobilePhoto({ image: originalSrc }).then((dataUrl) => {
              let blob: Blob = dataURItoBlob(dataUrl)
              let ext = blob.type.split('/').pop()
              let filename = `image-${i}.${ext}`
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
        formData.set('refSite', refSite)

        jsonFormData.content = content


        Promise.all(ps)
          .then(() =>{
          console.log('test fetch')
          return fetch(API_ORIGIN + '/newArticleContent', {
              method: 'POST',
              body: formData,
            })
          })
          .then((res) => res.json())
          .catch((err) => ({ error: String(err) }))
          .then((json) => {
            console.log('fetch body:', jsonFormData)
            console.log('fetch result:', json)
            setTitle('')
            setArticle('')
            setRefSite('')
            history.push("/page/HomePage")

            //     fetch(API_ORIGIN + "/newArticleContent", {
            //       method: "POST",
            //       headers: { "content-type": "application/json" },
            //       body: JSON.stringify({
            //         title,
            //         refSite,
            //         author: 1,
            //         content: sanitizedContent,
            //       }),
            //     })
            //       .then((res) => res.json())
            //       .then((json) => {
            //         console.log(json);
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //       });
            //   });
          })
      })
      .catch((err) => ({ error: String(err) }))
  }
  return (
    <IonPage>
      <PageHeader name="COMPOSE_ARTICLE" />
      <IonContent fullscreen>
      <form onSubmit={SubmitArticleForm}>
      <div className="quill-container">
        <IonItem>
          <IonLabel>Title:</IonLabel>
          <IonInput
          required
            value={title}
            placeholder="Enter Here"
            maxlength={255}
            onIonChange={(e) => setTitle(e.detail.value||'')}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Reference Site:</IonLabel>
          <IonInput
          required
            value={refSite}
            maxlength={255}
            placeholder="Enter Here"
            onIonChange={(e) => setRefSite(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <ReactQuill
          
          className={styles.reactQuill}
          value={article}
          onChange={setArticle}
          modules={quillModules}
          formats={quillFormats}
          placeholder="Type your Article Here" 
         />


        <IonButton type="submit">Submit </IonButton>
      </div>
    </form>
      </IonContent>
    </IonPage>
  )
}

export default ComposeArticlePage
