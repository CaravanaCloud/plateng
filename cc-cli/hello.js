module.exports = function hello(program) {
    program.command('hello')
        .description('Salute!')
        .action(() => {
            console.log("Hello from my CLI! "+new Date());
        });
}