function BotaoEditar({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 text-green-400 hover:bg-green-950 text-xs px-3 py-1 rounded-full cursor-pointer">
      Editar
    </button>
  )
}

export default BotaoEditar
