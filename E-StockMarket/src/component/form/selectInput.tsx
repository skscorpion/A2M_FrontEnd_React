import React from 'react';
import { FieldRenderProps } from 'react-final-form';

type Props = FieldRenderProps<string, any>;

const SelectInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
	<div>
		<select className={rest.className} {...input} {...rest} />
	</div>
);

export default SelectInput;
