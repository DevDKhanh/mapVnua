import {MapContainer, TileLayer, ZoomControl} from 'react-leaflet'

import MoveRaster from './MoveRaster'
import style from './EditRaster.module.scss'
import {ElementButton} from '../CoordinatesRaster/element.js'

function EditRaster({file, setCoordinates, onClose, dataFromForm}) {
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
        <MoveRaster
          file={file}
          setCoordinates={setCoordinates}
          dataFromForm={dataFromForm}
        />
        <ZoomControl position='bottomright' />
      </MapContainer>
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
