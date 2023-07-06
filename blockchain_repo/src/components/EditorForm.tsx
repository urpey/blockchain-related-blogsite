import '../../node_modules/react-quill/dist/quill.snow.css'
import React, { FormEvent, useEffect, useState } from 'react'
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react'
import { API_ORIGIN } from '../api'
import ReactQuill from 'react-quill'
import { dataURItoBlob, compressMobilePhoto } from '@beenotung/tslib/image'
import sanitize from 'sanitize-html'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/state'
import { useParams } from 'react-router'


const ApproveArticleForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const [refSite, setRefSite] = useState('')
  const [article, setArticle] = useState('')
  const [editor, setEditor] = useState(null)
  const { id } = useParams<{ id: string }>()
  // state check content diff
  
  
  const editorId = useSelector((state:RootState)=>state.user.user.id)

useEffect(() => {
  fetch(API_ORIGIN + 'id')
  .then((res) => res.json())
})

  function ApproveArticleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

        // (check state)
        let parser = new DOMParser()
        let doc = parser.parseFromString(article, 'text/html')
        let imgList = doc.querySelectorAll('img')
        console.log('imgs:', imgList)
        if (imgList.length === 0) {
          return
        }

        let formData = new FormData()
        formData.append('article-id', id)
        let ps: Promise<void>[] = []

        let jsonFormData = {
          image: [] as File[],
          'image-src': [] as string[],
          content: '',
        }
        let content = article
        imgList.forEach((img, i) => {
          let originalSrc = img.src
          if (!originalSrc.startsWith('data:')) {
            return
          }
          let tmpSrc = '/image/idx/' + i
          content = content.replace(originalSrc, tmpSrc)
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
              formData.append('image-src', tmpSrc)

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
        formData.set('editor_id', String(editorId))
        // (article_version)

        jsonFormData.content = content

        Promise.all(ps)
          .then(() =>
            fetch(API_ORIGIN + '/newApprovedContent', {
              method: 'POST',
              body: formData,
            })
          )
          .then((res) => res.json())
          .catch((err) => ({ error: String(err) }))
          .then((json) => {
            console.log('fetch body:', jsonFormData)
            console.log('fetch result:', json)
          })
      
      
      .catch((err) => ({ error: String(err) }))
  }

  // useEffect(() => {}, [article]);

  return (
    <form onSubmit={ApproveArticleForm}>


    </form>
  )
}

export default ApproveArticleForm
