import { memo, useCallback, useEffect, useState } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import { Outlet } from "react-router-dom";

function Layout() {
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    title: state.current.title,
    lang: state.lang.lang,
  }));
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
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <Outlet />
    </PageLayout>
  );
}
export default memo(Layout);
