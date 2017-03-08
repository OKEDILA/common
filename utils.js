
function isInt(n) 
{
    return n != "" && !isNaN(n) && Math.round(n) == n;
}

function isFloat(n){
    return n != "" && !isNaN(n) && Math.round(n) != n;
}

function deUmlaut(value){

  value = value.replace(/ä/g, 'ae');
  value = value.replace(/ö/g, 'oe');
  value = value.replace(/ü/g, 'ue');
  value = value.replace(/ß/g, 'ss');
  value = value.replace(/ /g, '-');
  value = value.replace(/\./g, '');
  value = value.replace(/,/g, '');
  value = value.replace(/\(/g, '');
  value = value.replace(/\)/g, '');
  return value;
}

function umlaut(str) {
	 return str
	  .replace(/Â|À|Å|Ã/g, "A")
	  .replace(/â|à|å|ã/g, "a")
	  .replace(/Ä/g, "AE")
	  .replace(/ä/g, "ae")
	  .replace(/Ç/g, "C")
	  .replace(/ç/g, "c")
	  .replace(/É|Ê|È|Ë/g, "E")
	  .replace(/é|ê|è|ë/g, "e")
	  .replace(/Ó|Ô|Ò|Õ|Ø/g, "O")
	  .replace(/ó|ô|ò|õ/g, "o")
	  .replace(/Ö/g, "OE")
	  .replace(/ö/g, "oe")
	  .replace(/Š/g, "S")
	  .replace(/š/g, "s")
	  .replace(/ß/g, "ss")
	  .replace(/Ú|Û|Ù/g, "U")
	  .replace(/ú|û|ù/g, "u")
	  .replace(/Ü/g, "UE")
	  .replace(/ü/g, "ue")
	  .replace(/Ý|Ÿ/g, "Y")
	  .replace(/ý|ÿ/g, "y")
	  .replace(/Ž/g, "Z")
	  .replace(/ž/, "z"); 
	}

function myescape(str)
{
	return str
	.replace("°", "&deg;")
	.replace("Â³", "&sup3;");
}

function getFrameForDocument(document) {
    var w= document.defaultView || document.parentWindow;
    var frames= w.parent.document.getElementsByTagName('iframe');
    for (var i= frames.length; i-->0;) {
        var frame= frames[i];
        try {
            var d= frame.contentDocument || frame.contentWindow.document;
            if (d===document)
                return frame;
        } catch(e) {}
    }
}

Number.prototype.formatmoney = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};



