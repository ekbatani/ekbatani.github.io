const data = [
  {
    id: 1,
    format: 'ltr',
    title: 'This is my second brain!',
    subTitle: 'I try to organize my activities, in "Cornell Notes" format',
    link: '/secondBrain/1',
    date: '2021-11-28',
    recall: {
      tags: ['secondBrain', 'Cornell'],
      questions: ['What`s Second brain?', 'How it is working?'],
    },
    notes: [
      {
        isList: false,
        title: 'Main idea',
        text: [
          {
            text: 'In the modern world, We are under attach of the informations.We are reciving massive informations every day.',
            link: '',
          },
        ],
      },
      {
        isList: true,
        title: 'Topics',
        text: [
          {
            text: 'programming',
            link: '2',
          },
          {
            text: 'study',
            link: '3',
          },
        ],
      },
    ],
    summery: [
      {
        isList: false,
        title: 'I hope it helps.',
        text: [''],
      },
    ],
  },
  {
    id: 2,
    format: 'ltr',
    title: 'Programming Topics',
    subTitle: 'Here I try to organize my activites in as a developer',
    link: '/secondBrain/2',
    date: '2021-11-28',
    recall: {
      tags: ['programming'],
      questions: ['What`s the journey as a web developer?'],
    },
    notes: [
      {
        isList: false,
        title: 'I try to explain main topic of my career as a web developer',
        text: [
          {
            text: '',
            link: '',
          },
        ],
      },
      {
        isList: true,
        title: 'Topics',
        text: [
          {
            text: 'dotnet core',
            link: '3',
          },
          {
            text: 'Sql server',
            link: '4',
          },
        ],
      },
    ],
    summery: [
      {
        isList: false,
        title: '',
        text: ['', ''],
      },
    ],
  },
];

export default data;
