export const useConcatClsx = (props, style) => {
	//=====< Create array for style >=====
	let styleProps = [];

	//=====< Add style >=====
	for (let i in props) {
		styleProps.push(i);
	}

	//=====< Convert style to className >=====
	const convert = styleProps.map(item => ({ [style[item]]: true }));

	return convert;
};
