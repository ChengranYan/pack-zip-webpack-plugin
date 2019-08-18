import shell from 'shelljs';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var OfflinePackage =
/*#__PURE__*/
function () {
  function OfflinePackage(options) {
    _classCallCheck(this, OfflinePackage);

    this.options = options;
  }

  _createClass(OfflinePackage, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      var self = this;
      this.options.outputPath = compiler.options.output.path;
      compiler.hooks.emit.tapPromise('add file config.json', function (compilation) {
        return new Promise(function (resolve) {
          var config = {
            version: self.options.version
          };
          compilation.assets["config.json"] = {
            source: function source() {
              return JSON.stringify(config);
            },
            size: function size() {
              return 1;
            }
          };
          resolve();
        });
      });
      compiler.hooks.done.tapPromise('zip all file', function () {
        return new Promise(function (resolve) {
          var zipName = Date.now();
          shell.cd(_this.options.outputPath);
          debugger;
          shell.exec("zip -r ".concat(zipName, " .zip *"));
          resolve();
        });
      });
    }
  }]);

  return OfflinePackage;
}();

export default OfflinePackage;
