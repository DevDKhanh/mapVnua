import {useState, useCallback} from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'

import ControllerEdit from './ControllerEdit'
import MoveRaster from './MoveRaster'
import style from './EditRaster.module.scss'

function EditRaster({file, setCoordinates, onClose}) {
  const step = 0.01
  const [size, setSize] = useState({h: 1, w: 1})

  const handleIncSize = useCallback((height) => {
    if (height) {
      setSize((prev) => ({...prev, h: prev.h + step}))
      return
    }
    setSize((prev) => ({...prev, w: prev.w + step}))
  }, [])

  const handleDeccSize = useCallback((height) => {
    if (height) {
      setSize((prev) => ({...prev, h: prev.h - step}))
      return
    }
    setSize((prev) => ({...prev, w: prev.w - step}))
  }, [])

  return (
    <div className={style.main}>
      <MapContainer
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          zIndex: '1000',
        }}
        center={{lat: 10.541123895300894, lng: 106.62869548797607}}
        zoom={6}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MoveRaster file={file} size={size} setCoordinates={setCoordinates} />
      </MapContainer>
      <ControllerEdit
        onDeccSize={handleDeccSize}
        onIncSize={handleIncSize}
        size={size}
      />
      <button className={style.btnClose} onClick={onClose}>
        Đóng
      </button>
    </div>
  )
}

export default EditRaster
