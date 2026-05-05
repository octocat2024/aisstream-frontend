export type GpsPoint = {
  lat: number
  lng: number
  label: string
}

export async function fetchGpsPoints(): Promise<GpsPoint[]> {
    console.log('requesting gps data')
    const response =  await fetch(`${import.meta.env.VITE_API_BASE_URL}/AisInfo/Ship`)
    if (!response.ok) {
        throw new Error('Failed to fetch GPS points')
    }
    const data = await response.json()
    console.log('GPS data:', data[0])
    return data as GpsPoint[]
}


export type Ship = {
  Id: number
  Mmsi: number
  ShipName: string
  Latitude: number
  Longitude: number
  CreatedAt: string
  UpdatedAt: string
}

export type ShipPage = {
  items: Ship[]
  totalCount: number
  page: number
  pageSize: number
}
