export default {
  id: 'trickster_tale',
  name: "The Trickster's Tale",
  description: 'A clever protagonist uses wit to outsmart a more powerful opponent',
  category: 'folktale',
  difficulty: 'beginner',
  basedOn: 'Anansi the Spider / Tortoise stories',
  estimatedDuration: '5-10 minutes',

  defaults: {
    protagonist: 'Clever Tortoise',
    antagonist: 'Proud King',
    setting: 'Ancient African Kingdom',
    moral: 'Wisdom triumphs over strength and pride'
  },

  outline: "{{protagonist}} and the {{antagonist}}'s Challenge",

  structure: {
    act1: {
      description: 'Introduction and Challenge',
      beats: [
        "Establish the kingdom and {{antagonist}}'s pride",
        '{{antagonist}} declares challenge',
        '{{protagonist}} accepts despite seeming disadvantage'
      ]
    },
    act2: {
      description: 'Three Tests',
      beats: [
        'Test 1: {{protagonist}} uses intelligence',
        'Test 2: {{protagonist}} shows patience',
        'Test 3: {{protagonist}} teaches lesson'
      ]
    },
    act3: {
      description: 'Resolution and Moral',
      beats: [
        '{{antagonist}} learns humility',
        '{{protagonist}} becomes advisor',
        'Kingdom celebrates wisdom'
      ]
    },
    scenes: [
      {
        sceneNumber: 1,
        heading: 'EXT. PALACE COURTYARD - MORNING',
        purpose: 'Establish setting and introduce {{antagonist}}',
        keyMoments: [
          '{{antagonist}} makes proclamation',
          'Crowd reacts',
          '{{protagonist}} observes'
        ]
      },
      {
        sceneNumber: 2,
        heading: 'EXT. VILLAGE SQUARE - DAY',
        purpose: '{{protagonist}} accepts challenge',
        keyMoments: [
          '{{protagonist}} steps forward',
          '{{antagonist}} mocks {{protagonist}}',
          'Stakes are set'
        ]
      },
      {
        sceneNumber: 3,
        heading: 'INT. THRONE ROOM - DAY',
        purpose: 'First test (riddle)',
        keyMoments: [
          '{{protagonist}} poses riddle',
          '{{antagonist}} struggles',
          '{{protagonist}} reveals answer'
        ]
      },
      {
        sceneNumber: 4,
        heading: 'EXT. RIVER - MIDDAY',
        purpose: 'Second test (impossible task)',
        keyMoments: [
          '{{antagonist}} sets impossible task',
          '{{protagonist}} finds clever solution',
          '{{antagonist}} reluctantly admits defeat'
        ]
      },
      {
        sceneNumber: 5,
        heading: 'INT. PALACE - EVENING',
        purpose: 'Third test and lesson',
        keyMoments: [
          '{{antagonist}} desperate for final test',
          '{{protagonist}} tells story',
          '{{antagonist}} kneels and learns humility'
        ]
      },
      {
        sceneNumber: 6,
        heading: 'EXT. PALACE - SUNSET',
        purpose: 'Celebration and resolution',
        keyMoments: [
          '{{antagonist}} makes {{protagonist}} advisor',
          'Kingdom celebrates',
          'Moral lesson shared'
        ]
      },
      {
        sceneNumber: 7,
        heading: 'EXT. VILLAGE SQUARE - MONTHS LATER',
        purpose: 'Epilogue',
        keyMoments: [
          'Show kingdom thriving',
          '{{protagonist}} and {{antagonist}} as friends',
          'Final message to audience'
        ]
      }
    ]
  },

  characterArchetypes: [
    {
      role: 'protagonist',
      species: 'Tortoise',
      personalityTraits: ['clever', 'humble', 'patient', 'wise'],
      voiceTone: 'warm, grandfatherly'
    },
    {
      role: 'antagonist',
      species: 'Human (King)',
      personalityTraits: ['proud', 'loud', 'dramatic', 'learns humility'],
      voiceTone: 'deep, booming'
    },
    {
      role: 'supporting',
      species: 'Human (Wise Advisor)',
      personalityTraits: ['patient', 'observant', 'supportive'],
      voiceTone: 'calm, motherly'
    },
    {
      role: 'supporting',
      species: 'Rabbit (Friend)',
      personalityTraits: ['energetic', 'loyal', 'doubting'],
      voiceTone: 'fast-talking, enthusiastic'
    }
  ],

  characterTemplate: `{
    "name": "{{characterName}}",
    "role": "{{role}}",
    "species": "{{species}}",
    "personality": {{json personalityTraits}},
    "voiceProfile": {
      "tone": "{{voiceTone}}",
      "accent": "{{language}} accent"
    }
  }`,

  sceneTemplate: `SCENE {{sceneNumber}}: {{heading}}

PURPOSE: {{purpose}}

{{#each keyMoments}}
- {{this}}
{{/each}}`,

  dialogueSamples: {
    pidgin: {
      protagonist_intro:
        'My pikin, sometimes the smallest person fit teach the biggest person big lesson. Na wisdom wey dey matter, no be size.',
      antagonist_boast: 'Make una hear me well well! I be the wisest king for this land!',
      moral: 'Remember o - no matter how small you be, you fit make big difference!'
    },
    yoruba: {
      protagonist_intro:
        'Ọmọ mi, àìmọ̀ kan kò ju àìmọ̀ méjì lọ. (My child, ignorance cannot teach ignorance.)',
      antagonist_boast:
        'Ẹ gbọ́ tèmi dáadáa! Èmi ni ọba tó mọ̀ jù lọ! (Listen to me well! I am the wisest king!)'
    }
  }
};
