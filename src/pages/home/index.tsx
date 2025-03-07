import "./home-style.css";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <main className="home-container">
      <form className="home-form">
        <input type="text" placeholder="Digite o nome da moeda" />
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
          <tr className="home-tr">
            <td className="home-td-label" data-label="Moeda">
              <div>
                <Link to={"/detail/bitcoin"}>
                  <span>Bitcoin</span> | BTC
                </Link>
              </div>
            </td>
            <td className="home-td-label" data-label="Valor de Mercado">
              1T
            </td>
            <td className="home-td-label" data-label="Preço">
              8.000
            </td>
            <td className="home-td-label" data-label="Volume">
              2B
            </td>
            <td className="home-td-label" data-label="Mudança 24h">
              <span>1.20</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
