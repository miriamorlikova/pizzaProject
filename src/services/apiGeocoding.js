//THIS IS THE CODE FROM MY INSTRUCTOR. I dont like data that Im getting from this API so I used different one to get street name, city, state and postal code instead
// export async function getAddress({ latitude, longitude }) {
//   const res = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
//   );
//   if (!res.ok) throw Error('Failed getting address');

//   const data = await res.json();
//   return data;
// }

// export async function getAddress({ latitude, longitude }) {

//this is my code with different API
export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();

  console.log(data);
  // Extract detailed address components from the response
  const street = data.address.road || '';
  const number = data.address.house_number || '';
  const city =
    data.address.city || data.address.town || data.address.village || '';
  const postcode = data.address.postcode || '';
  const country = data.address.country || '';

  return {
    street,
    number,
    city,
    postcode,
    countryName: country,
  };
}
