// Using Cypress as well, write an API test with the following information:
// 	- Use https://pokeapi.co
// 	- Search for Magikarp
// 	- Check its name, order and move names are the correct ones

describe('PokeAPI Test', () => {
  it('Search for Magikarp and validate its information', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/pokemon/magikarp')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('magikarp');
        
        // Validate order (ID) and move names
        expect(response.body.order).to.eq(210);
        const moveNames = response.body.moves.map(x => x.move.name);
        expect(moveNames).to.include.members(['splash', 'tackle', 'flail']);
      });
  });
});
