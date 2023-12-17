import "./styles.scss";

import {
  MapContainer,
  ScaleControl,
  TileLayer,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";

import { API } from "../../constant/config";
import BaseMap from "../../components/map/BaseMap";
import ButtonDisplayLayer from "../../components/map/ButtonDisplayLayer";
import ContainerLayer from "../../components/map/ContainerLayer";
import Favicon from "react-favicon";
import FullScreen from "../../components/map/FullScreen";
import NoteTable from "../../components/map/NoteTable";
import SearchField from "../../components/map/Search";
import { useSelector } from "react-redux";

function Map() {
  const ref = useRef(null);
  const { area, setting, baseMap } = useSelector((state) => state.dataMap);
  const [settingMap] = setting;

  const center = useMemo(() => {
    const defaultCenter = ["10.355270", "106.107159"];

    if (!!area.lat && !!area.lng) {
      return [area?.lat, area?.lng];
    }

    if (!!settingMap) {
      return [settingMap?.lat, settingMap?.lng];
    } else {
      return defaultCenter;
    }
  }, [area.lat, area.lng, settingMap]);

  const zoom = useMemo(() => {
    return area?.zoom || settingMap?.zoom;
  }, [area?.zoom, settingMap?.zoom]);

  useEffect(() => {
    document.title = settingMap?.title;
  }, [settingMap?.title]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setUrl(
        baseMap?.url ||
          settingMap?.map?.url ||
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      );
    }
  }, [baseMap?.url, settingMap?.map?.url]);

  return (
    <div className="container">
      {settingMap?.icon && (
        <Favicon url={API + "/upload" + settingMap.icon}></Favicon>
      )}
      <MapContainer
        className="map_container"
        center={center}
        zoom={zoom || 6}
        zoomControl={false}
        zoomSnap
      >
        <SearchField />
        <TileLayer
          ref={ref}
          url={
            baseMap?.url ||
            settingMap?.map?.url ||
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />
        <ZoomControl position="topleft" />
        <ScaleControl position="bottomright" />
        <FullScreen />
        <ContainerLayer zoom={zoom} />
        <LocationMarker center={center} zoom={zoom} />
        <BaseMap />
      </MapContainer>
      <NoteTable />
      <ButtonDisplayLayer />
    </div>
  );
}

export default Map;

function LocationMarker({ center, zoom }) {
  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, zoom]);

  return null;
}
