export interface InputChangeEventDetail {
  value: string | undefined | null
}

export interface InputCustomEvent extends CustomEvent {
  detail: InputChangeEventDetail
  target: HTMLIonInputElement
}

export interface AppPage {
  url: string
  iosIcon: string | any
  mdIcon: string | any
  title: string
  color: string | any
}
