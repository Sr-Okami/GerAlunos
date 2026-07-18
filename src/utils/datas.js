export function diasRestantes(ateData) {
  if (!ateData) return null;

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const [ano, mes, dia] = ateData.split('-').map(Number)
  const limite = new Date(ano, mes - 1, dia)
  limite.setHours(0, 0, 0, 0)

  const diferenca = limite - hoje
  return Math.floor(diferenca / (1000 * 60 * 60 * 24))
}
export function formatarData(data) {
  if (!data) return '--'
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}
