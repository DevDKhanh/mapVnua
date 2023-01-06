import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import {
    BsQuestionCircleFill
} from 'react-icons/bs'
import {useEffect} from 'react';
import { useMap } from 'react-leaflet';

const SearchField = ({ apiKey }) => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

    return  <a className='search' target={'_blank'} href='/trogiup.htm'>
            <BsQuestionCircleFill/>
         </a>
};

export default SearchField;
