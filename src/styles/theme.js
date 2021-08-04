import { createTheme } from "@material-ui/core"



const theme = createTheme({
    palette: {
        primary: {
            main: '#fe7f2d'
        },

        secondary: {
            main: '#000000',
            contrastText: "#ffffff"
        }
    }
}
)

export default theme;