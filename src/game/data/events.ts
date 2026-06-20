import type { GameEventDef } from '../types';

export const EVENTS: GameEventDef[] = [
  {
    id: 'photographer',
    title: 'Wildlife Photographer',
    description: 'A photographer wants to feature your zoo in a magazine for a fee.',
    weight: 3,
    choices: [
      {
        id: 'pay',
        label: 'Pay $80 for the feature',
        effect: { coins: -80, visitorBoostNextTick: 0.5 },
        resultMessage: 'The magazine feature brought in extra visitors!',
      },
      {
        id: 'decline',
        label: 'Decline',
        effect: {},
        resultMessage: 'You declined the offer.',
      },
    ],
  },
  {
    id: 'sick_animal',
    title: 'Sick Animal',
    description: 'One of your animals has fallen ill and needs treatment.',
    weight: 4,
    choices: [
      {
        id: 'treat',
        label: 'Pay $100 for treatment',
        effect: { coins: -100, happinessDelta: 10 },
        resultMessage: 'The animal was treated and is feeling better.',
      },
      {
        id: 'ignore',
        label: 'Ignore it',
        effect: { happinessDelta: -15 },
        resultMessage: 'The animal\'s condition worsened. Visitors noticed.',
      },
    ],
  },
  {
    id: 'donor',
    title: 'Generous Donor',
    description: 'A wealthy patron admires your zoo and offers a donation.',
    weight: 3,
    choices: [
      {
        id: 'accept',
        label: 'Accept the donation',
        effect: { coins: 150 },
        resultMessage: 'You received a $150 donation!',
      },
      {
        id: 'thank',
        label: 'Thank them politely',
        effect: { coins: 50 },
        resultMessage: 'A modest $50 gift was left anyway.',
      },
    ],
  },
  {
    id: 'school_trip',
    title: 'School Field Trip',
    description: 'A school has booked a field trip to your zoo tomorrow!',
    weight: 4,
    choices: [
      {
        id: 'welcome',
        label: 'Welcome them',
        effect: { visitorBoostNextTick: 0.8 },
        resultMessage: 'The students had a wonderful time!',
      },
    ],
  },
  {
    id: 'storm',
    title: 'Sudden Storm',
    description: 'A storm rolls in, scaring off some visitors and unsettling animals.',
    weight: 3,
    choices: [
      {
        id: 'shelter',
        label: 'Pay $60 for emergency shelters',
        effect: { coins: -60 },
        resultMessage: 'Shelters kept the animals calm through the storm.',
      },
      {
        id: 'endure',
        label: 'Wait it out',
        effect: { happinessDelta: -10 },
        resultMessage: 'The storm left animals stressed.',
      },
    ],
  },
  {
    id: 'grant',
    title: 'Conservation Grant',
    description: 'A conservation group offers funding in exchange for research collaboration.',
    weight: 2,
    choices: [
      {
        id: 'collab',
        label: 'Collaborate (gain RP)',
        effect: { researchPoints: 8 },
        resultMessage: 'Your scientists gained valuable research insight.',
      },
      {
        id: 'funding',
        label: 'Take the funding instead',
        effect: { coins: 120 },
        resultMessage: 'You received $120 in grant funding.',
      },
    ],
  },
  {
    id: 'escape_scare',
    title: 'Escape Scare',
    description: 'An enclosure gate was left unlocked overnight! Nothing happened, but visitors are nervous.',
    weight: 2,
    choices: [
      {
        id: 'security',
        label: 'Pay $90 to reinforce security',
        effect: { coins: -90, happinessDelta: 5 },
        resultMessage: 'New locks reassured staff and animals alike.',
      },
      {
        id: 'ignore',
        label: 'Ignore it',
        effect: { happinessDelta: -8 },
        resultMessage: 'Rumors spread and animals seem uneasy.',
      },
    ],
  },
  {
    id: 'viral_video',
    title: 'Viral Video',
    description: 'A visitor\'s video of your zoo went viral online!',
    weight: 2,
    choices: [
      {
        id: 'enjoy',
        label: 'Enjoy the fame',
        effect: { visitorBoostNextTick: 1.2 },
        resultMessage: 'Visitor numbers spiked thanks to the viral clip!',
      },
    ],
  },
];
