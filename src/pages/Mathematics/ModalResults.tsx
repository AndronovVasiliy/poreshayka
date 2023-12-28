import {Box, Button, Modal, Typography} from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
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
    const correctAnswers = props.equations - props.errorsCount;
    let color, icon, message;

    if (correctAnswers >= props.equations * 0.9) {
        icon = <SentimentSatisfiedAltIcon color={'success'}/>;
        message = `Молодец!!! У тебя ${correctAnswers} правильных ответов`;
        color = '#4caf50'
    } else if (correctAnswers > props.equations / 2) {
        icon = <SentimentNeutralIcon fontSize={'large'} color={'warning'}/>;
        message = `Молодец!!! У тебя ${correctAnswers} правильных ответов, но можно лучше`;
        color = '#ff9800'
    } else {
        icon = <SentimentVeryDissatisfiedIcon color={'error'}/>;
        message = `У тебя ${correctAnswers} правильных ответов, нужно стараться`;
        color = '#ef5350'
    }

    return (
        <>
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {icon}
                    <Typography align={'center'} color={color} id="modal-modal-title" variant="h6" component="h2">
                        {message}
                    </Typography>
                    <Button onClick={props.handleClose}>Закрыть</Button>
                </Box>
            </Modal>
        </>
    )
});
