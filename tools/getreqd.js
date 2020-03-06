const path = require("path");

/**
 * Converts normal NodeJS require paths into the path expected by Screeps when flattening directories into the file name.
 * 
 * A require statement of a file src/logic/myfile.js will now look like require("./src_logic_myfile"). 
 * This is also probably undesirable if you have a project structure like this:
 * src/main.js
 * test/main.spec.js
 * To overcome this, provide your relative path prefix, and it will be removed from the generated path:
 * convertRequirePathToScreepsPath('./logic/myfile', 'src') == "./logic_myfile"
 */
const convertRequirePathToScreepsPath = (requirePath, additionalRelativePathPrefix) => {
    const projectAbsolutePath = process.cwd();
    const removeSubPath = additionalRelativePathPrefix ? `${projectAbsolutePath}/${additionalRelativePathPrefix}` : projectAbsolutePath;
    const absolutePath = path.resolve(requirePath);
    const contextPath = absolutePath.replace(removeSubPath, '');
    const screepsPath = `./${contextPath.replace('/\//gi', '_')}`
    return screepsPath;
}

module.exports = {
    convertRequirePathToScreepsPath
}