import { IonItem, IonLabel, IonInput } from '@ionic/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


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


export type ArticleDraft = {
  title: string
  ref_site: string
  content: string
}

export function ArticleEditor(props: {
  article: ArticleDraft
  setArticle: (article: ArticleDraft) => void
}) {
  return (
    
    <div className="quill-container">
      <IonItem>
        <IonLabel>Title:</IonLabel>
        <IonInput
          value={props.article.title}
          placeholder="Enter Here"
          maxlength={255}
          onIonChange={(e) =>
            props.setArticle({ ...props.article, title: e.detail.value || '' })
          }
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Reference Site:</IonLabel>
        <IonInput
          value={props.article.ref_site}
          maxlength={255}
          placeholder="Enter Here"
          onIonChange={(e) =>
            props.setArticle({
              ...props.article,
              ref_site: e.detail.value || '',
            })
          }
        ></IonInput>
      </IonItem>
      <ReactQuill
        className=""
        value={props.article.content}
        onChange={(value) =>
          props.setArticle({ ...props.article, content: value || '' })
        }
        modules={quillModules}
        formats={quillFormats}
        placeholder="Type your Article Here"
      />
    </div>
  )
}
