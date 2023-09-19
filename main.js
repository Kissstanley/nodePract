
const path = require('node:path');
const fs = require("fs");


const testFolder=path.join(__dirname,'folder');

//FILES

// const testFile1=path.join(__dirname,'folder','text1.txt');
// const testFile2=path.join(__dirname,'folder','text2.txt');
// const testFile3=path.join(__dirname,'folder','text3.txt');
// const testFile4=path.join(__dirname,'folder','text4.txt');



//FOLDERS

// const testFoldersChild1=path.join(__dirname,'folder','folder1')
// const testFoldersChild2=path.join(__dirname,'folder','folder2')
// const testFoldersChild3=path.join(__dirname,'folder','folder3')
// const testFoldersChild4=path.join(__dirname,'folder','folder4')
// const testFoldersChild5=path.join(__dirname,'folder','folder5')



//DIRECTORIES

// fs.mkdir(testFolder,(err)=>{})
// fs.mkdir(testFoldersChild1,(err)=>{})
// fs.mkdir(testFoldersChild2,(err)=>{})
// fs.mkdir(testFoldersChild3,(err)=>{})
// fs.mkdir(testFoldersChild4,(err)=>{})
// fs.mkdir(testFoldersChild5,(err)=>{})


//FILES ACTION

// fs.writeFile(testFile1, 'QQ', (err)=>{
//     if (err) throw new Error(err.message)
// });
// fs.appendFile(testFile1, 'hello again\n', (err)=>{
//     if (err) throw new Error(err.message)
// });
// fs.writeFile(testFile2, 'QQ', (err)=>{
//     if (err) throw new Error(err.message)
// });
// fs.writeFile(testFile3, 'QQ', (err)=>{
//     if (err) throw new Error(err.message)
// });
// fs.writeFile(testFile4, 'QQ', (err)=>{
//     if (err) throw new Error(err.message)
// });


fs.readdir(testFolder, (err, files) => {
    if (err) throw new Error(err.message)

    files.forEach((file) => {
        const filePath = path.join(testFolder, file);

        fs.stat(filePath, (err, stats) => {
            if (err) throw new Error(err.message)

            if (stats.isDirectory()) {
                console.log(`${file} - це папка`);
            } else if (stats.isFile()) {
                console.log(`${file} - це файл`);
            }
        });
    });
});