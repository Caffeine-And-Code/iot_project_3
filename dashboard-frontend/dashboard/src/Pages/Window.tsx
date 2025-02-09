import Helmet from '../components/Layout/Helmet'
import Grid from "@mui/material/Grid2";
import useIsMobile from '../hooks/isMobile';
import { Divider } from '@mui/material';
import WindowVisualizer from '../components/WindowVisualizer';
import { useDataContext } from '../components/Layout/DataGetter/DataContext';

function Window() {
    const isMobile = useIsMobile();
    const {windowPercentage} = useDataContext();

  return (
    <Helmet title="Window Control Panel">
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
            <Grid size={{ xs: 12, sm: 5 }} sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <WindowVisualizer percentage={windowPercentage} />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }} sx={{ height: isMobile?"fit-content":"100%",width:"100%", display: isMobile?"block":"flex", alignItems: "center", justifyContent: "center" }}>
                <Divider orientation={isMobile ? "horizontal" : "vertical"} />
            </Grid>
            <Grid size={{ xs: 12, sm: 5 }} sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                2
            </Grid>
        </Grid>
    </Helmet>
  )
}

export default Window