export interface IService {
  id?: string
  employeeId: string
  name: string
  priceFrom: number
  priceTo: number
  duration: string
  isOnlineAvailable: boolean
  onlineNameRecord: string
  description: string
  serviceType: string
  imageUrl?: string
  downloadLink?: string
}
