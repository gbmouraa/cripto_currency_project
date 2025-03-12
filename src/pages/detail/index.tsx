import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CoinProps } from "../home";

interface ResponseData {
  data: CoinProps;
}

interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData;

export const Detail = () => {
  const [coin, setCoin] = useState<CoinProps>();
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
      } catch (error) {
        console.log(error);
      }
    };

    fechData();
  }, [cripto]);

  return (
    <div>
      <h1>Página Detalhe da Moeda</h1>
    </div>
  );
};
