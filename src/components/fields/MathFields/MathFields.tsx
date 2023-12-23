import {TextField, Typography} from "@mui/material";
import styles from './MathFields.module.css';
import {memo} from "react";

const MathFields = memo((props: any) => {
    return (
        <div className={styles.field}>
            <label style={{minWidth: "120px", display: "flex", justifyContent: 'start'}}
                   htmlFor={`equation${props.id}`}>
                <Typography margin={0} variant="h5" gutterBottom>
                    {props.equation}
                </Typography>
            </label>
            <TextField
                style={{width: '72px'}}
                size={'small'}
                fullWidth
                type={"number"}
                id={props.id}
                name={props.name}
                label={`Ответ`}
                value={props.value}
                onChange={props.onChange}
                error={props.errors}
            />
        </div>
    );
});
export default MathFields;
