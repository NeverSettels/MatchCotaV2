import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function DropZone(props) {
    const {images,setImages} = props
    let temp = [...images]
  const onDrop = useCallback((acceptedFiles) => {
     
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      temp.push(file)
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
   setImages(temp) 
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className="dropbox" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}