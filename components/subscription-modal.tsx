'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap } from 'lucide-react'

interface SubscriptionModalProps {
  children: React.ReactNode
}

export function SubscriptionModal({ children }: SubscriptionModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Passez à Premium
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Plan Premium */}
          <div className="border-2 border-coral-500 rounded-lg p-6 relative">
            <Badge className="absolute -top-3 left-4 bg-coral-500">
              <Crown className="w-3 h-3 mr-1" />
              Populaire
            </Badge>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">Premium</h3>
              <div className="text-3xl font-bold text-coral-600 mt-2">
                9€<span className="text-sm text-gray-500">/mois</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                25 lettres par mois
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Feedback IA avancé
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Export PDF
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Suivi candidatures
              </li>
            </ul>

            <Button className="w-full bg-coral-500 hover:bg-coral-600">
              <Zap className="w-4 h-4 mr-2" />
              Passer à Premium
            </Button>
          </div>

          {/* Plan Pro */}
          <div className="border rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">Pro</h3>
              <div className="text-3xl font-bold text-gray-900 mt-2">
                19€<span className="text-sm text-gray-500">/mois</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Lettres illimitées
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Analytics avancés
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                API access
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Support prioritaire
              </li>
            </ul>

            <Button variant="outline" className="w-full">
              Choisir Pro
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}