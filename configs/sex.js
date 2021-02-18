const { GenderRoles, getMemberPronounSubject, getMemberPronounPossessive, getMemberPronounObject, getMemberGenderRole } = require('../message-utils.js');

export default {

  anatomyParts: {
    mouth: {
      aliases: [
        'lip',
        'head',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },

    throat: {
      aliases: [
        'troat',
        'throth',
        'throath',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    face: {
      aliases: [],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    hair: {
      aliases: [],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    ear: {
      aliases: [],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    nose: {
      aliases: [
        'nostril',
        'sinus',
        'sinuses',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    foot: {
      aliases: [
        'feet',
        'toe',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    thigh: {
      aliases: [
        'leg',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    knee: {
      aliases: [
        'kneepit',
        'knee pit',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    hand: {
      aliases: [
        'hand',
        'finger',
        'fist',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    armpit: {
      aliases: [
        'arm pit',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    chest: {
      aliases: [
        'pectoral',
        'pec'
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    stomach: {
      aliases: [
        'midriff',
        'navel'
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    back: {
      aliases: [],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    ass: {
      aliases: [
        'butt',
        'asshole',
        'ass hole',
        'hole',
        'bussy',
        'boy pussy',
        'boi pussy',
        'boipussy',
        'boypussy',
        'boyhole',
        'boihole',
        'boi hole',
        'boy hole',
        'guts',
        'backdoor',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    vagina: {
      aliases: [
        'pussy',
        'cunt',
        'hole',
        'cumhole',
        'fuckhole',
        'cockhole',
        'cocksocket',
        'cocksleeve',
      ],
      genders:[
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    breast: {
      aliases: [
        'tit',
        'boob',
        'jug',
        'milker',
      ],
      genders:[
        GenderRoles['RP - Female'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    penis: {
      aliases: [
        'dick',
        'cock',
        'rod',
        'girlcock',
        'girl cock',
        'girldick',
        'girl dick',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
    
    ball: {
      aliases: [
        'testicle',
        'nut',
        'ballsack',
        'nutsack',
        'scrotum',
      ],
      genders:[
        GenderRoles['RP - Male'],
        GenderRoles['RP - Futa'],
        GenderRoles['default'],
      ],
    },
  },

  anatomyInteractions: [
    {
      parts: [
        anatomyParts.penis,
        anatomyParts.vagina
      ],
      tags: [
        [
          'cum_in_pussy',
          'cum_on_pussy',
          'vaginal'
        ],
      ],
    },
  ],

}

[
  {
    "partner1Roles": [
      "male",
      "futa"
    ],
    "partner2Roles": [
      "female",
      "futa"
    ],
    "positionalTags": [
      "vagina",
      "pussy",
      "cunt",
      "hole",
      "cumhole",
      "fuckhole",
      "cockhole",
      "cocksocket",
      "cocksleeve"
    ],
  }
]


(@male) $fuck @female pussy
  - sender: male, futa
  - mention: female, futa
  - anatomyTag: pussy
  - actionTag: fuck
  - participants: 1 male, 1 female

(@female) $fuck @male pussy
  - sender: female, futa
  - mention: male, futa
  - anatomyTag: pussy
  - actionTag: fuck
  - participants: 1 male, 1 female

$blow @male