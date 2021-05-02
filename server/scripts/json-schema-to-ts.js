const path = require('path');
const fs = require('fs');
const compileFromFile = require('json-schema-to-typescript').compileFromFile;
const { default: fastify } = require('fastify');

// directory path
const schemasDir = path.join(process.cwd(), 'server/schemas/');
const typesDir = path.join(process.cwd(), 'server/types/schemas/');

try {
  fs.readdir(schemasDir, (_error, files) => {
    files &&
      files.length &&
      files.forEach(async (filename) => {
        const filenameNoExt = filename.split('.')[0];
        const filePath = `${schemasDir}${filenameNoExt}`;
        const defsFilePath = `${typesDir}${filenameNoExt}.d.ts`;

        try {
          fs.stat(defsFilePath, (error, stats) => {
            fs.unlink(defsFilePath, async () => {
              console.log(`Deleted ${defsFilePath}`);

              const compiledJson = await compileFromFile(`${filePath}.json`, {
                style: { printWidth: 80, semi: true, singleQuote: true },
                unreachableDefinitions: true,
              });

              fs.writeFile(`${defsFilePath}`, compiledJson, () => {
                return;
              });
            });
          });
        } catch (error) {
          console.log(error);
        }
      });
  });
} catch (error) {
  console.log(error);
}
