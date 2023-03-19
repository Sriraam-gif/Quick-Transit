/* eslint-disable no-undef */
import { apiKey } from './defaults'
import { location } from './latLong'
import {names} from './names'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
  SkeletonText,
  position,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import { useRef, useState } from 'react'

import Geocode from "react-geocode"

import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api'

Geocode.setApiKey("AIzaSyBrkX3mMdgyiJv5_JK5C5aPTd9sHmsCOJQ");
Geocode.setLanguage("en");

const mapCenter = { lat: 40.2206, lng: -74.7597 }
let mark1Loc = mapCenter
let mark2Loc = mapCenter

// let markerPosition=<Marker position={mark1Loc} />


function App() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map*/(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()
  


  if (!isLoaded) {
    return <SkeletonText />
  }

  const latty1 = {lat: 40.9150, lng: -74.1800}
  const loc1 = new google.maps.Marker({
    position: latty1,
    map,
    title:"0"
  })
  const latty2 = {lat: 39.9443, lng: -74.0729}
  const loc2 = new google.maps.Marker({
    position: latty2,
    map,
    title:"1"
  })
  const latty3 = {lat: 40.1361, lng: -74.4362} //Six Flags
  const loc3 = new google.maps.Marker({
    position: latty3,
    map,
    title:"2"
  })
  const latty4 = {lat: 39.7632, lng: -74.1064}
  const loc4 = new google.maps.Marker({
    position: latty4,
    map,
    title:"3"
  })
  const latty5 = {lat: 40.1602, lng: -74.1324}
  const loc5 = new google.maps.Marker({
    position: latty5,
    map,
    title:"4"
  })
  const latty6 = {lat: 40.8306, lng: -74.2127}
  const loc6 = new google.maps.Marker({
    position: latty6,
    map,
    title:"5"
  })
  const latty7 = {lat: 40.7360, lng: -74.0275}
  const loc7 = new google.maps.Marker({
    position: latty7,
    map,
    title:"6"
  })
  const latty8 = {lat: 40.7675, lng: -74.2813}
  const loc8 = new google.maps.Marker({
    position: latty8,
    map,
    title:"7"
  })
  const latty9 = {lat: 40.7082, lng: -74.0546}
  const loc9 = new google.maps.Marker({
    position: latty9,
    map,
    title:"8"
  })
  const latty10 = {lat: 39.9461, lng: -75.1312}
  const loc10 = new google.maps.Marker({
    position: latty10,
    map,
    title:"9"
  })
  //Sriraam Video: 23:41

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    const directionsService = new google.maps.DirectionsService();
    const routePath = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING
    })

    setDirectionsResponse(routePath)
    setDistance(routePath.routes[0].legs[0].distance.text)
    setDuration(routePath.routes[0].legs[0].duration.text)

  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  let yourLoc
  function getCurrentLocation() {
    if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        const loc = {lat: position.coords.latitude, lng: position.coords.longitude}

        //const image = "https://drive.google.com/file/d/1jMPOyfFWfmIdUhn0CPW4Av1C_Z4tse7X/view?usp=sharing";
        //const ew = "http://maps.google.com/mapfiles/kml/paddle/go.png";
        const youarehere = "https://i.imgur.com/qsFRUtZ.png";

        new google.maps.Marker({
          position: loc,
          map,
          title: "Your Location",
          icon: youarehere,
        });

        yourLoc = loc
      })
    else 
      console.log("geolocation not supported")
  }

  const busstop = "https://i.imgur.com/b7y5sVI.png";
  
  let marko = new google.maps.Marker({
    position: mark1Loc,
    map,
    title: "",
    icon: busstop,
  })

  function marky() {
    Geocode.fromAddress(originRef.current.value).then(
      (response) => {
        marko.setMap(map)
        marko.setMap(null)
        mark1Loc = response.results[0].geometry.location;
        // const locy = [lat, lng]
        // mark1Loc = locy

        //const image = "http://maps.google.com/mapfiles/kml/paddle/go.png";
        const source = "https://imgur.com/yX9j1rx.png";

        marko = new google.maps.Marker({
          position: mark1Loc,
          map,
          title: "Your Location",
          icon: source,
        });
    
      },
      (error) => {
        alert(error);
      }
    );
  }

  let marki = new google.maps.Marker({
    position: mark2Loc,
    map,
    title: ""
  })
  function marky2() {
    Geocode.fromAddress(destinationRef.current.value).then(
      (response) => {
        marki.setMap(map)
        marki.setMap(null)
        mark2Loc = response.results[0].geometry.location;
        // const locy = [lat, lng]
        // mark1Loc = locy

        //const image = "http://maps.google.com/mapfiles/kml/paddle/go.png";
        const dest = "https://imgur.com/CxHTCuW.png";

        marki = new google.maps.Marker({
          position: mark2Loc,
          map,
          title: "Your Location",
          icon: dest,
        });

        mark2Loc.setMap(map)
        mark2Loc.setMap(null)
    
      },
      (error) => {
        alert(error);
      }
    );
  }


  let marku = new google.maps.Marker({
    position: mark1Loc,
    map,
    title: ""
  })

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    
    var lat = deg2rad(lat2-lat1);
    var lon = deg2rad(lon2-lon1); 
    var radiuse = 6371;
    var i1 = 
      Math.sin(lat/2) * Math.sin(lat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(lon/2) * Math.sin(lon/2)
      ; 
    var i2 = 2 * Math.atan2(Math.sqrt(i1), Math.sqrt(1-i1)); 
    var i3 = radiuse * i2; // Distance in km
    return i3;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  
  function plotNearestBusStopNearYou()
    {
      marku = setMap(map)
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const currPos = {lat: position.coords.latitude, lng: position.coords.longitude};
      
          console.log(yourLoc.lat)
          var LatLongofCurrPos={lat: yourLoc.lat, lng: yourLoc.lng}
          let desiredBusStopLat
          let desiredBusStopLong
          let desiredBusStopName
          let minimumDistance=Number.MAX_VALUE
   
     for(let i=0; i<location.length; i++)
    {
      let busStopLat=location[i][0]; //latitude of bus stop
      let busStopLong=location[i][1]; //longtitude of bus stop
      let busStopName=names[i];

      console.log(busStopLat)

      var busStopPos={lat: busStopLat, lng: busStopLong}
      console.log(busStopPos)
      console.log(LatLongofCurrPos)
      let distance=getDistanceFromLatLonInKm(yourLoc.lat, yourLoc.lng, busStopLat, busStopLong)
      console.log(distance)

      if(minimumDistance>distance)
      {
        minimumDistance=distance
        desiredBusStopLat=busStopLat
        desiredBusStopLong=busStopLong
        desiredBusStopName=busStopName
      }
      

    }
    console.log(desiredBusStopLat)
    //To add marker of the bus stop
    const img = "https://i.imgur.com/b7y5sVI.png"
    marku = new google.maps.Marker({
      position: { lat: desiredBusStopLat, lng: desiredBusStopLong},
      map,
      title: "Closest Bus Stop",
      icon: img
    })

        })
      }


  }
    
  



  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/*Google Map Box*/}
        <GoogleMap
          center={mapCenter}
          zoom={10}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={(map) => setMap(map)}
        >
          {/* <Marker position={mark1Loc} />  */}
            
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>

      <Box
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='modal'
      >
        
        
        <HStack align-items = "center" spacing={4}>
          <Button onClick = {plotNearestBusStopNearYou}>Find Bus</Button>
          <Autocomplete>
            <Input type='text' placeholder='Origin' ref={originRef} />
          </Autocomplete>
          <Button onClick={marky}>Mark Origin</Button>
          <Autocomplete>
            <Input type='text' placeholder='Destination' ref={destinationRef} />
          </Autocomplete>
          <Button onClick={marky2}>Mark Destination</Button>
          <Button onClick={getCurrentLocation}>Get My Location</Button> 
          <ButtonGroup>
            <Button colorScheme='green' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance}</Text>
          <Text>Duration: {duration}</Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(mapCenter)}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default App

//onLoad={(map) => setMap(map)}
//map.panTo(mapCenter)