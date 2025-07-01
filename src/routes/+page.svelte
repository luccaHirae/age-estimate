<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { AgifyResponse } from './+page.js';

	interface PageData {
		name: string;
		ageData: AgifyResponse | null;
		error?: string;
	}

	let { data }: { data: PageData } = $props();

	let inputValue = $state(data.name || '');
	let debounceTimer: number;

	function debounceNavigation(name: string) {
		clearTimeout(debounceTimer);
		
		debounceTimer = setTimeout(() => {
			if (browser) {
				const url = new URL(window.location.href);
				if (name.trim()) {
					url.searchParams.set('name', name.trim());
				} else {
					url.searchParams.delete('name');
				}
				goto(url.pathname + url.search, { state: true });
			}
		}, 500); // 500ms debounce
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;
		debounceNavigation(inputValue);
	}
</script>

<svelte:head>
	<title>Adivinha Idade</title>
	<meta name="description" content="Estimativa de idade baseada no nome usando a API agify.io" />
</svelte:head>

<main class="container">
	<div class="card">
		<div class="header">
      🔮
      <h1 class="title">Adivinha Idade</h1>
    </div>
		<p class="subtitle">Descubra a idade estimada de qualquer pessoa</p>
		
		<div class="input-section">
			<label for="name-input" class="input-label">Digite um nome:</label>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				id="name-input"
				type="text"
				bind:value={inputValue}
				oninput={handleInput}
				placeholder="Digite um nome..."
				class="name-input"
				autocomplete="off"
				autofocus
			/>
		</div>

		{#if data.error}
			<div class="error-message">
				❌ {data.error}
			</div>
		{:else if data.ageData}
			<div class="result-section">
				<div class="result-card">
					<h2 class="result-name">{data.ageData.name}</h2>
					{#if data.ageData.age !== null}
						<div class="age-display">
							<span class="age-number">{data.ageData.age}</span>
							<span class="age-label">Anos</span>
						</div>
						<div class="metadata">
							<span class="sample-size">Estimativa baseada em {data.ageData.count.toLocaleString()} amostras</span>
						</div>
					{:else}
						<div class="no-data">
              🤷‍♂️ Nenhum dado de idade disponível para este nome
						</div>
					{/if}
				</div>
			</div>
		{:else if inputValue.trim()}
			<div class="loading">
				<div class="spinner"></div>
				<span>Procurando dados para "{inputValue}"...</span>
			</div>
		{:else}
			<div class="welcome-message">
				<div class="welcome-icon">👋</div>
				<p>Digite um nome acima para começar!</p>
				<div class="examples">
					<p class="examples-title">Tente estes exemplos:</p>
          <div class="example-buttons">
						<button class="example-btn" onclick={() => { inputValue = 'Ana'; debounceNavigation('Ana'); }}>Ana</button>
						<button class="example-btn" onclick={() => { inputValue = 'Pedro'; debounceNavigation('Pedro'); }}>Pedro</button>
						<button class="example-btn" onclick={() => { inputValue = 'David'; debounceNavigation('David'); }}>David</button>
						<button class="example-btn" onclick={() => { inputValue = 'Maria'; debounceNavigation('Maria'); }}>Maria</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
		color: #333;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 20px;
		box-sizing: border-box;
	}

	.card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 40px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 500px;
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

  .header {
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 2.5rem;
  }

	.title {
		font-size: 2.5rem;
		margin: 0 0 10px 0;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-weight: 700;
	}

	.subtitle {
		color: #666;
		margin: 0 0 30px 0;
		font-size: 1.1rem;
	}

	.input-section {
		margin-bottom: 30px;
	}

	.input-label {
		display: block;
		margin-bottom: 10px;
		font-weight: 600;
		color: #555;
		font-size: 1rem;
	}

	.name-input {
		width: 100%;
		padding: 15px 20px;
		font-size: 1.1rem;
		border: 2px solid #e1e5e9;
		border-radius: 12px;
		outline: none;
		transition: all 0.3s ease;
		box-sizing: border-box;
		background: white;
	}

	.name-input:focus {
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
		transform: translateY(-1px);
	}

	.result-section {
		animation: slideUp 0.5s ease-out;
	}

	.result-card {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border-radius: 15px;
		padding: 30px 20px;
		margin: 20px 0;
	}

	.result-name {
		font-size: 1.8rem;
		margin: 0 0 20px 0;
		text-transform: capitalize;
		font-weight: 600;
	}

	.age-display {
		margin: 20px 0;
	}

	.age-number {
		font-size: 3rem;
		font-weight: 700;
		display: block;
		line-height: 1;
	}

	.age-label {
		font-size: 1.1rem;
		opacity: 0.9;
		display: block;
		margin-top: 5px;
	}

	.metadata {
		margin-top: 20px;
		opacity: 0.8;
		font-size: 0.9rem;
	}

	.no-data {
		font-size: 1.2rem;
		padding: 20px;
	}

	.error-message {
		background: #ff6b6b;
		color: white;
		padding: 15px 20px;
		border-radius: 10px;
		margin: 20px 0;
		font-weight: 500;
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		padding: 30px;
		color: #667eea;
		font-weight: 500;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #e1e5e9;
		border-top: 4px solid #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.welcome-message {
		padding: 30px 20px;
		color: #666;
	}

	.welcome-icon {
		font-size: 3rem;
		margin-bottom: 15px;
	}

	.examples {
		margin-top: 25px;
	}

	.examples-title {
		color: #555;
		font-weight: 600;
		margin-bottom: 15px;
	}

	.example-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
	}

	.example-btn {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 20px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.example-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.card {
			padding: 30px 20px;
			margin: 10px;
		}

		.title {
			font-size: 2rem;
		}

		.age-number {
			font-size: 2.5rem;
		}

		.example-buttons {
			gap: 8px;
		}

		.example-btn {
			padding: 6px 12px;
			font-size: 0.8rem;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 10px;
		}

		.card {
			padding: 25px 15px;
		}

		.title {
			font-size: 1.8rem;
		}

		.name-input {
			padding: 12px 15px;
			font-size: 1rem;
		}

		.result-card {
			padding: 25px 15px;
		}
	}
</style>
