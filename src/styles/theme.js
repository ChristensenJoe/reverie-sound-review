import { createTheme } from "@material-ui/core"
import { deepOrange, deepPurple } from "@material-ui/core/colors";


const theme = createTheme({
    palette: {
        primary: deepOrange,
    
        secondary: {
            main: '#000000',

        }
    },
    typography: {
        fontFamily: "'STIX Two Text', 'serif'"
    }
}
)

export default theme;