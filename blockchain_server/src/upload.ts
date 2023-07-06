import formidable from 'formidable'
import { mkdirSync } from 'fs'

export let uploadDir = 'uploads'

mkdirSync(uploadDir, { recursive: true })

export let form = formidable({
  uploadDir,
  allowEmptyFiles: false,
  maxFiles: 2,
  maxFileSize: 200 * 1024 ** 2,
  keepExtensions: true,
  multiples:true,
  filter: part => part.mimetype?.startsWith('image/') || false,
})

export function extractFile(
  file: formidable.File[] | formidable.File,
): formidable.File |  formidable.File[] | undefined {
  return Array.isArray(file) ? (file as formidable.File[]): file
}


export function ImageArray(files: formidable.File[] | formidable.File) {
  if(Array.isArray(files)){
    return files
  } 
  let ImageArray = []
  ImageArray.push(files)
  return ImageArray
}


export function ReturnFieldString(string:string | string[]){
  if(Array.isArray(string)){
    return string[0]
  }

  return string
}


export function ReturnFieldStringArray(string:string | string[]){
  if(!Array.isArray(string)){
    let stringArray = []
    stringArray.push(string)
    return stringArray
  } 
  return string
}

export function extractSingleFile(
  file: formidable.File[] | formidable.File,
): formidable.File | undefined {
  return Array.isArray(file) ? file[0] : file
}