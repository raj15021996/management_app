import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import  L from "leaflet"
import axios from "axios";
interface MapData1 {
  country:any;
}
const markerIcon = new L.Icon({
  iconUrl: require("./covid-19.png"),
  iconSize: [30, 30],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
export default function CovidMap():JSX.Element {
  const [mapData, setMapData] =useState([])
  const position: LatLngTuple = [20.5937, 78.9629];

//for getting Data to show on map
  const getMapData = async () => {
    await axios.get<MapData1,any>("https://disease.sh/v3/covid-19/countries").then((res) => {
      setMapData(res.data)
    }).catch((e) => {
      console.log(e)
    })
  }
  useEffect(() => {
    getMapData()
  }, [])

  return (
    <MapContainer center={position} zoom={4} style={{height:'400px'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=WYSVmVAi0TML7ZbC91fR"
      />
      {
        //set marker according to countries
        mapData?.map((item:any,inx) => (
          <Marker position={[item.countryInfo.lat,item.countryInfo.long]} icon={markerIcon} key={inx} >
            <Popup>
              <div>
              <p>Country: {item.country}</p>
              <p>Covid-19 Cases</p>
              <p>Active: {item.active}</p>
              <p>Deaths: {item.deaths}</p>
              <p>Recovered: {item.recovered}</p>
              </div> 
            </Popup>
          </Marker>
        ))
      }

    </MapContainer>
  );
}
