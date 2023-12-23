import {TEquation} from "../../common/commonType.ts";
import * as yup from "yup";

/**
 * Функция генерации линейных уравнений типа (1 - х = 15)
 */
export function generateEquations(): TEquation[] {
    const equations = [];

    for (let i = 0; i < 20; i++) {
        let a, b, x, operator;

        // Генерируем случайные числа и оператор так, чтобы результат был больше или равен 0
        do {
            a = Math.floor(Math.random() * 20);
            b = Math.floor(Math.random() * 20) + 1;
            operator = Math.random() < 0.5 ? '+' : '-';
            x = operator === '+' ? b - a : a - b;
        } while (x < 0);

        // Составляем уравнение
        const equationString = `${a} ${operator} x = ${b}`;

        // Добавляем объект в массив
        equations.push({ equation: equationString, answer: x });
    }

    return equations;
}

/**
 * Функция генерации сложения и вычитания типа (11 -  = 15)
 */
export function generateExamples() {
    const examples = [];

    for (let i = 0; i < 20; i++) {
        const operand1 = Math.floor(Math.random() * 100); // Случайное число от 0 до 99
        const operand2 = Math.floor(Math.random() * operand1); // Операнд2 меньше или равен операнду1
        const isAddition = Math.random() < 0.5; // 50% вероятность выбора сложения

        let answer;
        let operator;

        if (isAddition) {
            answer = operand1 + operand2;
            operator = '+';
        } else {
            answer = operand1 - operand2;
            operator = '-';
        }

        examples.push({
            equation: `${operand1} ${operator} ${operand2} =    `,
            answer: answer,
        });
    }

    return examples;
}

/**
 * Функция оздания начальных значений формы
 */
export function initialFormValuesUtil (equations: TEquation[]) {
    return equations.reduce((values, _, index) => {
        const fieldName = `equation${index}`;
        return {
            ...values,
            [fieldName]: '', // Установите начальное значение для каждого поля
        };
    }, {});
}

/**
 * Функция создания валидации
 */
export function validationSchemaUtil (equations: TEquation[]) {
    return yup.object().shape(
        equations.reduce((shape, eq, index) => {
            const fieldName = `equation${index}`;
            return {
                ...shape,
                [fieldName]: yup.number()
                    .test(
                        'is-correct',
                        `Incorrect value for x in equation: ${eq.equation}`,
                        (value) => value === eq.answer
                    ),
            };
        }, {})
    );
}
