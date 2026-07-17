
function DataLimite({ falta = 0 }) {
  return (
    <div className="relative inline-block">
      <button onClick={() => console.log('clicou em data limite')}
        className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 text-white transition relative cursor-pointer"
      >Data Limite</button>
      {falta > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
          {falta}
        </span>
      )}
    </div>
  );
}

export default DataLimite;
