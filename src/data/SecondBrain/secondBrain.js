const data = {
  id: 1,
  format: 'ltr',
  title: 'This is my second brain!',
  subTitle: 'I try to organize my activities, in "Cornell Notes" format',
  link: '/secondBrain/1',
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
