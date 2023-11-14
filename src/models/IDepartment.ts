export interface IDepartment {
  name: string
  businessArea: string
  categoryName: string
  country: string
  city: string
  location: {
    address: string
    district: string
    latitude: number
    longitude: number
    zoom: number
  }
  phoneNumber: string
  workMode: string
}
