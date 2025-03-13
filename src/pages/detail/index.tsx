import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CoinProps } from "../home";
import "./detail-style.css";

interface ResponseData {
  data: CoinProps;
}

interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData;

export const Detail = () => {
  const [coin, setCoin] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);
  const { cripto } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fechData = async () => {
      try {
        const req = await fetch(`https://api.coincap.io/v2/assets/${cripto}`);
        const response = await req.json();
        const data: DataProps = response;

        // in - usado para verficar se existe a respectiva chave em um objeto
        if ("error" in data) {
          navigate("/");
          return;
        }

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        const compactPrice = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });

        const dataResult = {
          ...data.data,
          formatedPrice: price.format(Number(data.data.priceUsd)),
          formatedMarketCap: compactPrice.format(
            Number(data.data.marketCapUsd)
          ),
          formatedVolume: compactPrice.format(Number(data.data.volumeUsd24Hr)),
        };

        setCoin(dataResult);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fechData();
  }, [cripto]);

  if (loading || !coin) {
    return (
      <div>
        <h4>Carregando detalhes...</h4>
      </div>
    );
  }

  return (
    <div className="details-cointainer">
      <h1 className="center">{coin?.name}</h1>
      <h1 className="center">{coin?.symbol}</h1>
      <section className="details-content">
        <img
          src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
          alt="Logo"
        />
        <h1>
          {coin?.name} | {coin?.symbol}
        </h1>
        <p>
          <strong>Preço: </strong>
          {coin?.formatedPrice}
        </p>
        <p>
          <strong>Mercado: </strong>
          {coin?.formatedMarketCap}
        </p>
        <p>
          <strong>Volume: </strong>
          {coin?.formatedVolume}
        </p>
        <p>
          <strong>Mudança 24hr: </strong>
          <span
            className={`${
              Number(coin?.changePercent24Hr) > 0 ? "profit" : "loss"
            }`}
          >
            {Number(coin?.changePercent24Hr).toFixed(3)}
          </span>
        </p>
      </section>
    </div>
  );
};
