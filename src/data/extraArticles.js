const categoryImages = {
  'Основы страхования': '/png/blog.png',
  'Виды страхования': '/png/1_blok.png',
  'Жизненные ситуации': '/png/2_blok.png',
};

const categoryTags = {
  'Основы страхования': ['страхование', 'основы'],
  'Виды страхования': ['виды страховок', 'выбор'],
  'Жизненные ситуации': ['риски', 'примеры'],
};

function getSectionText(section) {
  if (typeof section.value === 'string' && section.value.trim()) {
    return section.value.trim();
  }

  if (typeof section.content === 'string' && section.content.trim()) {
    return section.content.trim();
  }

  if (Array.isArray(section.items) && section.items.length) {
    return section.items.join(', ');
  }

  if (Array.isArray(section.steps) && section.steps.length) {
    return section.steps.join(', ');
  }

  return '';
}

function getExcerpt(sections) {
  const textSection =
    sections.find((section) => section.type === 'text') ||
    sections.find((section) => ['highlight', 'example', 'analogy', 'list', 'steps'].includes(section.type));

  const text = getSectionText(textSection || {});

  if (!text) {
    return 'Короткая статья о страховании и жизненных рисках.';
  }

  return text.length > 150 ? `${text.slice(0, 147).trim()}...` : text;
}

function createArticle({ id, slug, title, category, content }) {
  const excerpt = getExcerpt(content);

  return {
    id,
    slug,
    url: `/${slug}`,
    title,
    excerpt,
    metaDescription: excerpt,
    image: categoryImages[category] || '/png/blog.png',
    category,
    tags: categoryTags[category] || ['страхование'],
    sections: content,
  };
}

const extraArticlesSource = [
  {
    slug: 'when-insurance-is-not-needed',
    title: 'Когда страхование не нужно — и это нормально',
    category: 'Основы страхования',
    content: [
      { type: 'text', value: 'Иногда страхование действительно не нужно — и это тоже важно понимать.' },
      { type: 'text', value: 'Если вещь недорогая или её легко заменить, страховка может не иметь смысла.' },
      {
        type: 'list',
        title: '❌ Когда можно обойтись без страховки',
        items: ['если вещь дешёвая', 'если риск минимальный', 'если легко заменить'],
      },
      {
        type: 'highlight',
        value: 'Страхование — это про разумную защиту, а не про страховать всё подряд.',
      },
    ],
  },
  {
    slug: 'why-insurance-costs-less-than-it-seems',
    title: 'Почему страховка стоит дешевле, чем кажется',
    category: 'Основы страхования',
    content: [
      { type: 'text', value: 'Ты платишь небольшую сумму сейчас, чтобы не потерять большую потом.' },
      {
        type: 'example',
        value: 'Страховка телефона: 1500 ₽ / Ремонт: 12 000 ₽',
      },
      {
        type: 'analogy',
        title: '🎮 Как в игре',
        value: 'Это как купить броню перед сложным уровнем.',
      },
    ],
  },
  {
    slug: 'what-is-an-insured-event',
    title: 'Что такое страховой случай',
    category: 'Основы страхования',
    content: [
      { type: 'text', value: 'Страховой случай — это ситуация, когда страховка начинает работать.' },
      {
        type: 'list',
        title: 'Примеры',
        items: ['разбился телефон', 'потеряли багаж', 'болезнь в поездке'],
      },
      {
        type: 'highlight',
        value: 'Важно: страховой случай должен быть прописан в договоре.',
      },
    ],
  },
  {
    slug: 'why-people-do-not-think-about-risks',
    title: 'Почему люди не думают о рисках',
    category: 'Жизненные ситуации',
    content: [
      { type: 'text', value: 'Люди не любят думать о плохом — это нормально.' },
      {
        type: 'list',
        items: ['со мной не случится', 'подумаю потом', 'это далеко'],
      },
      {
        type: 'highlight',
        value: 'Риски существуют независимо от того, думаем мы о них или нет.',
      },
    ],
  },
  {
    slug: 'how-to-choose-insurance',
    title: 'Как выбрать страховку',
    category: 'Виды страхования',
    content: [
      {
        type: 'steps',
        title: 'Алгоритм',
        items: ['что может случиться', 'сколько это стоит', 'готов ли платить сам'],
      },
      {
        type: 'highlight',
        value: 'Главный вопрос: готов ли ты покрыть это сам?',
      },
    ],
  },
  {
    slug: 'what-is-risk',
    title: 'Что такое риск',
    category: 'Основы страхования',
    content: [
      { type: 'text', value: 'Риск — это вероятность, что что-то пойдёт не так.' },
      {
        type: 'list',
        items: ['сломался телефон', 'потерял вещи', 'заболел'],
      },
    ],
  },
  {
    slug: 'this-will-not-happen-to-me-is-a-mistake',
    title: 'Почему "со мной такого не случится" — ошибка',
    category: 'Жизненные ситуации',
    content: [
      { type: 'text', value: 'Это самая частая ошибка мышления.' },
      {
        type: 'highlight',
        value: 'Случайности происходят у всех.',
      },
    ],
  },
  {
    slug: 'what-you-actually-buy',
    title: 'Что ты покупаешь на самом деле',
    category: 'Основы страхования',
    content: [
      { type: 'text', value: 'Ты покупаешь не выплату, а защиту.' },
      {
        type: 'analogy',
        value: 'Это как сохранить игру.',
      },
    ],
  },
  {
    slug: 'insurance-is-not-a-way-to-profit',
    title: 'Почему страховка — не способ заработать',
    category: 'Основы страхования',
    content: [
      { type: 'text', value: 'Страхование не про прибыль, а про защиту.' },
      {
        type: 'highlight',
        value: 'Ты платишь за спокойствие.',
      },
    ],
  },
  {
    slug: 'why-thinking-ahead-matters',
    title: 'Почему важно думать наперёд',
    category: 'Жизненные ситуации',
    content: [
      { type: 'text', value: 'Решения сегодня влияют на последствия завтра.' },
      {
        type: 'highlight',
        value: 'Страхование — это про мышление наперёд.',
      },
    ],
  },
  {
    slug: 'why-games-teach-better',
    title: 'Почему игра учит лучше',
    category: 'Основы страхования',
    content: [
      { type: 'text', value: 'Игровой опыт запоминается лучше, чем текст.' },
      {
        type: 'list',
        items: ['решаешь', 'видишь последствия', 'запоминаешь'],
      },
      {
        type: 'highlight',
        value: 'Опыт лучше теории.',
      },
    ],
  },
  {
    slug: 'how-insurance-affects-peace-of-mind',
    title: 'Как страховка влияет на спокойствие',
    category: 'Жизненные ситуации',
    content: [
      {
        type: 'list',
        items: ['меньше стресса', 'меньше рисков', 'больше уверенности'],
      },
      {
        type: 'analogy',
        value: 'Как сохранение перед сложным уровнем.',
      },
    ],
  },
];

const extraArticles = extraArticlesSource.map((article, index) =>
  createArticle({
    id: index + 4,
    ...article,
  })
);

export default extraArticles;
