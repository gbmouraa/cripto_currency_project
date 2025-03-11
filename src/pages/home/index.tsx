import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home-style.css";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

interface CoinProps {
  id: string;
  rank: string;
  changePercent24Hr: string;
  explorer: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  supply: string;
  symbol: string;
  volvwap24Hr: string;
  volumeUsd24Hr: string;
  // propriedades opcionais pois não vem direto
  // da api, são adicionadas posteriormente
  formatedPrice?: string;
  formatedMarketCap?: string;
  formatedVolume?: string;
}

interface DataProps {
  data: CoinProps[];
}

export const Home = () => {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [offset]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input === "") return;
    navigate(`/detail/${input}`);
  };

  const getData = async () => {
    try {
      const req = await fetch(
        `https://api.coincap.io/v2/assets?limit=10&offset=${offset}`
      );
      const response: DataProps = await req.json();
      const data = response.data;

      const price = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      const compactPrice = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
      });

      const formatedResult = data.map((item) => {
        const formated = {
          ...item,
          formatedPrice: price.format(Number(item.priceUsd)),
          formatedMarketCap: compactPrice.format(Number(item.marketCapUsd)),
          formatedVolume: compactPrice.format(Number(item.volumeUsd24Hr)),
        };
        return formated;
      });

      const coinsList = [...coins, ...formatedResult];

      setCoins(coinsList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMore = () => {
    if (offset === 0) {
      setOffset(10);
      return;
    }

    setOffset((prev) => prev + 10);
  };

  return (
    <main className="home-container">
      <form className="home-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#fff" />
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th scope="col" className="home-th">
              Moeda
            </th>
            <th scope="col" className="home-th">
              Valor de Mercado
            </th>
            <th scope="col" className="home-th">
              Preço
            </th>
            <th scope="col" className="home-th">
              Volume
            </th>
            <th scope="col" className="home-th">
              Mudança 24h
            </th>
          </tr>
        </thead>
        <tbody id="home-tbody">
          {coins.length > 0 &&
            coins.map((item) => (
              <tr className="home-tr" key={item.id}>
                <td className="home-td-label" data-label="Moeda">
                  <div className="home-currency-name">
                    <img
                      src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                      alt="Logo"
                      className="home-currency-logo"
                    />
                    <Link to={`/detail/${item.id}`}>
                      <span>{item.symbol}</span>
                    </Link>
                  </div>
                </td>
                <td className="home-td-label" data-label="Valor de Mercado">
                  {item.formatedMarketCap}
                </td>
                <td className="home-td-label" data-label="Preço">
                  {item.formatedPrice}
                </td>
                <td className="home-td-label" data-label="Volume">
                  {item.formatedVolume}
                </td>
                <td
                  className={`home-td-label ${
                    Number(item.changePercent24Hr) > 0 ? "td-profit" : "td-loss"
                  }`}
                  data-label="Mudança 24h"
                >
                  <span>{Number(item.changePercent24Hr).toFixed(2)}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="btn-more" onClick={handleGetMore}>
        Mostrar mais
      </button>
    </main>
  );
};
