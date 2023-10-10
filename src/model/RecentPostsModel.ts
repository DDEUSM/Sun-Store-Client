
type Product = {
    title : string;
    describe : string;
    price : number;
    category : string;
    imageUrl : string;
}

type Posts = {
    [name : string] : Product[]
}

export const RecentPosts : Posts = {
    'cars' : [
        {
            title : 'Mini Cooper 2015',
            describe : 'Um dos carros mais famosos da história do automobilismo Britânico. A most famous cars of Britsh automobile industry history.',
            price : 170000,
            category : 'cars',
            imageUrl : './images/products/ChevroletBellAir.jpg'
        },
        {
            title : 'Mini Cooper 2015',
            describe : 'Um dos carros mais famosos da história do automobilismo Britânico. A most famous cars of Britsh automobile industry history.',
            price : 170000,
            category : 'cars',
            imageUrl : './images/products/ChevroletBellAir.jpg'
        },
        {
            title : 'Mini Cooper 2015',
            describe : 'Um dos carros mais famosos da história do automobilismo Britânico. A most famous cars of Britsh automobile industry history.',
            price : 170000,
            category : 'cars',
            imageUrl : './images/products/ChevroletBellAir.jpg'
        },
        {
            title : 'Mini Cooper 2015',
            describe : 'Um dos carros mais famosos da história do automobilismo Britânico. A most famous cars of Britsh automobile industry history.',
            price : 170000,
            category : 'cars',
            imageUrl : './images/products/ChevroletBellAir.jpg'
        },
        {
            title : 'Mini Cooper 2015',
            describe : 'Um dos carros mais famosos da história do automobilismo Britânico. A most famous cars of Britsh automobile industry history.',
            price : 170000,
            category : 'cars',
            imageUrl : './images/products/ChevroletBellAir.jpg'
        }

    ],
    'models' : [
        {
            title : 'Camiseta Preta',
            describe : 'Puro algodão',
            price : 35.50,
            category : 'models',
            imageUrl : './images/products/camiseta1.jpg'
        },
        {
            title : 'Camiseta Preta',
            describe : 'Puro algodão',
            price : 35.50,
            category : 'models',
            imageUrl : './images/products/camiseta1.jpg'
        },
        {
            title : 'Camiseta Preta',
            describe : 'Puro algodão',
            price : 35.50,
            category : 'models',
            imageUrl : './images/products/camiseta1.jpg'
        },
        {
            title : 'Camiseta Preta',
            describe : 'Puro algodão',
            price : 35.50,
            category : 'models',
            imageUrl : './images/products/camiseta1.jpg'
        },
        {
            title : 'Camiseta Preta',
            describe : 'Puro algodão',
            price : 35.50,
            category : 'models',
            imageUrl : './images/products/camiseta1.jpg'
        }
    ]
}
    