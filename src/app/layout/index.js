import { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import WrapperBetween from '../../components/wrapper-between';
import Menu from '../../components/menu/menu';
import { translate } from '../../utils';

function Layout(props) {
  const store = useStore();
  const [links, setLinks]=useState([]) 
 
  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang,
  }));
  useEffect(()=>setLinks([{link:'/', title: translate("links.main")}]),[select.lang])
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
      <Head title={props.title} selectLang={callbacks.selectLang} lang={select.lang}/>
      <WrapperBetween>
        <Menu links={links}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </WrapperBetween>
      {props.children}
    </PageLayout>
  );
}
Layout.propTypes = {
  title:PropTypes.string,
};

Layout.defaultProps = {
  title:"",
}


export default memo(Layout);
