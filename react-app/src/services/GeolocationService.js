import axios from 'axios'

const GEOLOCATION_URL = `https://maps.googleapis.com` || process.env.GEOLOCATION_URL

export class GeolocationService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  async locate(address) {
    console.log(`GeolocationService.locate:`, address)
    const response = await axios.get(`/maps/api/geocode/json`, { params: { address } })
    const { data: { geometry: { location } } } = response
    return location
  }
}

export default new GeolocationService(GEOLOCATION_URL)

