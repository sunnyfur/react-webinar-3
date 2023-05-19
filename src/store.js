import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.listCart = [];
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
  getLastId() {
    return this.state.lastId || this.state.list.length;
  }
  /**
   * Добавление новой записи в корзину
   */
  addToCart(code) {
    const itemInCart = this.state.listCart.find((item) => item.code === code);
    this.setState({
      ...this.state,
      listCart: [
        ...this.state.listCart.filter((item) => item.code !== code),
        itemInCart
          ? { ...itemInCart, count: itemInCart.count + 1 }
          : { ...this.state.list.find((item) => item.code === code), count: 1 },
      ],
    });
  }

  /**
   * Удаление записи из корзины по коду
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      listCart: this.state.listCart.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }

  getTotalCount() {
    return this.state.listCart.length;
  }
  getTotalPrice() {
    return this.state.listCart.length
      ? this.state.listCart.reduce(
          (sum, item) => sum + item.count * item.price,
          0
        )
      : 0;
  }
}

export default Store;
