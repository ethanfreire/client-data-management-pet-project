import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');



await pb.admins.authWithPassword('element55star@gmail.com', '@Reactelement5*');

// create base collection
const base = await pb.collections.create({
    name: 'exampleTable',
    type: 'base',
    schema: [
        {
            name: 'title',
            type: 'text',
            required: true,
            options: {
                min: 10,
            },
        },
        {
            name: 'status',
            type: 'bool',
        },
    ],
});

const record = await pb.collection('exampleTable').create({
    title: 'Lorem ipsum',
});
