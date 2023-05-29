import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ArticleAbout from "../../components/article-about";
import Layout from '../layout';


function Article() {
  const params = useParams();
  const store = useStore();
  const select = useSelector((state) => ({
    article: state.catalog.article,
    lang: state.lang.lang,
  }));
 

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store] ),
    selectLang: useCallback((lang)=>store.actions.lang.setLang(lang),[store])
  };

  useEffect(() => {store.actions.catalog.loadArticle(params.id);}, [params.id]);

  return (
    <Layout title={select.article.title||""}>
       <ArticleAbout article={select.article} onAdd={callbacks.addToBasket} />
    </Layout>
    
  );
}

export default memo(Article);
