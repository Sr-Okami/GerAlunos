import { useState } from 'react';

function BotaoCopiar({ texto }) {
  const [copiado, setCopiado] = useState(false);
  const handleCopiar = () => {
    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(true);
      setTimeout(() => {
        setCopiado(false);
      }, 1500);
    });
  };
  return (
      <button
        onClick={handleCopiar}
        title="Copiar nome"
        className="bg-neutral-800 text-neutral-400 hover:bg-neutral-700 text-xs px-2 py-1 rounded-full cursor-pointer"
      >
        {copiado ? '✓' : '⧉'}
      </button>
    )
}

export default BotaoCopiar;
