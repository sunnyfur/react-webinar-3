import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ArticleAbout from "../../components/article-about";

function Article() {
  const params = useParams();
  const store = useStore();
  const select = useSelector((state) => ({
    article: state.catalog.article,
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store] ),
  };

  useEffect(() => store.actions.current.setTitle(select.article.title), [select.article.title]);
  useEffect(() => {store.actions.catalog.loadArticle(params.id);}, [params.id]);

  return (
    <ArticleAbout article={select.article} onAdd={callbacks.addToBasket} />
  );
}

export default memo(Article);
