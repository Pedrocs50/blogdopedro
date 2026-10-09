import { BASE, COMPLETA, VARIAVEIS, comSinal, numero, valoresShapley } from './modelo';
import './shapley.css';

type Props = {
  /** Quando `true`, omite a linha de conferencia da soma. */
  compacto?: boolean;
};

// Barras com o valor de Shapley de cada variavel. Nao precisa de JavaScript
// no navegador: e renderizado no build (use sem `client:*`).
export default function Resultado({ compacto = false }: Props) {
  const phi = valoresShapley();
  const maior = Math.max(...Object.values(phi));
  const soma = Object.values(phi).reduce((a, b) => a + b, 0);

  return (
    <div className="shp-resultado">
      {VARIAVEIS.map((v) => (
        <div key={v.id} className="shp-item">
          <div className="shp-linha">
            <span>{v.longo}</span>
            <span className="shp-num">{comSinal(phi[v.id])}</span>
          </div>
          <div className="shp-trilha" aria-hidden="true">
            <div className="shp-barra" style={{ width: `${(phi[v.id] / maior) * 100}%` }} />
          </div>
        </div>
      ))}
      {!compacto && (
        <p className="shp-conferencia">
          {numero(BASE)} + {VARIAVEIS.map((v) => numero(phi[v.id])).join(' + ')} ={' '}
          {numero(BASE + soma)} nT. A soma dos créditos fecha exatamente com a previsão
          {BASE + soma === COMPLETA ? '.' : ' (confira o modelo!).'}
        </p>
      )}
    </div>
  );
}
