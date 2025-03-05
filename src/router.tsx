import { Routes, Route } from "react-router-dom";

import { Header } from "./components/header";
import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { NotFound } from "./pages/notfound";

export const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:cripto" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
