const books = [
    {'id' : 1, 
    'Book name': 'Flash: The Making of Weegee the Famous', 
    'Author': 'Christopher Bonanos', 
    'ImageURL': 'https://images-na.ssl-images-amazon.com/images/I/51YSa++zrcL._SX327_BO1,204,203,200_.jpg',
    'Plot':  `Arthur Fellig’s ability to arrive at a crime scene just as the cops did was so uncanny 
    that he renamed himself “Weegee,” claiming that he functioned as a human Ouija board. 
    Weegee documented better than any other photographer the crime, grit, and complex humanity 
    of midcentury New York City.`},

    {'id' : 2, 
    'Book name': 'Belonging: A German Reckons with History and Home', 
    'Author': 'Nora Krug', 
    'ImageURL': 'https://images-na.ssl-images-amazon.com/images/I/51PHWzGBrAL._SX360_BO1,204,203,200_.jpg', 
    'Plot':  `Nora Krug was born decades after the fall of the Nazi regime, but the Second World War 
    cast a long shadow over her childhood and youth in the city of Karlsruhe, Germany. 
    Yet she knew little about her own family’s 
    involvement; though all four grandparents lived through the war, they never spoke of it.
    `},

    {'id' : 3, 
    'Book name': 'Directorate S: The C.I.A. and America\'s Secret Wars in Afghanistan and Pakistan', 
    'Author': 'Steve Coll', 
    'ImageURL': 'https://images-na.ssl-images-amazon.com/images/I/41BcqkoALqL._SX324_BO1,204,203,200_.jpg', 
    'Plot':  `Prior to 9/11, the United States had been carrying out small-scale covert operations in Afghanistan, 
    ostensibly in cooperation, although often in direct opposition, with I.S.I., the Pakistani intelligence agency. 
    While the US was trying to quell extremists, a highly secretive and compartmentalized wing of I.S.I., 
    known as "Directorate S," was covertly training, arming, and seeking to legitimize the Taliban,`}
];

for (let i = 0; i < books.length; i += 1) {
    localStorage.setItem(books[i]['id'], JSON.stringify(books[i]));
}
