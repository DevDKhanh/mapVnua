import {useState, useCallback} from 'react'
import {MapContainer, TileLayer, ZoomControl} from 'react-leaflet'

import ControllerEdit from './ControllerEdit'
import MoveRaster from './MoveRaster'
import ViewCoordinates from '../CoordinatesRaster/ViewCoordinates.js'
import style from './EditRaster.module.scss'
import {ElementButton} from '../CoordinatesRaster/element.js'

function EditRaster({file, setCoordinates, onClose, dataFromForm}) {
  const [step, setStep] = useState(0.01)
  const [size, setSize] = useState({h: 1, w: 1})

  const handleIncSize = useCallback(
    (height) => {
      if (height) {
        setSize((prev) => ({...prev, h: prev.h + step}))
        return
      }
      setSize((prev) => ({...prev, w: prev.w + step}))
    },
    [step]
  )

  const handleDeccSize = useCallback(
    (height) => {
      if (height) {
        setSize((prev) => ({...prev, h: prev.h - step}))
        return
      }
      setSize((prev) => ({...prev, w: prev.w - step}))
    },
    [step]
  )

  return (
    <div className={style.main}>
      <MapContainer
        style={{
          height: '90%',
          width: '80%',
          position: 'absolute',
          zIndex: '1000',
        }}
        center={{lat: 10.541123895300894, lng: 106.62869548797607}}
        zoom={6}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MoveRaster file={file} size={size} setCoordinates={setCoordinates} />
        <ZoomControl position='bottomright' />
      </MapContainer>
      <ControllerEdit
        onDeccSize={handleDeccSize}
        onIncSize={handleIncSize}
        size={size}
        step={{step, setStep}}
      />
      <ViewCoordinates onClose={onClose} dataFromForm={dataFromForm} />
      <ElementButton
        position='absolute'
        top='90%'
        marginLeft='84px'
        transformY='-50%'
        onClick={onClose}
      >
        Đóng
      </ElementButton>
    </div>
  )
}

export default EditRaster
