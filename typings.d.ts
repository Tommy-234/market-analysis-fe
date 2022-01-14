// Workaround for https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23592
// For: FieldArray in redux-form
declare module 'redux-form' {
    export {
        FieldType,
        ErrorOther,
        FormErrors,
        WarningOther,
        FormWarnings,
        RegisteredFieldState
    } from '@types/redux-form';

    export * from '@types/redux-form/lib/reduxForm';
    export * from '@types/redux-form/lib/Field';
    export * from '@types/redux-form/lib/Fields';
    export * from '@types/redux-form/lib/Form';
    export * from '@types/redux-form/lib/FormName';
    export * from '@types/redux-form/lib/FormSection';
    export * from '@types/redux-form/lib/formValues';
    export * from '@types/redux-form/lib/formValueSelector';
    export * from '@types/redux-form/lib/reducer';
    export * from '@types/redux-form/lib/SubmissionError';
    export * from '@types/redux-form/lib/actions';
    export * from '@types/redux-form/lib/actionTypes';
    export * from '@types/redux-form/lib/selectors';

    import { Component } from 'react';
    import {
        BaseFieldArrayProps,
        FieldArrayMetaProps,
        FieldArrayFieldsProps
    } from '@types/redux-form';

    export interface WrappedFieldArrayProps<FieldValue> {
        fields: FieldArrayFieldsProps<FieldValue>;
        meta: FieldArrayMetaProps;
    }

    export interface GenericFieldArray<Field, P = {}> extends Component<BaseFieldArrayProps<P>> {
        name: string;
        valid: boolean;
        getRenderedComponent(): Component<WrappedFieldArrayProps<Field> & P>;
    }

    export class FieldArray<P = {}> extends Component<BaseFieldArrayProps<P>> implements GenericFieldArray<any, P> {
        name: string;
        valid: boolean;
        getRenderedComponent(): Component<WrappedFieldArrayProps<any> & P>;
    }
}