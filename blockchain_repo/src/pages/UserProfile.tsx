import {
    IonButton,
    IonCard,
    IonCardContent,
    IonContent,
    IonItem,
    IonLabel,
    IonPage,
    IonTextarea,
  } from '@ionic/react'
  import React, { useEffect, useRef, useState } from 'react'
  import { useSelector } from 'react-redux'
  import PageHeader from '../components/PageHeader'
  import { RootState } from '../redux/state'
  import styles from './userPage.module.css'
  import { Camera } from 'tabler-icons-react';
import { routes } from '../Routes'
import { API_ORIGIN } from '../api'
import { dataURItoBlob, resizeImage,toImage } from '@beenotung/tslib/image'
import { Pencil } from 'tabler-icons-react';  
  const UserProfile: React.FC = () => {
    // const userId =  useParams<{ id: string }>()
    // const username = 'admin'
    // const [username, setUsername] = useState('')
    const [icon,setIcon]=useState('')
    const [detail,setDetail]=useState('')
    const [editing,setEditing]=useState(false)
    
  const imageInput = useRef(null)
    const username = useSelector((state: RootState) => state.user.user.username)
    const id = useSelector((state: RootState) => state.user.user.id)
    const token = useSelector((state: RootState) => state.user.token)
    function selectIcon(){
            (imageInput.current as any).click()
    }
    async function uploadIcon(event:React.ChangeEvent<HTMLInputElement>) {
        let formData = new FormData()
        let file = event.target.files?.[0]
        if (!file) {
            return
        }
        let image = await toImage(file)
        let dataURL = resizeImage(image,200,200)
        let blob = dataURItoBlob(dataURL)
        file = new File([blob], file.name, {
            type: blob.type,
            lastModified: Date.now(),
        })

        formData.append('icon',file)
 if(id){
    formData.set('id',String(id))
 }
            

        fetch(API_ORIGIN + '/userIcon', {
            method: 'POST',
            body: formData,
          }).then(res=>res.json()).then(json=>{
            setIcon('')
          }).catch(e=>{
            console.log(e);   
          })
    }



    async function submitDetail() {

        
             fetch(API_ORIGIN + '/userDetail', {
            method: 'POST',
            headers:{
               authenication:'Bearer ' + token
            },
            body:detail,
          }).then(res=>res.json()).then(json=>{
            setEditing(false)
            setIcon('')
          }).catch(e=>{
            console.log(e);   
          })
        
       
    }
  useEffect(()=>{

    
    fetch(API_ORIGIN + '/userData',{
        headers:{Authorization: 'Bearer'+ token }
    }).then(res=>res.json()).then(json=>{
        console.log(json);
        setIcon(json.icon)
        setDetail(json.detail)
    })
  },[id,icon,token])
    return (
      <IonPage>
        <PageHeader name="MY_PROFILE"/>
        <IonContent>
            <IonCard>
                <IonCardContent className={styles.bigIconDiv}>       
                     <img
                className={styles.bigIcon}
                src={`${API_ORIGIN}/uploads/${icon}`}
                alt="user Icon"
              />
              <IonButton  className={styles.bigIconButton} shape='round' onClick={selectIcon}>
                <Camera/>
            </IonButton>          
               <input ref={imageInput} type='file' accept=".jpg,.jpeg,.png,.webg,.gif," onChange={e=>uploadIcon(e)} hidden/>

                </IonCardContent>
                

            </IonCard>
            <IonCard className={styles.username}>
                <IonCardContent>
                {username}
                </IonCardContent>
            </IonCard>
            <IonCard>
                {editing
                ?<IonCardContent>
                    <IonTextarea value={detail} onIonChange={(e) => setDetail(e.target.value||'')}/>
                    <IonButton className={styles.detailButton} color='dark' onClick={submitDetail}>Submit</IonButton>
                </IonCardContent>

                    
                

                :<IonCardContent>
                {detail?detail:"This user hasn't update his detail."}
                <IonButton slot='end' color='dark' className={styles.detailButton} onClick={e=>setEditing(true)}><Pencil /></IonButton>
                </IonCardContent>
                }
                
            </IonCard>
            <IonItem routerLink={routes.saveFolder(':id')}>
        <IonLabel>Published Articles</IonLabel>
        </IonItem>
        </IonContent>
      </IonPage>
    )
  }
  
  export default UserProfile
  