import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Article from "./article";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route index element={<Main />} />
            <Route path="articles/:id" element={<Article />} />
        </Routes>
        {activeModal === "basket" && <Basket />}
      </BrowserRouter>
    </>
  );
}

export default App;
