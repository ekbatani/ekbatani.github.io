const data = {
  id: 2,
  format: 'ltr',
  title: 'Programming Topics',
  subTitle: 'Here I try to organize my activites in as a developer',
  link: '/secondBrain/2',
  date: '2021-11-28',
  recall: {
    tags: ['secondBrain'],
    questions: ['What`s Second brain?', 'How it is working?'],
  },
  notes: [
    {
      type: 'text',
      title: 'Main idea',
      text: [
        {
          text: 'programming',
          link: '',
        },
      ],
    },
    {
      type: 'list',
      title: 'Topics',
      text: [
        {
          text: 'programming',
          link: 'programming',
        },
        {
          text: 'study',
          link: 'study',
        },
      ],
    },
  ],
  summery: [
    {
      type: 'text',
      title: '',
      text: ['', ''],
    },
  ],
};

export default data;
