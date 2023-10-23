//* Imports

async function main () {
    await Promise.all([
        //* Main
    ]);
}

main();

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);