import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { Icon } from "leaflet";
import screenfull from "screenfull";

//Thư mục
import "./styles.scss";
import image from "../../../constant/image";
import ListClassMap from "../listclassmap/ListClassMap";
import ListNoteClass from "../listnoteclass/ListNoteClass";

//Custom Icon marker
const iconMarker = new Icon({
  iconUrl: image.iconMark,
  iconSize: [30, 30],
});

function ViewMap() {
  // trạng thái hiển thị các lớp
  const [displayList, setDisPlayList] = useState(false);

  // Vị trí center của map
  const position = [51.505, -0.09];

  // Sự kiện hiển thị danh sách các lớp
  const handleDisplayList = () => {
    setDisPlayList(!displayList);
  };

  // Xử lý fullscreen
  const handleFullScreen = () => {
    screenfull.isEnabled && screenfull.toggle();
  };

  // Dữ liệu trong các lớp
  const arrayTextClassFirst = [
    "Thủy văn",
    "Địa hình",
    "Hành chính",
    "Công trình",
  ];
  const arrayTextClassSecond = [
    [
      "Lưu vực sông mê công",
      "Hệ thống sông mê công",
      "Lưu vực sông Sê San - SrêPôk",
    ],
    ["Thành phố", "Bản đồ địa hình", "Bản đồ ngập lụt 2020"],
    [
      "Ranh giới các tỉnh ĐBSCL",
      "Ranh giới các tỉnh Tây Nguyên",
      "Quần đảo Hoàng Sa - Trường Sa",
    ],
    ["Thủy điện", "Hồ chứa"],
    ["Thành phố", "Bản đồ địa hình", "Bản đồ ngập lụt 2020"],
  ];

  return (
    <div className="container">
      <MapContainer
        className="map_container"
        center={position}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* zoom bản đồ */}
        <ZoomControl position="bottomright" />
        <Marker position={position} icon={iconMarker}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <div className="wrapper_icon_fullscreen" onClick={handleFullScreen}>
          <i className="fas fa-expand"></i>
        </div>
      </MapContainer>
      {/* Các lớp */}
      <div className="icon_layer" onClick={handleDisplayList}>
        <i className="fas fa-layer-group"></i>
      </div>
      <div>
        {displayList && (
          <ListClassMap
            arrayTextClassFirst={arrayTextClassFirst}
            arrayTextClassSecond={arrayTextClassSecond}
          />
        )}
      </div>

      {/* Chú giải */}
      {displayList && <ListNoteClass />}
    </div>
  );
}

export default ViewMap;
