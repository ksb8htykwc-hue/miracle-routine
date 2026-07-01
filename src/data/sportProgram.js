// Programme "Eric Flag" — 60 séances (Volume 1 : jours 1-30, Volume 2 : jours 31-60).
const EF = id => `https://programmes.ericflag.com/courses/1213170/lectures/${id}`

const V1 = {
  echauffement: 'https://youtu.be/pcgzgl8b5C8',
  epaulesDos: 'https://youtu.be/n4fsXXfU5jY',
  posture: 'https://youtu.be/PX1mLdKFD_w',
  assouplissement: 'https://youtu.be/WjsQc9GUBW0',
  pectoraux: 'https://youtu.be/2m6FlDwaIhc',
  abdos: 'https://youtu.be/3eQa7C6D4XU',
  basDuCorps: 'https://youtu.be/G2NWfxVM8jg',
  bras: 'https://youtu.be/97RT7J7ikpw',
}

const V2 = {
  echauffement: 'https://youtu.be/pcgzgl8b5C8',
  pompes: 'https://youtu.be/ZHiXQUpJdf0',
  abdosGainage: 'https://youtu.be/9zDE16j14Ng',
  mobiliteActive: 'https://youtu.be/zNhqYaa79jY',
  basDuCorps: 'https://youtu.be/KoD1uenU6go',
  dosBiceps: 'https://youtu.be/VYBb-Ul-ack',
  assouplissement: 'https://youtu.be/WjsQc9GUBW0',
  technique: 'https://youtu.be/5zhlDW1WUw8',
}

const b = (label, url) => ({ label, url })

function buildDay(dayInVolume, volume, duration, blocks, restOptions = null) {
  const rest = blocks === null
  const title = rest
    ? 'Repos'
    : blocks.filter(x => x.label !== 'Échauffement').map(x => x.label).join(' + ')
  return {
    dayInVolume,
    volume,
    duration: rest ? null : duration,
    rest,
    title: title || 'Échauffement',
    blocks: rest ? (restOptions || []) : blocks,
  }
}

const volume1 = [
  buildDay(1, 1, 28, [b('Échauffement', EF('27191616')), b('Pectoraux', EF('27191616')), b('Posture', EF('27191616'))]),
  buildDay(2, 1, 33, [b('Échauffement', EF('27191616')), b('Épaules & Dos', EF('27191616')), b('Bas du Corps', EF('27191616'))]),
  buildDay(3, 1, null, null, [b('Assouplissement', EF('27191616')), b('Posture', EF('27191616')), b('Technique', EF('27191616'))]),
  buildDay(4, 1, 28, [b('Échauffement', EF('27191616')), b('Bras', EF('27191616')), b('Abdos', EF('27191616'))]),
  buildDay(5, 1, 30, [b('Échauffement', EF('27191616')), b('Bas du Corps', EF('27191616')), b('Abdos', EF('27191616'))]),

  buildDay(6, 1, 31, [b('Échauffement', V1.echauffement), b('Épaules & Dos', V1.epaulesDos), b('Posture', V1.posture)]),
  buildDay(7, 1, null, null, [b('Assouplissement', V1.assouplissement), b('Posture', V1.posture)]),
  buildDay(8, 1, 26, [b('Échauffement', V1.echauffement), b('Pectoraux', V1.pectoraux), b('Abdos', V1.abdos)]),
  buildDay(9, 1, 34, [b('Échauffement', V1.echauffement), b('Bas du Corps', V1.basDuCorps), b('Bas du Corps', V1.basDuCorps)]),
  buildDay(10, 1, 31, [b('Échauffement', V1.echauffement), b('Épaules & Dos', V1.epaulesDos), b('Bras', V1.bras)]),

  buildDay(11, 1, null, null, [b('Assouplissement', V1.assouplissement), b('Posture', V1.posture)]),
  buildDay(12, 1, 30, [b('Échauffement', V1.echauffement), b('Pectoraux', V1.pectoraux), b('Bas du Corps', V1.basDuCorps)]),
  buildDay(13, 1, 29, [b('Échauffement', V1.echauffement), b('Épaules & Dos', V1.epaulesDos), b('Abdos', V1.abdos)]),
  buildDay(14, 1, 32, [b('Échauffement', V1.echauffement), b('Bas du Corps', V1.basDuCorps), b('Posture', V1.posture)]),
  buildDay(15, 1, 28, [b('Échauffement', V1.echauffement), b('Pectoraux', V1.pectoraux), b('Bras', V1.bras)]),

  buildDay(16, 1, null, null, [b('Assouplissement', EF('27074889')), b('Posture', EF('27074889'))]),
  buildDay(17, 1, 31, [b('Échauffement', EF('27074889')), b('Épaules & Dos', EF('27074889')), b('Posture', EF('27074889'))]),
  buildDay(18, 1, 32, [b('Échauffement', EF('27074889')), b('Bras', EF('27074889')), b('Bas du Corps', EF('27074889'))]),
  buildDay(19, 1, 26, [b('Échauffement', EF('27074889')), b('Abdos', EF('27074889')), b('Abdos', EF('27074889'))]),
  buildDay(20, 1, 26, [b('Échauffement', EF('27074889')), b('Pectoraux', EF('27074889')), b('Pectoraux', EF('27074889'))]),

  buildDay(21, 1, 49, [b('Échauffement', EF('27074896')), b('Bas du Corps', EF('27074896')), b('Bas du Corps', EF('27074896')), b('Posture', EF('27074896'))]),
  buildDay(22, 1, null, null, [b('Assouplissement', EF('27074896')), b('Posture', EF('27074896'))]),
  buildDay(23, 1, 44, [b('Échauffement', EF('27074896')), b('Épaules & Dos', EF('27074896')), b('Bras', EF('27074896')), b('Abdos', EF('27074896'))]),
  buildDay(24, 1, 47, [b('Échauffement', EF('27074896')), b('Bas du Corps', EF('27074896')), b('Bas du Corps', EF('27074896')), b('Abdos', EF('27074896'))]),
  buildDay(25, 1, 28, [b('Échauffement', EF('27074896')), b('Pectoraux', EF('27074896')), b('Posture', EF('27074896'))]),

  buildDay(26, 1, null, null, [b('Assouplissement', V1.assouplissement), b('Posture', V1.posture)]),
  buildDay(27, 1, 45, [b('Échauffement', V1.echauffement), b('Bras', V1.bras), b('Bas du Corps', V1.basDuCorps), b('Abdos', V1.abdos)]),
  buildDay(28, 1, 45, [b('Échauffement', V1.echauffement), b('Épaules & Dos', V1.epaulesDos), b('Épaules & Dos', V1.epaulesDos), b('Abdos', V1.abdos)]),
  buildDay(29, 1, 49, [b('Échauffement', V1.echauffement), b('Bas du Corps', V1.basDuCorps), b('Bas du Corps', V1.basDuCorps), b('Posture', V1.posture)]),
  buildDay(30, 1, 41, [b('Échauffement', V1.echauffement), b('Pectoraux', V1.pectoraux), b('Bras', V1.bras), b('Abdos', V1.abdos)]),
]

const volume2 = [
  buildDay(1, 2, 32, [b('Échauffement', V2.echauffement), b('Pompes', V2.pompes), b('Abdos & Gainage', V2.abdosGainage)]),
  buildDay(2, 2, 37, [b('Échauffement', V2.echauffement), b('Mobilité Active', V2.mobiliteActive), b('Abdos & Gainage', V2.abdosGainage)]),
  buildDay(3, 2, 34, [b('Échauffement', V2.echauffement), b('Bas du Corps', V2.basDuCorps), b('Abdos & Gainage', V2.abdosGainage)]),
  buildDay(4, 2, 30, [b('Échauffement', V2.echauffement), b('Dos & Biceps', V2.dosBiceps), b('Pompes', V2.pompes)]),
  buildDay(5, 2, null, null, [b('Assouplissement', V2.assouplissement), b('Technique', V2.technique)]),

  buildDay(6, 2, 37, [b('Échauffement', EF('43577400')), b('Mobilité Active', EF('43577400')), b('Abdos & Gainage', EF('43577400'))]),
  buildDay(7, 2, 32, [b('Échauffement', EF('43577400')), b('Dos & Biceps', EF('43577400')), b('Bas du Corps', EF('43577400'))]),
  buildDay(8, 2, 32, [b('Échauffement', EF('43577400')), b('Pompes', EF('43577400')), b('Abdos & Gainage', EF('43577400'))]),
  buildDay(9, 2, 34, [b('Échauffement', EF('43577400')), b('Bas du Corps', EF('43577400')), b('Bas du Corps', EF('43577400'))]),
  buildDay(10, 2, 35, [b('Échauffement', EF('43577400')), b('Mobilité Active', EF('43577400')), b('Pompes', EF('43577400'))]),

  buildDay(11, 2, null, null, [b('Assouplissement', V2.assouplissement)]),
  buildDay(12, 2, 37, [b('Échauffement', V2.echauffement), b('Mobilité Active', V2.mobiliteActive), b('Abdos & Gainage', V2.abdosGainage)]),
  buildDay(13, 2, 32, [b('Échauffement', V2.echauffement), b('Pompes', V2.pompes), b('Bas du Corps', V2.basDuCorps)]),
  buildDay(14, 2, 37, [b('Échauffement', V2.echauffement), b('Mobilité Active', V2.mobiliteActive), b('Abdos & Gainage', V2.abdosGainage)]),
  buildDay(15, 2, 32, [b('Échauffement', V2.echauffement), b('Dos & Biceps', V2.dosBiceps), b('Bas du Corps', V2.basDuCorps)]),

  buildDay(16, 2, 32, [b('Échauffement', EF('43658874')), b('Pompes', EF('43658874')), b('Abdos & Gainage', EF('43658874'))]),
  buildDay(17, 2, null, null, [b('Assouplissement', EF('43658874')), b('Équilibre sur les mains', EF('43658874'))]),
  buildDay(18, 2, 30, [b('Échauffement', EF('43658874')), b('Dos & Biceps', EF('43658874')), b('Dos & Biceps', EF('43658874'))]),
  buildDay(19, 2, 40, [b('Échauffement', EF('43658874')), b('Mobilité Active', EF('43658874')), b('Mobilité Active', EF('43658874'))]),
  buildDay(20, 2, 34, [b('Échauffement', EF('43658874')), b('Bas du Corps', EF('43658874')), b('Bas du Corps', EF('43658874'))]),

  buildDay(21, 2, 37, [b('Échauffement', EF('43658959')), b('Abdos & Gainage', EF('43658959')), b('Abdos & Gainage', EF('43658959'))]),
  buildDay(22, 2, 30, [b('Échauffement', EF('43658959')), b('Pompes', EF('43658959')), b('Pompes', EF('43658959'))]),
  buildDay(23, 2, null, null, [b('Assouplissement', EF('43658959')), b('Équilibre sur les mains', EF('43658959'))]),
  buildDay(24, 2, 49, [b('Échauffement', EF('43658959')), b('Dos & Biceps', EF('43658959')), b('Bas du Corps', EF('43658959')), b('Abdos & Gainage', EF('43658959'))]),
  buildDay(25, 2, 54, [b('Échauffement', EF('43658959')), b('Mobilité Active', EF('43658959')), b('Abdos & Gainage', EF('43658959')), b('Abdos & Gainage', EF('43658959'))]),

  buildDay(26, 2, 47, [b('Échauffement', V2.echauffement), b('Pompes', V2.pompes), b('Bas du Corps', V2.basDuCorps), b('Dos & Biceps', V2.dosBiceps)]),
  buildDay(27, 2, null, null, [b('Assouplissement', V2.assouplissement), b('Équilibre sur les mains', V2.technique)]),
  buildDay(28, 2, 52, [b('Échauffement', V2.echauffement), b('Mobilité Active', V2.mobiliteActive), b('Dos & Biceps', V2.dosBiceps), b('Abdos & Gainage', V2.abdosGainage)]),
  buildDay(29, 2, 51, [b('Échauffement', V2.echauffement), b('Bas du Corps', V2.basDuCorps), b('Bas du Corps', V2.basDuCorps), b('Abdos & Gainage', V2.abdosGainage)]),
  buildDay(30, 2, 47, [b('Échauffement', V2.echauffement), b('Pompes', V2.pompes), b('Dos & Biceps', V2.dosBiceps), b('Abdos & Gainage', V2.abdosGainage)]),
]

export const SPORT_PROGRAM = [...volume1, ...volume2].map((day, idx) => ({
  ...day,
  globalDay: idx + 1,
}))

export const TOTAL_SPORT_DAYS = SPORT_PROGRAM.length
