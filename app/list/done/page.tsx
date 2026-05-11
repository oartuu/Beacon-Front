import { Card, CardContent } from '@/components/ui/card';
import { Item, ItemContent } from '@/components/ui/item'
import { BookmarkCheck } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div className="h-dvh flex items-center justify-center bg-zinc-950">
      <Card className='bg-green-300'>
        <CardContent className='flex flex-col items-center justify-between gap-4'>
          <h1>Presença Enviada</h1>
          <BookmarkCheck />
        </CardContent>
      </Card>
    </div>
  );
}
