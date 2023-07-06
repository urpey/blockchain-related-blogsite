import { ThunkDispatch } from "redux-thunk";
import { RootAction } from "./action";
import { RootState } from "./state";

export type RootDispatch = ThunkDispatch<RootState, {}, RootAction>;
