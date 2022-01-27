import { memo, useMemo } from "react";
import { useSelector } from "react-redux";

import Vector from "../../layers/Vector";
import Raster from "../../layers/Raster";

function ContainerLayer() {
  const { layers } = useSelector((state) => state.dataMap);
  const render = useMemo(() => {
    return layers.map((item) => {
      if (item.style === "Vector") {
        return <Vector key={item.id} path={item.path} data={item} />;
      }
      if (item.style === "Raster") {
        return <Raster key={item.id} data={item} />;
      }
      return null;
    });
  }, [layers]);
  return <>{render}</>;
}

export default memo(ContainerLayer);
