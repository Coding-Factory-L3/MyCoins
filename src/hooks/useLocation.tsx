// useCurrencyByLocation.tsx
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

interface Location {
  latitude: number;
  longitude: number;
}

type Currency = {
  code: string;
  name: string;
  symbol: string;
  city?: string;
  country?: string;
};

const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [currentLocation, setCurrentLocation] = useState<
    Currency | object | null
  >(null);

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log('Error fetching location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchCurrencyCode = async (countryCode: string) => {
    await axios
      .get(`https://restcountries.com/v2/alpha/${countryCode}`)
      .then(res => {
        const currencyCode = res.data.currencies[0];

        setCurrentLocation((prevState: Currency) => ({
          ...prevState,
          code: currencyCode.code?.toLowerCase() || 'eur',
          name: currencyCode.name,
          symbol: currencyCode.symbol,
        }));
      })
      .catch(error => console.log('Error fetching currency:', error));
  };

  useEffect(() => {
    // Check and request location permissions
    const requestLocationPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Permission',
                message:
                  'This app needs access to your location for better services.',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              getLocation();
            } else {
              console.log('Location permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
        } else if (Platform.OS === 'ios') {
          try {
            const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (result === RESULTS.GRANTED) {
              await getLocation();
            } else {
              console.log('Location permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      } catch (error) {
        console.log('Error requesting location permissions:', error);
      }
    };

    requestLocationPermissions();
  }, []);

  useEffect(() => {
    if (location) {
      // Fetch country information based on location
      const {latitude, longitude} = location;
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      (async () => {
        await axios
          .get(apiUrl)
          .then(async response => {
            const addressComponents =
              response.data.results[0].address_components;

            // Find the country component
            const countryComponent = addressComponents?.find(
              (component: {types: string[]}) =>
                component.types.includes('country'),
            );

            const localityComponent = addressComponents?.find(
              (component: {types: string[]}) =>
                component.types.includes('locality'),
            );

            // Extract country code
            const countryCode = countryComponent?.short_name;
            const locality = localityComponent?.long_name;

            // Set currency based on country code
            if (countryCode) {
              setCurrentLocation((prevState: Currency) => ({
                ...prevState,
                city: locality,
                country: countryCode,
              }));
              await fetchCurrencyCode(countryCode);
            }
          })
          .catch(error => console.log('Error fetching country:', error));
      })();
    }
  }, [location]);

  return {
    currentLocation: currentLocation as Currency,
    setCurrentLocation,
  };
};

export default useLocation;
