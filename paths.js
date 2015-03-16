/**
* openlibrary
*
* Description
*/
angular.module('synapse.service.paths', [])


/**
 * [description]
 * @param  {Object} ){               var config [description]
 * @return {[type]}     [description]
 */
.factory('Paths', function(){

  var config  = {
        startTag  : '${',
        endTag    : '}'
      },
      paths   = {};

  return {

    /**
     * [config description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    config:function(params){
      if('object' == typeof params){
        angular.extend(config, params);
      }
    },

    /**
     * [add description]
     * @param {[type]} name          [description]
     * @param {[type]} path          [description]
     * @param {[type]} defaultParams [description]
     */
    add:function(name, path, defaultParams){

      if('object' == typeof name){
        angular.forEach(name, function(path){
          paths[ path.name ] = {
            path    : path.path,
            default : path.default || {}
          }
        });
      }

      paths[name] = {
        path: path
      };

      if( defaultParams ) paths[name].default = defaultParams;

      return this;
    },

    /**
     * [get description]
     * @param  {[type]} path   [description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    get:function(path, params){
      var _path         = paths[path].path,
          _default      = paths[path].default,
          replacements  = {};

      if( !_path )
      	return false;

      if( _default )
      	replacements = _default;

      if( params )
      	angular.extend(replacements, params);

      for(var key in replacements){
        _path = _path.replace( (config.startTag + key + config.endTag), replacements[key]);
      }

      return _path;
    }
  };
});