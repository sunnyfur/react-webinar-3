import StoreModule from "../module";

class Language extends StoreModule {
  initState() {
    return {
      lang: "ru",
    };
  }
  setLang(lang) {
    this.setState({ lang });
  }
}
export default Language;
