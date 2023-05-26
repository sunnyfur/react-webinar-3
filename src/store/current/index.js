import StoreModule from "../module";

class Current extends StoreModule {
  initState() {
    return {
      title: "",
    };
  }
  setTitle(title) {
    this.setState({ title });
  }
}
export default Current;
