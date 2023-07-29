import Mocha from "mocha";
import fs from "fs";
import path from "path";

const TESTS_DIR = "./src/tests/";
type GetPathsFunction = (dir: string, fileList?: string[]) => string[];

const mocha = new Mocha({
    reporter: "mochawesome",
    timeout: 10000,
    grep: /^(?!.*ignore)/
});

const getTestPaths: GetPathsFunction = (dir: string, fileList = []): string[] => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = getTestPaths(path.join(dir, file), fileList);
        } else {
            fileList.push(path.join(dir, file));
        }
    }
    return fileList.filter((file) => path.extname(file) === ".ts");
};

getTestPaths(TESTS_DIR).forEach((file) => {
    mocha.addFile(file);
});

mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
});
