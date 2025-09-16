export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  projectType: string
  status: 'pending' | 'paid' | 'in-progress' | 'completed'
  created_at: string
}
