export default {
  id: 'hero_journey',
  name: "The Hero's Journey (African Context)",
  description: "Classic hero's journey adapted for Nigerian storytelling",
  category: 'adventure',
  difficulty: 'intermediate',
  basedOn: 'Joseph Campbell + African folklore',
  estimatedDuration: '15-20 minutes',

  defaults: {
    hero: 'Young Warrior',
    mentor: 'Village Elder',
    villain: 'Dark Spirit',
    setting: 'Mystical African Village',
    moral: 'Courage and self-belief overcome any obstacle'
  },

  structure: {
    act1: {
      description: 'Ordinary World & Call to Adventure',
      beats: [
        'Introduce hero in ordinary life',
        'Disturbance/threat to village',
        'Hero initially refuses call',
        'Mentor appears and encourages hero'
      ]
    },
    act2: {
      description: 'Trials and Transformation',
      beats: [
        'Hero leaves village',
        'Faces first challenge',
        'Meets allies',
        'Faces major setback',
        'Discovers inner strength'
      ]
    },
    act3: {
      description: 'Climax and Return',
      beats: [
        'Final confrontation with villain',
        'Hero uses learned lessons',
        'Victory and transformation',
        'Return to village as changed person'
      ]
    },
    scenes: []
  },

  characterArchetypes: [
    {
      role: 'protagonist',
      species: 'Human',
      personalityTraits: ['brave', 'uncertain', 'growing', 'determined'],
      voiceTone: 'young, earnest, evolving confidence'
    },
    {
      role: 'mentor',
      species: 'Human (Elder)',
      personalityTraits: ['wise', 'patient', 'mystical', 'caring'],
      voiceTone: 'aged, knowing, gentle'
    },
    {
      role: 'antagonist',
      species: 'Spirit/Supernatural',
      personalityTraits: ['menacing', 'powerful', 'ancient'],
      voiceTone: 'deep, echoing, ominous'
    }
  ]
};
