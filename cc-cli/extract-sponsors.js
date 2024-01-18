module.exports = function hello(program) {
    program.command('extract-sponsors')
        .description('Extract sponsors from github to files.')
        .action(() => {
            console.log("Extract sponsors from github to files. "+new Date());
        });
}