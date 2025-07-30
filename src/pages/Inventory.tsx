import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import Navbar from '@/components/Navbar';

interface InventoryItem {
  id: string;
  name: string;
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  value: number;
  condition: string;
}

const Inventory = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('value');

  const [items] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'AK-47 | Redline',
      type: 'Rifle',
      rarity: 'rare',
      image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg',
      value: 150,
      condition: 'Field-Tested'
    },
    {
      id: '2',
      name: 'AWP | Dragon Lore',
      type: 'Sniper',
      rarity: 'legendary',
      image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg',
      value: 2500,
      condition: 'Factory New'
    },
    {
      id: '3',
      name: 'Glock-18 | Water Elemental',
      type: 'Pistol',
      rarity: 'common',
      image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg',
      value: 50,
      condition: 'Minimal Wear'
    },
    {
      id: '4',
      name: 'Karambit | Fade',
      type: 'Knife',
      rarity: 'legendary',
      image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg',
      value: 3000,
      condition: 'Factory New'
    },
    {
      id: '5',
      name: 'M4A4 | Howl',
      type: 'Rifle',
      rarity: 'epic',
      image: '/img/c79682dd-fbd5-4a0e-bfb9-d9164bc2f331.jpg',
      value: 800,
      condition: 'Field-Tested'
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

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.rarity === filter;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return b.value - a.value;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rarity':
        const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      default:
        return 0;
    }
  });

  const totalValue = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-cs2-orange">
              Мой инвентарь
            </h1>
            <p className="text-muted-foreground">
              {items.length} предметов • Общая стоимость: 
              <span className="text-cs2-gold font-bold ml-2">{totalValue} ₽</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Фильтр по редкости" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все предметы</SelectItem>
              <SelectItem value="common">Common</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="value">По стоимости</SelectItem>
              <SelectItem value="name">По названию</SelectItem>
              <SelectItem value="rarity">По редкости</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <Card 
              key={item.id} 
              className={`bg-card/50 border-2 hover:scale-105 transition-all duration-300 ${getRarityGlow(item.rarity)}`}
            >
              <CardHeader className="pb-3">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <Badge className={`absolute top-2 right-2 ${getRarityColor(item.rarity)} text-white`}>
                    {item.rarity.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription>{item.type} • {item.condition}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Coins" className="text-cs2-gold" size={16} />
                    <span className="text-lg font-bold text-cs2-gold">{item.value}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-cs2-blue text-cs2-blue hover:bg-cs2-blue/10"
                  >
                    <Icon name="Eye" size={14} className="mr-1" />
                    Осмотр
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-cs2-green text-cs2-green hover:bg-cs2-green/10"
                  >
                    <Icon name="DollarSign" size={14} className="mr-1" />
                    Продать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold mb-2">Инвентарь пуст</h3>
            <p className="text-muted-foreground mb-6">
              Откройте кейсы, чтобы получить свои первые предметы
            </p>
            <Button asChild className="bg-cs2-orange hover:bg-cs2-orange/80 text-black">
              <a href="/cases">
                <Icon name="Package" className="mr-2" size={18} />
                Перейти к кейсам
              </a>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory;