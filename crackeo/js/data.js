const symbols = ['◆', '●', '▲', '■', '★', '☘'];

const difficultySettings = {
  easy: {
    length: 3,
    allowRepeat: false,
    progressCode: 'LOGICA',
    label: 'Fácil: 3 símbolos sin repetición'
  },
  medium: {
    length: 4,
    allowRepeat: false,
    progressCode: 'PATRON',
    label: 'Media: 4 símbolos sin repetición'
  },
  hard: {
    length: 4,
    allowRepeat: true,
    progressCode: 'MASTER',
    label: 'Difícil: 4 símbolos con repetición'
  }
};
