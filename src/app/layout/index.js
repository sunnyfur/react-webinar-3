import { memo, useCallback, useEffect, useState } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import { Outlet } from "react-router-dom";
import WrapperBetween from '../../components/wrapper-between';
import Menu from '../../components/menu/menu';
import { translate } from '../../utils';

function Layout() {
  const store = useStore();
  const [links, setLinks]=useState([]) 
 
  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    title: state.current.title,
    lang: state.lang.lang,
  }));
  useEffect(()=>setLinks([{link:'/', title: translate("links.main",select.lang)}]),[select.lang])
  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    selectLang: useCallback((lang)=>store.actions.lang.setLang(lang),[store])
  };

  return (
    <PageLayout>
      <Head title={select.title} selectLang={callbacks.selectLang} lang={select.lang}/>
      <WrapperBetween>
        <Menu links={links}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </WrapperBetween>
  
      <Outlet />
    </PageLayout>
  );
}
export default memo(Layout);
