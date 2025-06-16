'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Trash2, Calendar, Building } from 'lucide-react'

interface Application {
  id: string
  company: string
  position: string
  status: 'draft' | 'sent' | 'viewed' | 'interview' | 'rejected' | 'accepted'
  date: string
  letterScore: number
}

const mockApplications: Application[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Frontend Developer',
    status: 'interview',
    date: '2024-01-15',
    letterScore: 92
  },
  {
    id: '2',
    company: 'Microsoft',
    position: 'Full Stack Developer',
    status: 'sent',
    date: '2024-01-12',
    letterScore: 88
  },
  {
    id: '3',
    company: 'Apple',
    position: 'React Developer',
    status: 'viewed',
    date: '2024-01-10',
    letterScore: 85
  }
]

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  viewed: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  accepted: 'bg-emerald-100 text-emerald-800'
}

const statusLabels = {
  draft: 'Brouillon',
  sent: 'Envoyée',
  viewed: 'Vue',
  interview: 'Entretien',
  rejected: 'Refusée',
  accepted: 'Acceptée'
}

export function ApplicationTracker() {
  const [applications] = useState<Application[]>(mockApplications)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-coral-500" />
          Suivi des Candidatures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <h4 className="font-medium">{app.company}</h4>
                      <p className="text-sm text-gray-500">{app.position}</p>
                    </div>
                  </div>
                  
                  <Badge className={statusColors[app.status]}>
                    {statusLabels[app.status]}
                  </Badge>
                  
                  <div className="text-sm text-gray-500">
                    Score: <span className="font-medium text-coral-600">{app.letterScore}/100</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{app.date}</span>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}