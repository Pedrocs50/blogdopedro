import { useState } from 'react';
import {
  BASE,
  COMPLETA,
  VARIAVEIS,
  comSinal,
  numero,
  previsao,
} from './modelo';
import './shapley.css';

// Simulador de coalizoes: o leitor escolhe quais variaveis entram e ve a
// previsao do modelo de brinquedo. Sem rede e sem efeitos colaterais.
export default function Shapley() {
  const [ativas, setAtivas] = useState<string[]>(['bz', 'vel']);

  const alterna = (id: string) =>
    setAtivas((atual) => (atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]));

  const valor = previsao(ativas);
  const nomes = VARIAVEIS.filter((v) => ativas.includes(v.id)).map((v) => v.nome);
  const pct = Math.min(100, (valor / COMPLETA) * 100);

  return (
    <div className="shp">
      <div className="shp-botoes" role="group" aria-label="Variáveis na coalizão">
        {VARIAVEIS.map((v) => {
          const dentro = ativas.includes(v.id);
          const ganho = previsao([...ativas, v.id]) - valor;
          return (
            <button
              key={v.id}
              type="button"
              className="shp-botao"
              aria-pressed={dentro}
              onClick={() => alterna(v.id)}
            >
              <span className="shp-nome">
                <span aria-hidden="true">{dentro ? '✓' : '○'}</span> {v.nome}
              </span>
              <span className="shp-sensor">{v.sensor}</span>
              <span className="shp-dica">{dentro ? 'na coalizão' : `${comSinal(ganho)} se entrar`}</span>
            </button>
          );
        })}
      </div>

      <div className="shp-saida" aria-live="polite">
        <div className="shp-linha">
          <span className="shp-coalizao">Coalizão {'{'} {nomes.join(', ')} {'}'}</span>
          <span className="shp-valor">{numero(valor)} nT</span>
        </div>
        <div className="shp-trilha" aria-hidden="true">
          <div className="shp-barra" style={{ width: `${pct}%` }} />
        </div>
        <span className="shp-nota">
          {comSinal(valor - BASE)} sobre a base · base (nenhuma variável): {numero(BASE)} nT ·
          previsão completa: {numero(COMPLETA)} nT
        </span>
      </div>
    </div>
  );
}
