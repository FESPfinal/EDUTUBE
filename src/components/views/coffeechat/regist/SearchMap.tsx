import React, { useEffect, useRef } from 'react';

const KAKAO_SDK_URL = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=0402fdac2f109abca0ff702a090e36ea&libraries=services&autoload=false';

const KakaoMap = ({ offlineAddress }) => {
  console.log(offlineAddress);
  const mapContainer = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.async = true;

    document.head.appendChild(script);

    const initMap = () => {
      try {
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5666103, 126.9783882),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch((offlineAddress), (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
            });
            map.setCenter(coords);
          }
        });
      } catch (error) {
        console.error('Error initializing Kakao Maps:', error);
      }
    };

    script.onload = () => {
      window.kakao.maps.load(initMap);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [offlineAddress]);

  return <div id="map" ref={mapContainer} className='my-[60px] w-full h-[350px]' />;
};

export default KakaoMap;
