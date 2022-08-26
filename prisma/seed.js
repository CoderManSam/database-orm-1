const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    phone: '12345678',
                    email: 'alice@wonderland.com'
                }
            }
        },
        include: {
            contact: true
        }
    });

    console.log('Customer created', createdCustomer);

    // Add your code here
    // const createdContact = await prisma.contact.create({
    //     data: {
    //         phone: '12345678',
    //         email: 'alice@wonderland.com',
    //         customerId: createdCustomer.id
    //     }
    // });

    // console.log('contact created', createdContact);

    const createdMovie = await prisma.movie.create({
        data: {
            title: 'Alice in Wonderland',
            runtimeMins: 82
        }
    });

    console.log('movie created', createdMovie);

    const createdScreen = await prisma.screen.create({
        data: {
            number: 1
        }
    });

    console.log('screen created', createdScreen);

    const createdScreening = await prisma.screening.create({
        data: {
            startsAt: '2022-08-26T18:30:00+02:00',
            movieId: createdMovie.id,
            screenId: createdScreen.id
        }
    });

    console.log('screening created', createdScreening);

    const createdTicket = await prisma.ticket.create({
        data: {
            customerId: createdCustomer.id,
            screeningId: createdScreening.id
        }
    });

    console.log('ticket created', createdTicket);


    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
