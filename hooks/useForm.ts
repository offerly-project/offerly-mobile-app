import { createCustomError } from '@/entities/error.entity';
import { useEffect, useState } from 'react';
import { ZodError, ZodSchema } from 'zod';

type UseFormParams<T> = {
	initialValues: T;
	schema: ZodSchema<T>;
	onSubmit: (values: T) => Promise<void>;
};

export const useForm = <T extends Record<string, any>>({
	initialValues,
	schema,
	onSubmit,
}: UseFormParams<T>) => {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState('');
	const [hasSubmitted, setHasSubmitted] = useState(false);

	const validateValues = () => {
		try {
			schema.parse(values);
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof ZodError) {
				const fieldErrors = error.errors.reduce(
					(acc, err) => {
						const key = err.path[0] as string;
						acc[key] = err.message;
						return acc;
					},
					{} as Record<string, string>,
				);
				setErrors(fieldErrors as Partial<Record<keyof T, string>>);
			}
			return false;
		}
	};

	useEffect(() => {
		if (hasSubmitted) validateValues();
	}, [values, hasSubmitted]);

	const onSubmitHandler = async () => {
		setHasSubmitted(true);
		const valid = validateValues();

		if (valid) {
			setLoading(true);
			try {
				const validData = schema.parse(values);
				await onSubmit(validData);
				setServerError('');
			} catch (error) {
				setServerError(createCustomError(error).message);
			} finally {
				setLoading(false);
			}
		}
	};

	const submittable = !loading && Object.keys(errors).length === 0;

	return {
		values,
		handleSubmit: onSubmitHandler,
		errors,
		setValues,
		loading,
		submittable,
		serverError,
	};
};
