import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from '../Store';

const useRootStateSelector : TypedUseSelectorHook<RootState> = useSelector;

export default useRootStateSelector;