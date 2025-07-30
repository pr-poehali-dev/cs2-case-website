import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const [user] = useState({
    username: 'CS2_Pro_Gamer',
    level: 25,
    experience: 7500,
    experienceToNext: 10000,
    avatar: '',
    joinDate: '2023-01-15',
    totalCasesOpened: 127,
    totalSpent: 12500,
    totalWon: 15200,
    rareItems: 8,
    legendaryItems: 2,
    favoriteWeapon: 'AK-47'
  });

  const achievements = [
    { id: '1', name: 'Первый кейс', description: 'Открыл свой первый кейс', icon: 'Package', unlocked: true },
    { id: '2', name: 'Коллекционер', description: 'Собрал 10 предметов', icon: 'Trophy', unlocked: true },
    { id: '3', name: 'Везунчик', description: 'Выбил легендарный предмет', icon: 'Star', unlocked: true },
    { id: '4', name: 'Магнат', description: 'Потратил 10000 рублей', icon: 'DollarSign', unlocked: true },
    { id: '5', name: 'Мастер удачи', description: 'Открыл 100 кейсов', icon: 'Zap', unlocked: true },
    { id: '6', name: 'Миллионер', description: 'Собрал предметов на 50000 рублей', icon: 'Crown', unlocked: false },
  ];

  const recentActivity = [
    { id: '1', action: 'Открыл кейс', item: 'Spectrum Case', result: 'AK-47 | Redline', time: '2 часа назад' },
    { id: '2', action: 'Открыл кейс', item: 'Phoenix Case', result: 'M4A4 | Howl', time: '5 часов назад' },
    { id: '3', action: 'Открыл кейс', item: 'Dragon Lore Case', result: 'AWP | Dragon Lore', time: '1 день назад' },
  ];

  const experiencePercent = (user.experience / user.experienceToNext) * 100;
  const profit = user.totalWon - user.totalSpent;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-card/50 border-cs2-orange/20">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl bg-cs2-orange text-black">
                    {user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl text-cs2-orange">{user.username}</CardTitle>
                <CardDescription>Уровень {user.level}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Опыт</span>
                      <span>{user.experience}/{user.experienceToNext}</span>
                    </div>
                    <Progress value={experiencePercent} className="h-2" />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Игрок с {new Date(user.joinDate).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-cs2-blue/20 mt-6">
              <CardHeader>
                <CardTitle className="text-cs2-blue flex items-center">
                  <Icon name="BarChart3" className="mr-2" size={20} />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Кейсов открыто</span>
                  <span className="font-bold">{user.totalCasesOpened}</span>
                </div>
                <div className="flex justify-between">
                  <span>Потрачено</span>
                  <span className="font-bold text-cs2-red">{user.totalSpent} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Выиграно</span>
                  <span className="font-bold text-cs2-green">{user.totalWon} ₽</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Прибыль</span>
                  <span className={`font-bold ${profit >= 0 ? 'text-cs2-green' : 'text-cs2-red'}`}>
                    {profit >= 0 ? '+' : ''}{profit} ₽
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Редких предметов</span>
                  <span className="font-bold text-cs2-purple">{user.rareItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>Легендарных</span>
                  <span className="font-bold text-cs2-gold">{user.legendaryItems}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 border-cs2-purple/20">
              <CardHeader>
                <CardTitle className="text-cs2-purple flex items-center">
                  <Icon name="Award" className="mr-2" size={20} />
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        achievement.unlocked 
                          ? 'border-cs2-gold/20 bg-cs2-gold/5' 
                          : 'border-muted bg-muted/20 opacity-50'
                      }`}
                    >
                      <Icon 
                        name={achievement.icon as any} 
                        className={achievement.unlocked ? 'text-cs2-gold' : 'text-muted-foreground'} 
                        size={24} 
                      />
                      <div>
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-cs2-gold text-black ml-auto">
                          <Icon name="Check" size={12} />
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-cs2-green/20">
              <CardHeader>
                <CardTitle className="text-cs2-green flex items-center">
                  <Icon name="Activity" className="mr-2" size={20} />
                  Последняя активность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div className="flex items-center space-x-3">
                        <Icon name="Package" className="text-cs2-orange" size={20} />
                        <div>
                          <p className="font-medium">{activity.action}: {activity.item}</p>
                          <p className="text-sm text-muted-foreground">Получен: {activity.result}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-cs2-orange/20">
                <CardHeader>
                  <CardTitle className="text-cs2-orange">Любимое оружие</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Icon name="Crosshair" size={48} className="mx-auto text-cs2-orange mb-2" />
                  <p className="text-2xl font-bold">{user.favoriteWeapon}</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-cs2-blue/20">
                <CardHeader>
                  <CardTitle className="text-cs2-blue">Действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-cs2-orange hover:bg-cs2-orange/80 text-black">
                    <Icon name="Settings" className="mr-2" size={16} />
                    Настройки профиля
                  </Button>
                  <Button variant="outline" className="w-full border-cs2-blue text-cs2-blue hover:bg-cs2-blue/10">
                    <Icon name="Share" className="mr-2" size={16} />
                    Поделиться профилем
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;