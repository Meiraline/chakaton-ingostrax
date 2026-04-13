import heroMain from '../assets/about-insurekids/hero-main.png';
import solutionScheme from '../assets/about-insurekids/solution-scheme.png';
import stepCreateCharacter from '../assets/about-insurekids/step-create-character.png';
import stepCards from '../assets/about-insurekids/step-cards.png';
import blogScreen from '../assets/about-insurekids/blog-screen.png';
import finalCta from '../assets/about-insurekids/final-cta.png';

export const mainHeroCards = [
  {
    title: 'Ситуация',
    text: 'Игрок попадает в знакомую жизненную историю.',
  },
  {
    title: 'Решение',
    text: 'Сам пишет, как будет действовать.',
  },
  {
    title: 'Вывод',
    text: 'Получает последствия и лучше понимает риски.',
  },
];

export const mainFeatureCards = [
  {
    title: 'Живой персонаж',
    text: 'Деньги, здоровье и настроение показывают цену каждого решения.',
  },
  {
    title: 'Ситуации из жизни',
    text: 'Телефон, поездка, травма или потеря вещи вместо сухих терминов.',
  },
  {
    title: 'Понятный блог',
    text: 'Короткие статьи помогают быстро закрепить материал.',
  },
];

export const mainSections = {
  hero: {
    eyebrow: 'Учись играя',
    title: 'INSUREKIDS',
    subtitle: 'Игра про страхование, где всё становится понятнее на примерах.',
    supportText:
      'Сервис помогает подросткам разобраться в рисках, решениях и страховании через игру, чат с ИИ и короткий блог.',
    primaryLabel: 'Начать игру',
    secondaryLabel: 'Как это работает',
    image: heroMain,
  },
  overview: {
    label: 'О сервисе',
    title: 'Страхование проще понять, когда проживаешь ситуацию сам',
    text:
      'Вместо длинной теории игрок проходит знакомые сцены, принимает решения и сразу видит последствия.',
    text2:
      'Так тема быстрее связывается с реальной жизнью и перестаёт казаться сложной и далёкой.',
    highlight: 'Не просто читать о рисках, а видеть, как они работают в жизни.',
    image: solutionScheme,
  },
  features: {
    label: 'Что внутри',
    title: 'Три части, которые работают вместе',
    text: 'Игра вовлекает, визуал объясняет, блог помогает быстро вернуться к сути.',
  },
  howItWorks: {
    label: 'Как это работает',
    title: 'Один игровой ход состоит из четырёх понятных шагов',
    text: 'Каждый шаг короткий: получил ситуацию, ответил, увидел итог, сделал вывод.',
    steps: [
      {
        title: '1. Создай героя',
        tag: 'Старт',
        text: 'Игрок начинает с персонажем и стартовыми характеристиками.',
        additionalText: 'Сложность меняет старт и добавляет контекст.',
        image: stepCreateCharacter,
      },
      {
        title: '2. Получи событие',
        tag: 'Ситуация',
        text: 'Выпадает карточка с жизненной проблемой или неожиданным событием.',
        additionalText: 'Иллюстрации помогают сразу понять сцену.',
        image: stepCards,
      },
      {
        title: '3. Напиши решение',
        tag: 'Чат',
        text: 'Игрок сам формулирует ответ, а не выбирает кнопку из списка.',
        additionalText: 'Так решения получаются личными и осмысленными.',
      },
      {
        title: '4. Узнай последствия',
        tag: 'Результат',
        text: 'ИИ объясняет итог и меняет состояние героя.',
        additionalText: 'Так появляется понимание, где страхование реально помогает.',
        image: solutionScheme,
      },
    ],
  },
  blog: {
    label: 'Блог',
    title: 'Короткие статьи закрепляют понимание',
    text:
      'Если нужно быстро разобраться в терминах, видах страхования и примерах, можно перейти в блог.',
    text2:
      'Материалы короткие, написаны простым языком и хорошо дополняют игровой опыт.',
    bullets: [
      'понятные формулировки',
      'живые примеры',
      'быстрый вход в тему',
    ],
    image: blogScreen,
  },
  finalCta: {
    label: 'Начать',
    title: 'Понять страхование можно без скучных лекций',
    text: 'INSUREKIDS помогает изучать важную тему через игру, примеры и понятные объяснения.',
    primaryLabel: 'Открыть игру',
    primaryTo: '/account',
    secondaryLabel: 'Открыть блог',
    secondaryTo: '/blog',
    image: finalCta,
  },
};