function About({ pokemon }) {
	const types = pokemon.types.map(({ type }) => type.name).join(', ');
  
	const abilities = pokemon.abilities.map(({ ability }) => {
	  return ability.name.replace('-', ' ');
	}).join(', ');
  
	const height = pokemon.height * 10; // cm
	const weight = pokemon.weight / 10; // kg
  
	return (
	  <div className="tab tab-about">
		<table>
		  <tbody>
			<tr>
			  <td>Espécie</td>
			  <td>{types}</td>
			</tr>
  
			<tr>
			  <td>Altura</td>
			  <td>{height}cm</td>
			</tr>
  
			<tr>
			  <td>Peso</td>
			  <td>{weight}kg</td>
			</tr>
  
			<tr>
			  <td>Habilidades</td>
			  <td>{abilities}</td>
			</tr>
		  </tbody>
		</table>
	  </div>
	);
  }
  
  export default About;
  