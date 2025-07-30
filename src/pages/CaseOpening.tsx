import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Navbar from '@/components/Navbar';
import { useSound } from '@/hooks/useSound';

interface Weapon {
  id: string;
  name: string;
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  value: number;
}

const CaseOpening = () => {
  const location = useLocation();
  const selectedCase = location.state?.selectedCase;
  const { playOpenCase, playWinItem, playClick } = useSound();
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonItem, setWonItem] = useState<Weapon | null>(null);
  const [rouletteItems, setRouletteItems] = useState<Weapon[]>([]);

  const weapons: Weapon[] = [
    { id: '1', name: 'AK-47 | Redline', type: 'Rifle', rarity: 'rare', image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg', value: 150 },
    { id: '2', name: 'AWP | Dragon Lore', type: 'Sniper', rarity: 'legendary', image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg', value: 2500 },
    { id: '3', name: 'M4A4 | Howl', type: 'Rifle', rarity: 'epic', image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg', value: 800 },
    { id: '4', name: 'Karambit | Fade', type: 'Knife', rarity: 'legendary', image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg', value: 3000 },
    { id: '5', name: 'Glock-18 | Water Elemental', type: 'Pistol', rarity: 'common', image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg', value: 50 },
    { id: '6', name: 'Sport Gloves | Pandora\'s Box', type: 'Gloves', rarity: 'legendary', image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg', value: 1500 },
    { id: '7', name: 'USP-S | Kill Confirmed', type: 'Pistol', rarity: 'epic', image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg', value: 300 },
    { id: '8', name: 'P250 | Sand Dune', type: 'Pistol', rarity: 'common', image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg', value: 10 },
  ];

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

  const generateRouletteItems = () => {
    const items = [];
    for (let i = 0; i < 50; i++) {
      const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
      items.push({ ...randomWeapon, id: `roulette-${i}` });
    }
    return items;
  };

  const openCase = () => {
    playClick();
    setIsSpinning(true);
    setWonItem(null);
    
    const newRouletteItems = generateRouletteItems();
    setRouletteItems(newRouletteItems);
    
    playOpenCase();

    setTimeout(() => {
      const rarityWeights = {
        common: 0.6,
        rare: 0.25,
        epic: 0.12,
        legendary: 0.03
      };

      const rand = Math.random();
      let rarity: 'common' | 'rare' | 'epic' | 'legendary' = 'common';
      
      if (rand < rarityWeights.legendary) rarity = 'legendary';
      else if (rand < rarityWeights.legendary + rarityWeights.epic) rarity = 'epic';
      else if (rand < rarityWeights.legendary + rarityWeights.epic + rarityWeights.rare) rarity = 'rare';

      const availableWeapons = weapons.filter(w => w.rarity === rarity);
      const winner = availableWeapons[Math.floor(Math.random() * availableWeapons.length)];
      
      setWonItem(winner);
      setIsSpinning(false);
      playWinItem(rarity);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-cs2-orange">
            Открытие кейса
          </h1>
          {selectedCase && (
            <p className="text-muted-foreground text-lg">
              Открываем: {selectedCase.name}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 border-cs2-orange/20 mb-8">
            <CardHeader>
              <CardTitle className="text-center text-cs2-orange">Рулетка</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden h-32 bg-black/50 rounded-lg border-2 border-cs2-orange/20">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-cs2-orange z-10"></div>
                <div 
                  className={`flex gap-2 h-full items-center transition-transform duration-3000 ease-out ${
                    isSpinning ? 'animate-pulse' : ''
                  }`}
                  style={{
                    transform: isSpinning ? `translateX(-${Math.random() * 2000 + 1000}px)` : 'translateX(0)'
                  }}
                >
                  {rouletteItems.map((item, index) => (
                    <div 
                      key={index}
                      className={`min-w-24 h-24 bg-card rounded border-2 flex flex-col items-center justify-center p-1 ${getRarityGlow(item.rarity)}`}
                    >
                      <img src={item.image} alt={item.name} className="w-16 h-12 object-cover rounded" />
                      <Badge className={`text-xs ${getRarityColor(item.rarity)} text-white mt-1`}>
                        {item.rarity.charAt(0).toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mb-8">
            <Button 
              onClick={openCase}
              disabled={isSpinning}
              size="lg"
              className="bg-cs2-orange hover:bg-cs2-orange/80 text-black px-8 py-4 text-xl"
            >
              {isSpinning ? (
                <div className="flex items-center space-x-2">
                  <Icon name="Loader2" className="animate-spin" size={24} />
                  <span>Открываем...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Icon name="Package" size={24} />
                  <span>Открыть кейс</span>
                </div>
              )}
            </Button>
          </div>

          {wonItem && (
            <Card className={`bg-card/80 border-2 ${getRarityGlow(wonItem.rarity)} animate-pulse`}>
              <CardHeader>
                <CardTitle className="text-center text-2xl">🎉 Поздравляем!</CardTitle>
                <CardDescription className="text-center">Вы выиграли:</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <img 
                    src={wonItem.image} 
                    alt={wonItem.name}
                    className="w-48 h-32 object-cover rounded-lg mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">{wonItem.name}</h3>
                  <Badge className={`${getRarityColor(wonItem.rarity)} text-white text-lg px-4 py-2`}>
                    {wonItem.rarity.toUpperCase()} {wonItem.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Icon name="Coins" className="text-cs2-gold" size={24} />
                  <span className="text-3xl font-bold text-cs2-gold">{wonItem.value}</span>
                </div>
                <Button className="bg-cs2-blue hover:bg-cs2-blue/80 text-white">
                  <Icon name="Package" className="mr-2" size={18} />
                  Добавить в инвентарь
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default CaseOpening;