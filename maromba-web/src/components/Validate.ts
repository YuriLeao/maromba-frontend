export const validateCPF = (cpf: string): boolean => {
	cpf = cpf.replace(/[^\d]+/g, "");
	if (cpf.length !== 11) return false;
	let sum;
	let rest;
	sum = 0;
	if (cpf === "00000000000") return false;

	for (let i = 1; i <= 9; i++)
		sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
	rest = (sum * 10) % 11;

	if (rest === 10 || rest === 11) rest = 0;
	if (rest !== parseInt(cpf.substring(9, 10))) return false;

	sum = 0;
	for (let i = 1; i <= 10; i++)
		sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
	rest = (sum * 10) % 11;

	if (rest === 10 || rest === 11) rest = 0;
	return rest === parseInt(cpf.substring(10, 11));
};

export const validateCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    
    if (cnpj.length !== 14)
        return false;

    if (/^(\d)\1{13}$/.test(cnpj))
        return false;

    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    
    if (resultado !== parseInt(digitos.charAt(0)))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    
    return resultado === parseInt(digitos.charAt(1));
};

export const validateDate = (value: string) => {
	if (typeof value !== "string") {
		const date = new Date(value);
		value = `${date.getDate().toString().padStart(2, "0")}/${(
			date.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}/${date.getFullYear()}`;
	}

	const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
	if (!regex.test(value)) {
		return "Data inválida";
	}

	const [day, month, year] = value.split("/").map(Number);
	const date = new Date(year, month - 1, day);

	if (
		date.getFullYear() !== year ||
		date.getMonth() !== month - 1 ||
		date.getDate() !== day
	) {
		return "Data inválida";
	}

	return true;
};
