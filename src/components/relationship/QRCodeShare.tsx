import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Share2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface QRCodeShareProps {
  relationshipId: string;
}

export function QRCodeShare({ relationshipId }: QRCodeShareProps) {
  const shareUrl = `${window.location.origin}/r/${relationshipId}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nosso Relacionamento',
          text: 'Veja quanto tempo estamos juntos!',
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Share2 className="text-pink-500 mr-2" /> Compartilhar
        </h2>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCodeSVG
            value={shareUrl}
            size={200}
            level="H"
            includeMargin
            imageSettings={{
              src: "/heart-icon.png",
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
        <Button onClick={handleShare} variant="outline">
          Compartilhar Link
        </Button>
      </div>
    </Card>
  );
}