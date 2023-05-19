import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const listCart = store.getState().listCart;
  const totalCount = store.getTotalCount();
  const totalPrice = store.getTotalPrice();
  const [isModalShow, setIsModalShow] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
        store.addToCart(code);
      },
      [store]
    ),
    onDeleteFromCart: useCallback((code) => {
        store.deleteFromCart(code);
      },
      [store]
    ),

    onSwitchModal: useCallback(() => {
      setIsModalShow((prevShow) => !prevShow);
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onCartOpen={callbacks.onSwitchModal}
        totalCount={totalCount}
        totalPrice={totalPrice}
      />
      <List
        list={list}
        onActionItem={callbacks.onAddToCart}
        actionTitle="Добавить"
      />
      <Modal
        isShow={isModalShow}
        onClose={callbacks.onSwitchModal}
        title="Корзина"
      >
        <Cart
          list={listCart}
          onAction={callbacks.onDeleteFromCart}
          actionTitle="Удалить"
          totalPrice={totalPrice}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
