import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from 'react-hot-toast';
import { updateRelationship } from '../../lib/relationship';
import { useRelationship } from '../../hooks/useRelationship';

interface CoupleNamesProps {
  partner1Name: string;
  partner2Name: string;
  relationshipId: string;
}

export function CoupleNames({ partner1Name, partner2Name, relationshipId }: CoupleNamesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPartner1Name, setNewPartner1Name] = useState(partner1Name);
  const [newPartner2Name, setNewPartner2Name] = useState(partner2Name);
  const { setRelationship } = useRelationship();

  const handleSave = async () => {
    if (!newPartner1Name.trim() || !newPartner2Name.trim()) {
      toast.error('Os nomes não podem estar vazios');
      return;
    }

    try {
      const updatedRelationship = await updateRelationship(relationshipId, {
        partner1Name: newPartner1Name.trim(),
        partner2Name: newPartner2Name.trim()
      });
      
      setRelationship(updatedRelationship);
      setIsEditing(false);
      toast.success('Nomes atualizados com sucesso!');
    } catch (error) {
      console.error('Error updating names:', error);
      toast.error('Erro ao atualizar os nomes');
    }
  };

  const handleCancel = () => {
    setNewPartner1Name(partner1Name);
    setNewPartner2Name(partner2Name);
    setIsEditing(false);
  };

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Nosso Relacionamento</h2>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Seu nome"
              value={newPartner1Name}
              onChange={(e) => setNewPartner1Name(e.target.value)}
              placeholder="Digite seu nome"
              maxLength={50}
            />
            <Input
              label="Nome do seu PAR"
              value={newPartner2Name}
              onChange={(e) => setNewPartner2Name(e.target.value)}
              placeholder="Digite o nome do seu par"
              maxLength={50}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
            >
              <Check className="h-4 w-4 mr-1" />
              Salvar
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-medium text-pink-600">
            {partner1Name} & {partner2Name}
          </h3>
        </div>
      )}
    </Card>
  );
}