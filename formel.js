/**
 * @author dimitri.langlitz
 */

// s²(A) = [(6 - 7)² + (7 - 7)² + (7,5 - 7)² + (6,5 - 7)² + (7,5 - 7)² + (8 - 7)² + (6,5 - 7)²] / 7 = 0,43

var stabw = function(array) {
	var len = 0;
	
	var sum = array.reduce(function(pv, cv) { ++len; return pv + cv; }, 0);
	
	var mean = sum / len;
	
	var result = 0;
	
	for (var i = 0; i < len; i++)
	{
		result += Math.pow(array[i] - mean, 2);		
	}

	len = (len == 1) ? len : len - 1;		
		
	return Math.sqrt(result / len);	
};