export const phoneMask = (value: String | undefined) => {
	if (!value) return "";

	return value
		.replace(/[\D]/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{4})(\d+?)/, "$1");
};

export const cnpjMask = (value: String | undefined) => {
	if (!value) return "";

	return value
		.replace(/[\D]/g, "")
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1/$2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");
};

export const cepMask = (value: String | undefined) => {
	if (!value) return "";
	return value
		.replace(/\D/g, "")
		.replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
		.replace(/(-\d{3})(\d+?)/, "$1");
};

export const cpfMask = (value: string) => {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");
};

export const numberMask = (value: string) => {
	return value.replace(/[^0-9,]|(,\d{4,})/g, (match) => {
		if (match.startsWith(",")) {
			// Se o match for uma vírgula seguida de mais de 3 dígitos, retorna apenas os primeiros 3 dígitos
			return match.slice(0, 4);
		}
		// Se o match não for um número ou uma vírgula válida, retorna uma string vazia
		return "";
	});
};
