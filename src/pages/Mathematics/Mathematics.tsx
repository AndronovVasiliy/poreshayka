import {Button, ButtonGroup, Grid, Paper,} from "@mui/material";
import {useFormik} from "formik";
import {
    createMultiplicationTable,
    generateEquations,
    generateExamples,
    initialFormValuesUtil,
    validationSchemaUtil
} from "./utilits.ts";
import {useEffect, useState} from "react";
import {ModalResults} from "./ModalResults.tsx";
import styles from './Matematics.module.css'
import MathFields from "../../components/fields/MathFields/MathFields.tsx";
import {TEquation} from "../../common/commonType.ts";
import {BUTTONS, MULTIPLICATION_TABLE} from './constants.ts';
import SplitButton from "./MultiplicationTableButton.tsx";

const Mathematics = () => {

    /**
     * Состояние моалки
     */
    const [
        open,
        setOpen
    ] = useState(false);

    /**
     * Начальные значения формы
     */
    const [
        initialFormValues,
        setInitialFormValues
    ] = useState<Record<string, string>>({})

    /**
     * Схема валидации
     */
    const [
        validationSchema,
        setValidationSchema
    ] = useState({});

    /**
     * Уравнения
     */
    const [
        equations,
        setEquations
    ] = useState<TEquation[]>([])

    /**
     * Открытие модалки
     */
    const handleOpen = () => {
        setOpen(true);
    };

    /**
     * Закрытие модалки
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Выбор задачи
     */
    const taskSelection = (e: string, value?: string) => {
        let equations: TEquation[];

        switch (e) {
            case 'linearEquation':
                equations = generateEquations();
                break;
            case 'arithmeticExpression':
                equations = generateExamples();
                break;
            // case '2':
            //     equations = createMultiplicationTable(e);
            //     break;
            // case '3':
            //     equations = createMultiplicationTable(3);
            //     break;
            // case '4':
            //     equations = createMultiplicationTable(4);
            //     break;
            // case '5':
            //     equations = createMultiplicationTable(5);
            //     break;
            // case '6':
            //     equations = createMultiplicationTable(6);
            //     break;
            // case '7':
            //     equations = createMultiplicationTable(7);
            //     break;
            // case '8':
            //     equations = createMultiplicationTable(8);
            //     break;
            // case '9':
            //     equations = createMultiplicationTable(9);
            //     break;
            case MULTIPLICATION_TABLE.name:
                equations = createMultiplicationTable(value!);
                break;
            default:
                break;
        }

        setEquations(equations!);
        setInitialFormValues(initialFormValuesUtil(equations!));
        setValidationSchema(validationSchemaUtil(equations!));
    };

    /**
     * Переход к выбору задач (сброс задачи и валидации)
     */
    const reset = () => {
        setEquations([]);
        setInitialFormValues({});
        setValidationSchema([]);
        formik.resetForm()
    }

    useEffect(() => {
        console.log('render')
    }, [])

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: () => {
        },
    });

    return (
        <Grid height={'100%'}>

            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleOpen()
                    formik.handleSubmit(e)
                }}
            >
                <ModalResults
                    equations={equations.length}
                    errorsCount={Object.keys(formik.errors).length}
                    open={open}
                    handleClose={handleClose}
                />

                <Paper
                    elevation={7}
                    className={styles.list_fields}
                >
                    {
                        equations.length === 0 && (
                            <ButtonGroup
                                orientation="vertical"
                                aria-label="vertical contained button group"
                                variant="text"
                            >
                                {
                                    BUTTONS.map(item => (
                                        <Button key={item.name} onClick={() => taskSelection(item.name)} variant="contained"
                                                size="large">
                                            {item.title}
                                        </Button>
                                    ))
                                }
                                <SplitButton taskSelection={taskSelection}/>
                            </ButtonGroup>)

                    }

                    {
                        equations.length > 0 && (
                            <Button onClick={reset} variant="contained" style={{width: '100%', height: '40px'}}>
                                Назад
                            </Button>
                        )
                    }

                    {
                        equations.length > 0 && equations.map((equation, index) => {
                            return (
                                <MathFields
                                    key={index} index={index}
                                    formik={formik}
                                    equation={equation.equation}
                                    id={`equation${index}`}
                                    name={`equation${index}`}
                                    onChange={formik.handleChange}
                                    value={formik.values[`equation${index}`]}
                                    error={formik.touched[`equation${index}`] && Boolean(formik.errors[`equation${index}`])}
                                />
                            )
                        })
                    }
                </Paper>

                <Button color="primary" variant="contained" fullWidth type="submit" style={{marginTop: '10px'}}>
                    Проверить
                </Button>

            </form>

        </Grid>
    );
};

export default Mathematics;
