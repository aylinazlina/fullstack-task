import {createTheme} from "@mui/material/styles";

export const getTheme= (mode:"light" | "dark")=>{
   return createTheme({
        palette:{
            mode,
        },
    });

}