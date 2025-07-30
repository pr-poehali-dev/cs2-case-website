import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cs2-orange to-cs2-blue bg-clip-text text-transparent">
            CS2 CASES
          </h1>
          <p className="text-xl text-muted-foreground">
            Открывай кейсы, собирай коллекцию легендарных скинов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-card/50 border-cs2-orange/20 hover:border-cs2-orange/40 transition-all duration-300 cs2-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cs2-orange">
                <Icon name="Package" size={24} />
                <span>Кейсы</span>
              </CardTitle>
              <CardDescription>
                Выбирай из множества кейсов с редкими скинами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-cs2-orange hover:bg-cs2-orange/80 text-black">
                <Link to="/cases">Посмотреть кейсы</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-cs2-blue/20 hover:border-cs2-blue/40 transition-all duration-300 cs2-glow-blue">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cs2-blue">
                <Icon name="Zap" size={24} />
                <span>Открытие</span>
              </CardTitle>
              <CardDescription>
                Испытай удачу с рулеткой открытия кейсов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full bg-cs2-blue hover:bg-cs2-blue/80 text-white">
                <Link to="/opening">Открыть кейс</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-cs2-purple/20 hover:border-cs2-purple/40 transition-all duration-300 cs2-glow-purple">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cs2-purple">
                <Icon name="Backpack" size={24} />
                <span>Инвентарь</span>
              </CardTitle>
              <CardDescription>
                Управляй своей коллекцией скинов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-cs2-purple text-cs2-purple hover:bg-cs2-purple/10">
                <Link to="/inventory">Мой инвентарь</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="relative rounded-lg overflow-hidden cs2-glow">
          <img 
            src="/img/6814ddb5-6e03-439c-85b4-1559d8d64740.jpg" 
            alt="CS2 Case" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
            <div className="p-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Начни свое приключение
              </h2>
              <p className="text-white/80 mb-6 text-lg">
                Открывай кейсы, получай редкие скины и торгуй с другими игроками
              </p>
              <Button size="lg" className="bg-cs2-orange hover:bg-cs2-orange/80 text-black">
                <Link to="/cases" className="flex items-center space-x-2">
                  <Icon name="Play" size={20} />
                  <span>Начать игру</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;