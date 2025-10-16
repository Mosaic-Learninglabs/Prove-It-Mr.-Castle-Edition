export const vocabulary = {
  'naval': 'relating to ships',
  'reinforcements': 'additional soldiers',
  'bombardment': 'continuous attack',
  'siege': 'surrounding to force surrender',
  'essential': 'absolutely necessary',
  'warships': 'military ships',
  'terrain': 'physical features of land',
  'garrisons': 'military posts',
  'garrison': 'military post',
  'intimate knowledge': 'deep understanding',
  'strategic': 'carefully planned',
  'vast': 'extremely large',
  'geographic': 'relating to geography',
  'supply lines': 'routes for supplies',
  'militiamen': 'civilian soldiers',
  'militia': 'civilian soldiers',
  'expertise': 'special skill',
  'hardships': 'severe difficulties',
  'adapting': 'changing to fit',
  'tactics': 'planned actions',
  'confrontations': 'direct conflicts',
  'maintaining': 'keeping going',
  'strategic thinking': 'planning carefully',
  'morale': 'confidence',
  'critical': 'extremely important',
  'doctrine': 'official principles',
  'linear formations': 'straight soldier lines',
  'formations': 'organized arrangement',
  'volleys': 'simultaneous firing',
  'conventions': 'accepted rules',
  'employed': 'used',
  'irregular tactics': 'non-traditional fighting',
  'irregular': 'not normal',
  'maximizing casualties': 'causing most deaths',
  'casualties': 'deaths or injuries',
  'disrupted': 'interrupted',
  'unconventional': 'not normal',
  'coordinated strategy': 'actions working together',
  'coordinated': 'organized together',
  'strategy': 'plan of action',
  'vulnerable': 'exposed to danger',
  'privateers': 'private attack ships',
  'patrol': 'regularly check',
  'treasury': 'government money',
  'logistics': 'organizing supplies',
  'obstacles': 'things blocking progress',
  'professional troops': 'trained soldiers',
  'stationed': 'assigned to location',
  'pamphlets': 'small booklets',
  'self-governance': 'governing oneself',
  'enlist': 'join the military',
  'deserted': 'abandoned post',
  'occupation': 'military control',
  'personal stakes': 'personal interest',
  'guerrilla bands': 'small irregular fighters',
  'guerrilla': 'irregular warfare',
  'financial strain': 'economic pressure',
  'unprecedented': 'never before',
  'fiscal stability': 'financial steadiness',
  'fiscal': 'relating to money',
  'consumed': 'used up',
  'finance': 'provide money',
  'disrupting': 'interfering',
  'merchants': 'traders',
  'financial pressures': 'economic difficulties',
  'national debt': 'money owed',
  'assistance': 'help',
  'allied': 'joined as partners',
  'divert': 'redirect',
  'fortifications': 'defensive structures',
  'contributions': 'things given to help',
  'rival': 'competitor',
  'disciplined fighting force': 'well-trained army',
  'disciplined': 'well-trained',
  'resupply': 'provide new supplies'
};

// Function to wrap vocabulary words with tooltip spans
export const highlightVocabulary = (text) => {
  if (!text) return text;

  let result = text;

  // Sort vocabulary by length (longest first) to match multi-word phrases before single words
  const sortedVocab = Object.keys(vocabulary).sort((a, b) => b.length - a.length);

  sortedVocab.forEach(word => {
    // Create case-insensitive regex that matches whole words/phrases
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');

    result = result.replace(regex, (match) => {
      const definition = vocabulary[word.toLowerCase()];
      return `<span class="vocab-word" data-definition="${definition}">${match}</span>`;
    });
  });

  return result;
};
