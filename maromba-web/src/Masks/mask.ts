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
	value = value.replace(/[^0-9,]/g, "");
  
	const parts = value.split(",");
	if (parts.length > 2) {
	  value = `${parts[0]},${parts.slice(1).join("")}`;
	}
  
	if (parts[1]?.length > 3) {
	  value = `${parts[0]},${parts[1].substring(0, 3)}`;
	}
  
	return value;
  };
  
