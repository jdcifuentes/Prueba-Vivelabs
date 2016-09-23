var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
     
	   	$scope.firstString = "";
	    $scope.secondString = "";

	    var Small = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8 , nine: 9 , ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90};

		var Magnitude = {
	      	thousand:    1000,
	      	million:     1000000,
	      	billion:     1000000000,
	      	trillion:    1000000000000,
	      	quadrillion: 1000000000000000,
	      	quintillion: 1000000000000000000,
	      	sextillion:  1000000000000000000000,
	      	septillion:  1000000000000000000000000,
	      	octillion:   1000000000000000000000000000,
	      	nonillion:   1000000000000000000000000000000,
	      	decillion:   1000000000000000000000000000000000,
	    };

	    var units = ["", "one ", "two", "three ", "four ",  "five ", "six", "seven ", "eight ", "nine "];
		var teens = ["", "eleven ", "twelve ", "thirteen ",  "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen "];
		var tens = ["", "ten ", "twenty ", "thirty ", "forty ", "fifty ", "sixty ", "seventy ", "eighty ", "ninety "];
		var thousands = ["","thousand ", "million ",  "billion ", "trillion ", "quadrillion ", "quintillion ", "sextillion ", "septillion ", "octillion ", "nonillion ", "decillion ", "undecillion ", "duodecillion ", "tredecillion ", "quattuordecillion ", "sexdecillion ", "septendecillion ", "octodecillion ", "novemdecillion ", "vigintillion "];

	    function string2num (Sstring){
	    	var values = Sstring.split(' ');
	    	var Vlength = values.length;
	    	
	    	var n = 0;
	    	var g = 0;

	    	for (i = 0; i < Vlength; i++) {
	    		if ( Small.hasOwnProperty(values[i]) ) 
	    		{ g += Small[values[i] ];}
	    		else if ( values[i] == "hundred" && g != 0 )
	    		{ g *= 100;	}
	    		else{ 
	    			if ( Magnitude.hasOwnProperty(values[i]) )
	    			{ n += g * Magnitude[values[i]] ; g = 0; }
	    			else { return "error"; }
	    		}
			}

	    	return n + g;
	    }

	    function zeroFill( number, width )
		{
  			width -= number.toString().length;
		  	if ( width > 0 )
		  	{
		    	return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		  	}
		  	return number + "";
		}

	    function num2string(Nnumber){
	    	var words ="";

	    	if ( Nnumber == 0 )
        	{ words += "zero "; }
        	else
        	{
				var numStr = Nnumber.toString();
        		var numStrLen = numStr.length;
        		var groups = Math.floor((numStrLen + 2) / 3);

        		numStr = zeroFill( Nnumber,groups * 3);
        		
        		for (i = 0; i < groups*3; i += 3)
        		{
        			var h = Number(numStr.charAt(i))
		            var t = Number(numStr.charAt(i+1))
		            var u = Number(numStr.charAt(i+2))
		            var g = groups - (i / 3 + 1)
        			
		            if (h >= 1)
		            {
		                words += units[h] + " ";
		                words += "hundred ";
		            }
                	
		            if (t > 1)
		            {
		                words += tens[t];
		                
		                if (u >= 1)
		                { words += units[u];}
		            }
		            else if ( t == 1 )
		            {   if ( u >= 1)
		                { words += teens[u];}
		                else
		                { words += tens[t];}
		            }
		            else
		            {    if ( u >= 1)
		                 {   words += units[u]; }
		            }
		            
		            if ( (g >= 1 ) && ( (h + t + u) > 0) )
		            {    words += thousands[g]; }   	
        		}      		
			}
			
			return words;
	    }

		$scope.result = function() {

	    	var a = string2num($scope.firstString.toLowerCase().replace("-", " "));
	    	var b = string2num($scope.secondString.toLowerCase().replace("-", " "));

	    	if ( a == "error" || b == "error" )
	    	{ return "zero" }
	    	else 
	    	{	
	    		var sum = a + b ;
	    		return num2string(sum);  
	    	}
	    }
	});