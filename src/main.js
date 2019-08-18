import shell from 'shelljs'

export default class OfflinePackage{
  constructor(options){
    this.options = options
  }
  apply(compiler){
    const self = this
    this.options.outputPath = compiler.options.output.path
    compiler.hooks.emit.tapPromise('add file config.json', (compilation) => {
      return new Promise(function (resolve) {
        const config = {
          version: self.options.version
        }
        compilation.assets["config.json"] = {
          source() {
            return JSON.stringify(config);
          },
          size() {
            return 1
          }
        }
        resolve()
      })
    })
    compiler.hooks.done.tapPromise('zip all file', () => {
      return new Promise((resolve) => {
        const zipName = Date.now()
        shell.cd(this.options.outputPath);
        shell.exec(`zip -r ${zipName} .zip *`)
        resolve()
      })
    })
  }
}
