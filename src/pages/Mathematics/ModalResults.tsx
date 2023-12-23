import {Box, Button, Modal, Typography} from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {memo} from "react";

        const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ModalResults = memo((props: any) => {
    console.log(props.errorsCount)
    console.log('Ошибок меньше 16', props.errorsCount > 16)
    return (
    <>
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                {
                    20 - props.errorsCount >= 16 ?
                        (
                            <>
                                <SentimentSatisfiedAltIcon/>
                                <Typography align={'center'} color={"green"} id="modal-modal-title" variant="h6"
                                            component="h2">
                                    У тебя {20 - props.errorsCount} правильных ответов
                                </Typography>
                            </>
                        ) :
                        (
                            <>
                                <SentimentVeryDissatisfiedIcon color={'error'}/>
                                <Typography fontSize={'large'} align={'center'} color={"red"} id="modal-modal-title" variant="h6"
                                            component="h2">
                                    У тебя {20 - props.errorsCount} правильных ответа, это мало
                                </Typography>
                            </>
                        )
                }
                <Button onClick={props.handleClose}>Close Child Modal</Button>
            </Box>
        </Modal>
    </>
)});
