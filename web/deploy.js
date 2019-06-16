const fs = require('fs');
let deleteFolderRecursive = function(fileUrl) {
  let files;
  try {
    files = fs.readdirSync(fileUrl);//读取该文件夹
  } catch (e) {
    console.log('目录异常 ...\x1B[31m [x]\x1B[39m\n');
    console.log(e);
    return;
  }
  files.forEach(function(file) {
    let stats = fs.statSync(fileUrl + '/' + file);
    if (stats.isDirectory()) {
      deleteFolderRecursive(fileUrl + '/' + file);
    } else {

      try {
        process.stdout.write('删除文件: ' + fileUrl + '/' + file);
        fs.unlinkSync(fileUrl + '/' + file);
        process.stdout.write(' ...\x1B[32m [v]\x1B[39m\n');
      } catch (e) {
        process.stdout.write(' ...\x1B[31m [x]\x1B[39m\n');
        console.log(e);
      }
    }
  });
  try {
    process.stdout.write('删除目录: ' + fileUrl);
    fs.rmdirSync(fileUrl);
    process.stdout.write(' ...\x1B[32m [v]\x1B[39m\n');
  } catch (e) {
    process.stdout.write(' ...\x1B[31m [x]\x1B[39m\n');
    console.log(e);
  }
};

let copyFolder = function(srcDir, dstDir) {
  let files;
  try {
    files = fs.readdirSync(srcDir);//读取该文件夹
  } catch (e) {
    console.log('目录异常 ...\x1B[31m [x]\x1B[39m\n');
    console.log(e);
    return;
  }

  try {
    process.stdout.write('创建目录: ' + dstDir);
    fs.mkdirSync(dstDir + '/');
    process.stdout.write(' ...\x1B[32m [v]\x1B[39m\n');
  } catch (e) {
    process.stdout.write(' ...\x1B[31m [x]\x1B[39m\n');
    console.log(e);
  }
  files.forEach(function(file) {
    let stats = fs.statSync(srcDir + '/' + file);
    if (stats.isDirectory()) {
      copyFolder(srcDir + '/' + file, dstDir + '/' + file);
    } else {
      try {
        process.stdout.write('复制文件: ' + srcDir + '/' + file + ' ==> ' + dstDir + '/' + file);
        fs.copyFileSync(srcDir + '/' + file, dstDir + '/' + file);
        process.stdout.write(' ...\x1B[32m [v]\x1B[39m\n');
      } catch (e) {
        process.stdout.write(' ...\x1B[31m [x]\x1B[39m\n');
        console.log(e);
      }
    }
  });
};

deleteFolderRecursive('../static');
copyFolder('dist', '../static');
