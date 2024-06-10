import axios from 'axios'

export const getAddressFromMap = (setAddress, data) => {
  axios
    .get(process.env.MAP_API_URL, {
      params: {
        format: 'json',
        apikey: process.env.MAP_API_KEY,
        geocode: data.long + ',' + data.lat,
        lang: 'ru-RU',
        results: 3,
      },
    })
    .then((body) => {
      var tempAddress =
        body.data.response.GeoObjectCollection.featureMember[0].GeoObject
          .metaDataProperty.GeocoderMetaData.Address.Components
      let addressName = ''
      tempAddress.map((address, i) => {
        if (i !== 2) {
          addressName += address.name + ', '
        }
      })

      setAddress(addressName)
    })
}
