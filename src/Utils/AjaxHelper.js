GUI.AjaxHelper = function(obj) {
	var xhr = new XMLHttpRequest();
  var length = 0;

  var url = obj.url || null;
  var callbackProgress = obj.onProgress || null;
  var callbackSuccess = obj.onSuccess || null;  

  if(url === null) return false;

  xhr.onreadystatechange = function(){
		if ( xhr.readyState === xhr.DONE ) {
			if ( xhr.status === 200 || xhr.status === 0 ) {
				if ( xhr.responseText ) {
					var json = JSON.parse( xhr.responseText );
					if(callbackSuccess) {
					  callbackSuccess(json);
					}
				} else {
					console.warn( "CanvasGUI: [" + url + "] seems to be unreachable or file there is empty" );
				}
			} else {
				console.error( "CanvasGUI: Couldn't load [" + url + "] [" + xhr.status + "]" );
			}
		} else if ( xhr.readyState === xhr.LOADING ) {
			if ( callbackProgress ) {
				if ( length === 0 ) {
					length = xhr.getResponseHeader( "Content-Length" );
				}
				callbackProgress( { total: length, loaded: xhr.responseText.length } );
			}
		} else if ( xhr.readyState === xhr.HEADERS_RECEIVED ) {
			length = xhr.getResponseHeader( "Content-Length" );
		}
	};
  
  xhr.open("GET", url, true);
	if ( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	xhr.setRequestHeader( "Content-Type", "text/plain" );
	xhr.send( null );
	
	return true;
};