import Helmet from '../components/Layout/Helmet'
import WindowVisualizer from '../components/WindowVisualizer';
import { useDataContext } from '../components/Layout/DataGetter/DataContext';
import DialogButton from '../components/DialogButton';
import { Stack } from '@mui/material';

function Window() {
    const {windowPercentage} = useDataContext();

    return (
        <Helmet title="Window Control Panel">
            <Stack spacing={4} direction="column" alignItems="center">
                <WindowVisualizer percentage={windowPercentage} />
                <DialogButton />
            </Stack>
        </Helmet>
    )
}

export default Window