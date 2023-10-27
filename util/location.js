// this key will not work , we need to buy a key from google
const GOOGLE_API_KEY = 'AIzaSyCTCDNDtYPCpAD0FaKgHgdzCjMN1QUHnt4';

//function take longitude and latitude and return google_map_image_url
export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export const getAddress = async(lat, lng) => {

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if(!response.ok){
    throw new Error('Failed to fetch the address')
  }

  // json() take a json and parse it to obj
  let address = 'a const address'
  const data = response && await response.json();
  if(data){
     address = data.result[0].formatted_address;
  }
  return address;
}