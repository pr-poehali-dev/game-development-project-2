import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Choice {
  text: string;
  nextScene: number;
}

interface Scene {
  id: number;
  text: string;
  choices: Choice[];
  character?: string;
  isEnding?: boolean;
}

const storyData: Scene[] = [
  {
    id: 0,
    text: "Среди бескрайних песков пустыни возвышается величественный дворец. Здесь правит Бурнинг Спайс — великий разрушитель, чье имя внушает страх всем королевствам. Когда-то он был добр и помогал каждым, но предательство изменило его навсегда...",
    choices: [
      { text: "Войти во дворец", nextScene: 1 }
    ]
  },
  {
    id: 1,
    text: "В тронном зале восседает Бурнинг Спайс. Его взгляд холоден, как пустынная ночь. Рядом с ним стоит Капсаицин — единственный луч света в жестокой жизни правителя. Мальчику всего 13 лет, но он видит в отце не тирана, а того, кто нуждается в понимании.",
    character: "Бурнинг Спайс и Капсаицин",
    choices: [
      { text: "Наблюдать за Спайсом", nextScene: 2 },
      { text: "Обратить внимание на Капсаицина", nextScene: 3 }
    ]
  },
  {
    id: 2,
    text: "Бурнинг Спайс смотрит в окно на пустыню. Тысячи лет одиночества оставили свой след. После появления Капсаицина что-то изменилось... Чувства, которые он испытывает к сыну, становятся всё более неоднозначными. Это пугает даже его самого.",
    character: "Бурнинг Спайс",
    choices: [
      { text: "Продолжить историю", nextScene: 4 }
    ]
  },
  {
    id: 3,
    text: "Капсаицин смотрит на отца с любовью и пониманием. Он видит вспышки гнева, разрушительную силу, но для него Спайс остается отцом. Мальчик не понимает всей сложности чувств, которые испытывает к нему правитель, но чувствует, что отцу нужна его поддержка.",
    character: "Капсаицин",
    choices: [
      { text: "Продолжить историю", nextScene: 4 }
    ]
  },
  {
    id: 4,
    text: "За окнами дворца простирается королевство, где каждый житель живет в страхе. Спайс может разрушить чей-то дом ради забавы, когда ему скучно. Он восхваляет себя как бога для простолюдинов. Но внутри дворца, рядом с Капсаицином, он чувствует себя просто... человеком.",
    choices: [
      { text: "Узнать больше о прошлом", nextScene: 5 },
      { text: "Остаться в настоящем", nextScene: 6 }
    ]
  },
  {
    id: 5,
    text: "Когда-то Бурнинг Спайс был защитником, помогал слабым и верил в добро. Но его доброта была использована против него. Его предали те, кого он спас. Боль превратилась в гнев, гнев — в разрушение. Королевства падали одно за другим, пока он не остался совсем один... До появления Капсаицина.",
    choices: [
      { text: "Завершить историю", nextScene: 7 }
    ]
  },
  {
    id: 6,
    text: "Капсаицин подходит ближе к отцу. 'Отец, почему ты всегда так грустен?' — спрашивает мальчик. Спайс смотрит на сына, и на мгновение в его глазах появляется что-то, похожее на тепло. Но он быстро отворачивается, скрывая эмоции за маской жестокости.",
    choices: [
      { text: "Завершить историю", nextScene: 7 }
    ]
  },
  {
    id: 7,
    text: "История Бурнинг Спайса и Капсаицина только начинается. Судьба королевства в пустыне висит на волоске. Сможет ли любовь Капсаицина изменить сердце великого разрушителя? Или тьма прошлого навсегда поглотит последний луч света?",
    isEnding: true,
    choices: [
      { text: "Начать заново", nextScene: 0 }
    ]
  }
];

export default function Index() {
  const [currentScene, setCurrentScene] = useState(0);
  const [visitedScenes, setVisitedScenes] = useState<number[]>([0]);

  const scene = storyData[currentScene];

  const handleChoice = (nextScene: number) => {
    setCurrentScene(nextScene);
    if (!visitedScenes.includes(nextScene)) {
      setVisitedScenes([...visitedScenes, nextScene]);
    }
  };

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
          {scene.character && (
            <div className="flex items-center gap-2 mb-6 text-primary/70">
              <Icon name="User" size={20} />
              <span className="font-semibold text-sm uppercase tracking-wider">
                {scene.character}
              </span>
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-foreground leading-relaxed font-serif text-lg md:text-xl">
              {scene.text}
            </p>
          </div>

          <div className="space-y-3">
            {scene.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => handleChoice(choice.nextScene)}
                className="w-full text-left justify-start h-auto py-4 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base md:text-lg font-medium transition-all duration-200 hover:scale-[1.02] shadow-md"
              >
                <Icon name="ChevronRight" size={20} className="mr-2 flex-shrink-0" />
                <span>{choice.text}</span>
              </Button>
            ))}
          </div>

          {scene.isEnding && (
            <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center">
              <p className="text-muted-foreground italic">
                Продолжение следует...
              </p>
            </div>
          )}
        </Card>

        <div className="mt-6 flex justify-center gap-6 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="BookOpen" size={16} />
            <span>Визуальная новелла</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Bookmark" size={16} />
            <span>{visitedScenes.length} посещено</span>
          </div>
        </div>
      </div>
    </div>
  );
}
