import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { storyData, type Scene, type Choice } from '@/data/story';

interface Stats {
  obsession: number;
  trust: number;
  independence: number;
}

export default function Index() {
  const [currentScene, setCurrentScene] = useState(0);
  const [visitedScenes, setVisitedScenes] = useState<number[]>([0]);
  const [stats, setStats] = useState<Stats>({
    obsession: 50,
    trust: 50,
    independence: 30
  });

  const scene = storyData[currentScene];

  const handleChoice = (nextScene: number, choice: Choice) => {
    if (nextScene === 0 && currentScene !== 0) {
      setStats({
        obsession: 50,
        trust: 50,
        independence: 30
      });
      setVisitedScenes([0]);
    } else {
      if (!visitedScenes.includes(nextScene)) {
        setVisitedScenes([...visitedScenes, nextScene]);
      }
      
      setStats(prev => ({
        obsession: Math.max(0, Math.min(100, prev.obsession + (choice.obsessionChange || 0))),
        trust: Math.max(0, Math.min(100, prev.trust + (choice.trustChange || 0))),
        independence: Math.max(0, Math.min(100, prev.independence + (choice.independenceChange || 0)))
      }));
    }
    
    setCurrentScene(nextScene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getObsessionLevel = () => {
    if (stats.obsession >= 80) return { text: "КРИТИЧЕСКАЯ", color: "text-red-600", bg: "bg-red-500" };
    if (stats.obsession >= 60) return { text: "Высокая", color: "text-orange-600", bg: "bg-orange-500" };
    if (stats.obsession >= 40) return { text: "Умеренная", color: "text-yellow-600", bg: "bg-yellow-500" };
    return { text: "Низкая", color: "text-green-600", bg: "bg-green-500" };
  };

  const obsessionLevel = getObsessionLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1B3D] via-[#3d2647] to-[#8B47B7] flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-2 text-shadow">
            Королевство в Пустыне
          </h1>
          <p className="text-[#8B4789] text-lg">
            Глава {visitedScenes.length} из {storyData.length}
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur p-8 md:p-12 rounded-2xl shadow-2xl animate-fade-in">
          <div className="mb-6 space-y-4">
            {scene.character && (
              <div className="flex items-center gap-2 text-primary/70">
                <Icon name="User" size={20} />
                <span className="font-semibold text-sm uppercase tracking-wider">
                  {scene.character}
                </span>
              </div>
            )}

            {scene.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="MapPin" size={16} />
                <span className="text-sm italic">{scene.location}</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Heart" size={16} className={obsessionLevel.color} />
                    <span className="font-medium">Одержимость</span>
                  </div>
                  <span className={`font-bold ${obsessionLevel.color}`}>{obsessionLevel.text}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${obsessionLevel.bg} transition-all duration-500`}
                    style={{ width: `${stats.obsession}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{stats.obsession}%</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={16} className="text-blue-600" />
                    <span className="font-medium">Доверие</span>
                  </div>
                  <span className="font-bold text-blue-600">{stats.trust}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${stats.trust}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Доверие Спайса к тебе</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Sparkles" size={16} className="text-purple-600" />
                    <span className="font-medium">Независимость</span>
                  </div>
                  <span className="font-bold text-purple-600">{stats.independence}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 transition-all duration-500"
                    style={{ width: `${stats.independence}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Твоя свобода</p>
              </div>
            </div>
          </div>

          {stats.obsession >= 80 && !scene.isEnding && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex items-center gap-2 text-red-800">
                <Icon name="AlertTriangle" size={20} />
                <span className="font-bold text-sm">ПРЕДУПРЕЖДЕНИЕ: Одержимость Спайса достигла критического уровня!</span>
              </div>
              <p className="text-red-700 text-sm mt-1">Твои выборы определят судьбу ваших отношений...</p>
            </div>
          )}

          {stats.independence <= 10 && !scene.isEnding && (
            <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
              <div className="flex items-center gap-2 text-orange-800">
                <Icon name="AlertCircle" size={20} />
                <span className="font-bold text-sm">Твоя независимость на грани исчезновения...</span>
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-foreground leading-relaxed font-serif text-lg md:text-xl">
              {scene.text}
            </p>
          </div>

          <div className="space-y-3">
            {scene.choices.map((choice, index) => (
              <div key={index} className="relative group">
                <Button
                  onClick={() => handleChoice(choice.nextScene, choice)}
                  className="w-full text-left justify-start h-auto py-4 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base md:text-lg font-medium transition-all duration-200 hover:scale-[1.02] shadow-md"
                >
                  <Icon name="ChevronRight" size={20} className="mr-2 flex-shrink-0" />
                  <span className="flex-1">{choice.text}</span>
                  {(choice.obsessionChange || choice.trustChange || choice.independenceChange) && (
                    <div className="ml-3 flex gap-1 flex-shrink-0">
                      {choice.obsessionChange && (
                        <span className={`text-xs px-2 py-1 rounded ${choice.obsessionChange > 0 ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
                          {choice.obsessionChange > 0 ? '↑' : '↓'} Одержимость
                        </span>
                      )}
                      {choice.trustChange && (
                        <span className={`text-xs px-2 py-1 rounded ${choice.trustChange > 0 ? 'bg-blue-500/20 text-blue-200' : 'bg-gray-500/20 text-gray-200'}`}>
                          {choice.trustChange > 0 ? '↑' : '↓'} Доверие
                        </span>
                      )}
                      {choice.independenceChange && (
                        <span className={`text-xs px-2 py-1 rounded ${choice.independenceChange > 0 ? 'bg-purple-500/20 text-purple-200' : 'bg-gray-500/20 text-gray-200'}`}>
                          {choice.independenceChange > 0 ? '↑' : '↓'} Независимость
                        </span>
                      )}
                    </div>
                  )}
                </Button>
              </div>
            ))}
          </div>

          {scene.isEnding && (
            <div className="mt-8 pt-8 border-t border-muted-foreground/20 space-y-4">
              <p className="text-muted-foreground italic text-center">
                Продолжение следует...
              </p>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="font-bold text-foreground">Итоговая одержимость</p>
                  <p className={`text-2xl font-bold ${obsessionLevel.color}`}>{stats.obsession}%</p>
                  <p className="text-muted-foreground">{obsessionLevel.text}</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">Итоговое доверие</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.trust}%</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">Итоговая независимость</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.independence}%</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            История адаптируется под твои решения • Каждый выбор имеет последствия
          </p>
        </div>
      </div>
    </div>
  );
}
