import { AppContext } from "@/context";
import { useContext } from "react";


const useGlobalContext = () => useContext(AppContext);
export default useGlobalContext;