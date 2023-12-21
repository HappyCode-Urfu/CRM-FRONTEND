export interface IDepartment {
  id?: string
  name: string
  businessArea: string
  location: {
    address: string
    latitude: number
    longitude: number
  }
  phoneNumber: string
  workMode: {
    startTime: string
    endTime: string
  }
}

export interface IDepartmentsList {
  id: string
  name: string
}
