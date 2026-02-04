export default {
  id: 'love_story',
  name: 'Lagos Love Story',
  description: 'Modern Nigerian romance in urban setting',
  category: 'romance',
  difficulty: 'intermediate',
  basedOn: 'Contemporary Nollywood romance',
  estimatedDuration: '10-15 minutes',

  defaults: {
    lead1: 'Career-Focused Woman',
    lead2: 'Charming Entrepreneur',
    setting: 'Lagos (VI, Lekki, Ikeja)',
    obstacle: 'Family Expectations',
    moral: 'True love requires compromise and understanding'
  },

  structure: {
    act1: {
      description: 'Meet-Cute',
      beats: [
        'Introduce lead1 in daily life',
        'Introduce lead2 in daily life',
        'Unexpected meeting',
        'Initial attraction despite differences'
      ]
    },
    act2: {
      description: 'Romance & Conflict',
      beats: [
        'Growing relationship',
        'Family/societal pressure',
        'Misunderstanding/conflict',
        'Temporary separation'
      ]
    },
    act3: {
      description: 'Resolution',
      beats: [
        'Realization of true feelings',
        'Grand gesture',
        'Overcoming obstacles together',
        'Happy ending'
      ]
    },
    scenes: []
  },

  characterArchetypes: [
    {
      role: 'protagonist',
      species: 'Human',
      personalityTraits: ['ambitious', 'independent', 'guarded', 'passionate'],
      voiceTone: 'confident, modern Nigerian accent'
    },
    {
      role: 'love_interest',
      species: 'Human',
      personalityTraits: ['charming', 'persistent', 'sincere', 'humorous'],
      voiceTone: 'warm, playful, Lagos accent'
    }
  ]
};
