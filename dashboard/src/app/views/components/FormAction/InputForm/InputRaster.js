import React, { useEffect, useState } from "react";

// path of folder
import InputText from "./InputText";

const InputRaster = ({ checkInput, value, onChange }) => {
  const arrayId = ["input15", "input16", "input17", "input18"];
  return (
    <div>
      <InputText
        id={arrayId[0]}
        textLabel="Tọa độ latSW"
        value={value}
        onChange={onChange}
        checkInput={checkInput}
        compare="Raster"
      />
      <InputText
        id={arrayId[1]}
        textLabel="Tọa độ lngSW"
        value={value}
        onChange={onChange}
        checkInput={checkInput}
        compare="Raster"
      />
      <InputText
        id={arrayId[2]}
        textLabel="Tọa độ latNE"
        value={value}
        onChange={onChange}
        checkInput={checkInput}
        compare="Raster"
      />
      <InputText
        id={arrayId[3]}
        textLabel="Tọa độ lngNE"
        value={value}
        onChange={onChange}
        checkInput={checkInput}
        compare="Raster"
      />
    </div>
  );
};

export default InputRaster;
