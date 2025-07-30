import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Navbar from '@/components/Navbar';

interface CaseItem {
  id: string;
  name: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  description: string;
}

const Cases = () => {
  const [cases] = useState<CaseItem[]>([
    {
      id: '1',
      name: 'Spectrum Case',
      price: 250,
      rarity: 'common',
      image: '/img/e04e8bdc-d09e-494e-9d45-4fa43389aa92.jpg',
      description: 'Содержит редкие скины с яркими цветами'
    },
    {
      id: '2', 
      name: 'Phoenix Case',
      price: 500,
      rarity: 'rare',
      image: '/img/e04e8bdc-d09e-494e-9d45-4fa43389aa92.jpg',
      description: 'Огненные скины из популярной коллекции'
    },
    {
      id: '3',
      name: 'Dragon Lore Case',
      price: 1000,
      rarity: 'epic',
      image: '/img/e04e8bdc-d09e-494e-9d45-4fa43389aa92.jpg',
      description: 'Эпические скины с драконами'
    },
    {
      id: '4',
      name: 'Knife Case',
      price: 2500,
      rarity: 'legendary',
      image: '/img/e04e8bdc-d09e-494e-9d45-4fa43389aa92.jpg',
      description: 'Легендарные ножи и редчайшие скины'
    },
    {
      id: '5',
      name: 'Operation Case',
      price: 750,
      rarity: 'epic',
      image: '/img/e04e8bdc-d09e-494e-9d45-4fa43389aa92.jpg',
      description: 'Эксклюзивные скины операций'
    },
    {
      id: '6',
      name: 'Glove Case',
      price: 1500,
      rarity: 'legendary',
      image: '/img/e04e8bdc-d09e-494e-9d45-4fa43389aa92.jpg',
      description: 'Перчатки и особые предметы'
    }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-600';
      case 'rare': return 'bg-cs2-blue';
      case 'epic': return 'bg-cs2-purple';
      case 'legendary': return 'bg-cs2-gold';
      default: return 'bg-gray-600';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'rare': return 'cs2-glow-blue';
      case 'epic': return 'cs2-glow-purple';
      case 'legendary': return 'cs2-glow';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-cs2-orange">
            Коллекция кейсов
          </h1>
          <p className="text-muted-foreground text-lg">
            Выбери кейс и испытай удачу
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <Card 
              key={caseItem.id} 
              className={`bg-card/50 border-2 hover:scale-105 transition-all duration-300 ${getRarityGlow(caseItem.rarity)}`}
            >
              <CardHeader className="pb-3">
                <div className="relative">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Badge className={`absolute top-2 right-2 ${getRarityColor(caseItem.rarity)} text-white`}>
                    {caseItem.rarity.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{caseItem.name}</CardTitle>
                <CardDescription>{caseItem.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Coins" className="text-cs2-gold" size={20} />
                    <span className="text-2xl font-bold text-cs2-gold">{caseItem.price}</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-cs2-orange hover:bg-cs2-orange/80 text-black"
                >
                  <Link 
                    to="/opening" 
                    state={{ selectedCase: caseItem }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Icon name="Package" size={18} />
                    <span>Открыть кейс</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-card/30 border-cs2-orange/20">
            <CardHeader>
              <CardTitle className="text-cs2-orange flex items-center justify-center space-x-2">
                <Icon name="Info" size={24} />
                <span>Информация о редкости</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-600 rounded"></div>
                  <span>Common</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-cs2-blue rounded"></div>
                  <span>Rare</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-cs2-purple rounded"></div>
                  <span>Epic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-cs2-gold rounded"></div>
                  <span>Legendary</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Cases;