import { createTheme } from "@material-ui/core"



const theme = createTheme({
    palette: {
        primary: {
            main: '#d84315'
        },

        secondary: {
            main: '#66bb6a',
            contrastText: "#ffffff"
        }
    }
}
)

export default theme;