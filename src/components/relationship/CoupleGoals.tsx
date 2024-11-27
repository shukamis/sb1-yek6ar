import React from 'react';
import { Target, Plus, Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Goal {
  id: string;
  title: string;
  completed: boolean;
}

export function CoupleGoals() {
  const [goals, setGoals] = React.useState<Goal[]>([
    { id: '1', title: 'Viajar juntos', completed: false },
    { id: '2', title: 'Aprender uma habilidade nova', completed: false },
    { id: '3', title: 'Fazer um piquenique', completed: true },
  ]);
  const [newGoal, setNewGoal] = React.useState('');

  const handleAddGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([
      ...goals,
      { id: Date.now().toString(), title: newGoal, completed: false },
    ]);
    setNewGoal('');
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Target className="text-pink-500 mr-2" /> Metas do Casal
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Adicionar nova meta..."
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
          />
          <Button onClick={handleAddGoal}>
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`p-3 rounded-lg flex items-center space-x-3 cursor-pointer ${
                goal.completed ? 'bg-pink-50' : 'bg-gray-50'
              }`}
              onClick={() => toggleGoal(goal.id)}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  goal.completed
                    ? 'border-pink-500 bg-pink-500'
                    : 'border-gray-300'
                }`}
              >
                {goal.completed && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                {goal.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}