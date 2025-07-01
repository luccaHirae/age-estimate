import type { Load } from '@sveltejs/kit';

export interface AgifyResponse {
	count: number;
	name: string;
	age: number | null;
}

export const load: Load = async ({ url, fetch }) => {
	const name = url.searchParams.get('name');

	if (!name || name.trim() === '') {
		return {
			name: '',
			ageData: null
		};
	}

	try {
		const response = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);

		if (!response.ok) {
			throw new Error('Erro carregando os dados de idade');
		}

		const ageData: AgifyResponse = await response.json();

		return {
			name,
			ageData
		};
	} catch (error) {
		console.error('Erro ao buscar dados de idade:', error);
		return {
			name,
			ageData: null,
			error: 'Erro ao buscar dados de idade. Por favor, tente novamente.'
		};
	}
};
