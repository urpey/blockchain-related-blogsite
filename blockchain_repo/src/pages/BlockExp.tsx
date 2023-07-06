import {
  IonContent,
  IonFooter,
  IonPage,

} from '@ionic/react'
import React from 'react'
import PageHeader from '../components/PageHeader'
import './blockExp.css'

const BlockExp: React.FC = () => {

  let iframeSource = '<iframe class="iotaDiv" src="https://explorer.iota.org/mainnet/"></iframe>'
  return (
    <IonPage>
      <PageHeader name="BLOCK_EXPLORER " />
      <IonContent fullscreen>
      <div dangerouslySetInnerHTML={{__html: iframeSource}}></div>;
      </IonContent>
      <IonFooter>
        <div className='IOTAFooter'> Retrieved From: https://explorer.iota.org/mainnet/</div>
      </IonFooter>
    </IonPage>
  )
}
export default BlockExp
