export const numeros = [
  'II',
  'III',
  'IV',
  'V',
]
export const letras = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
]

export const turmas = numeros.flatMap((numero) => letras.map((letra) => `${numero}-${letra}`))
