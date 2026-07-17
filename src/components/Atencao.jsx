
function Atencao({ quantidade = 0 }) {
  return (
    <div className="relative inline-block">
      <button
        onClick={() => console.log('clicou em atencao')}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded trasition relative cursor-pointer"
      >
        Atencao
      </button>
      {/* numero de atencoes */}
      {quantidade > 0 && (
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full px-1.5">
          {quantidade}
        </span>
      )}
    </div>
  )
}

export default Atencao
