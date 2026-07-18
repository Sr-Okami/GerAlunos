
function BotaoExcluir({ onClick }) {
  return (
    <button onClick={onClick} className="bg-red-600 text-red-400 hover:bg-red-950 text-xs px-3 py-1 rounded-full cursor-pointer">
      Excluir
    </button>
  )
}

export default BotaoExcluir
