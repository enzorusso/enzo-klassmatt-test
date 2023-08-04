import React, { ReactNode } from 'react';

import '../styles/InputComponent.css';
import DatePicker from 'react-datepicker';

type InputProps = {
	placeholder: string;
	type?: 'text' | 'datepicker';
	label: string;
	name: string;
	value: any;
	readonly?: boolean;
	onChange: (value: any) => void;
	errorMessage?: ReactNode;
};

const DatepickerComponent = ({
	name,
	label,
	placeholder,
	errorMessage,
	value,
	onChange,
}: InputProps) => {
	return (
		<div className="wrapper">
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<DatePicker
        isClearable
        withPortal={false}
				popperModifiers={[
					{
						name: 'preventOverflow',
						enabled: false,
						options: {
							altAxis: true,
							altBoundary: true,
							tether: true,
							rootBoundary: 'document',
							padding: 8,
						},
					},
				]}
				className="input"
				popperPlacement="bottom"
				calendarClassName="datepicker"
				startDate={new Date()}
				selected={value ? new Date(value) : null}
				onChange={(date) => onChange(date)}
				dateFormat={'dd/MM/yyyy'}
				placeholderText={placeholder}
			/>
			{errorMessage && <span className="error-message">{errorMessage}</span>}
		</div>
	);
};

function InputComponent({ type, ...props }: InputProps) {
	if (type === 'datepicker') return <DatepickerComponent {...props} />;

	const { placeholder, label, name, value, onChange, errorMessage } = props;

	return (
		<div className="wrapper">
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<input
				type={type}
				className="input"
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{errorMessage && <span className="error-message">{errorMessage}</span>}
		</div>
	);
}

export default InputComponent;
