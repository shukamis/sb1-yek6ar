import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useRelationship } from '../hooks/useRelationship';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { Loader } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { CounterCard } from '../components/relationship/CounterCard';
import { PhotoGrid } from '../components/relationship/PhotoGrid';
import { DatePicker } from '../components/relationship/DatePicker';
import { DateIdeas } from '../components/relationship/DateIdeas';
import { QRCodeShare } from '../components/relationship/QRCodeShare';
import { PremiumFeatures } from '../components/premium/PremiumFeatures';
import { PremiumModal } from '../components/premium/PremiumModal';
import { Milestones } from '../components/relationship/Milestones';
import { CoupleGoals } from '../components/relationship/CoupleGoals';
import { CoupleGames } from '../components/games/CoupleGames';
import { CoupleNames } from '../components/relationship/CoupleNames';
import { updateRelationship } from '../lib/relationship';

export function Dashboard() {
  const { user } = useAuthStore();
  const { relationship, loading, setRelationship } = useRelationship();

  const handleDateChange = async (date: string) => {
    if (!relationship) return;
    
    try {
      await updateRelationship(relationship.id, { startDate: date });
      setRelationship({ ...relationship, startDate: date });
    } catch (error) {
      console.error('Error updating date:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (!relationship || !user) return null;

  const daysCount = differenceInDays(new Date(), new Date(relationship.startDate));
  const monthsCount = differenceInMonths(new Date(), new Date(relationship.startDate));
  const yearsCount = differenceInYears(new Date(), new Date(relationship.startDate));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CoupleNames
            partner1Name={relationship.partner1Name}
            partner2Name={relationship.partner2Name}
            relationshipId={relationship.id}
          />

          <Card>
            <div className="space-y-6">
              <CounterCard
                days={daysCount}
                months={monthsCount}
                years={yearsCount}
                startDate={relationship.startDate}
                photo={relationship.photos[0]}
                partner1Name={relationship.partner1Name}
                partner2Name={relationship.partner2Name}
              />
              <DatePicker
                value={relationship.startDate}
                onChange={handleDateChange}
              />
            </div>
          </Card>

          <PhotoGrid 
            isPremium={user.premium}
            photos={relationship.photos}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Milestones 
              startDate={relationship.startDate} 
              isPremium={user.premium}
              partner1Name={relationship.partner1Name}
              partner2Name={relationship.partner2Name}
            />
            <CoupleGoals />
          </div>

          <CoupleGames isPremium={user.premium} />
        </div>

        <div className="space-y-8">
          {!user.premium && <PremiumFeatures />}
          <DateIdeas isPremium={user.premium} />
          <QRCodeShare relationshipId={relationship.id} />
        </div>
      </div>

      <PremiumModal />
    </div>
  );
}