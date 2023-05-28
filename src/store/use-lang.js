import useSelector from './use-selector';

export default function useLang(){
  const select = useSelector((state) => ({
    lang: state.lang.lang,
  }));
  return select;
}