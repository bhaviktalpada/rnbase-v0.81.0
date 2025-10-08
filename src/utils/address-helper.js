export function getFormattedAddress(gDetailData) {
  const {geometry, address_components} = gDetailData;

  // Extract latitude and longitude
  const latitude = geometry?.location?.lat || '';
  const longitude = geometry?.location?.lng || '';

  // Extract address components
  const locality =
    address_components.find(component => component.types.includes('locality'))
      ?.long_name || '';

  const administrative_area_level_1 =
    address_components.find(component =>
      component.types.includes('administrative_area_level_1'),
    )?.long_name || '';

  const country =
    address_components.find(component => component.types.includes('country'))
      ?.long_name || '';

  const postal_code =
    address_components.find(component =>
      component.types.includes('postal_code'),
    )?.long_name || '';

  // Create the address in the desired format
  const address = gDetailData?.formatted_address
    ? gDetailData?.formatted_address
    : `${locality ? `${locality}, ` : ''}${
        administrative_area_level_1 ? `${administrative_area_level_1}, ` : ''
      }${postal_code ? postal_code : ''}`;

  return {
    latitude,
    longitude,
    city: locality,
    province: administrative_area_level_1,
    country,
    zipcode: postal_code,
    address,
  };
}
