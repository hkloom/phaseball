/*

RECURSIVE DESCENT PARSER
Tai Rodrig
May 2014


A recursive descent parser that parses
mathematical expressions with the following operations:

+	means	addition
-	means	subtraction
*	means	multiplication
/	means 	division
()	mean 	parenthesis
[]	mean 	parenthesis
>> 	means 	bitshift right
<<	means 	bitshift left
sin()	means 	sin
cos() 	means	cosine

*/




//LEXER
//converts a string into a list of tokens
//selected from a list of approved tokens
function lex(string){


	this.optable = {
		'+' : 'PLUS',
		'-'	: 'MINUS',
		'*'	: 'TIMES',
		'/'	: 'DIVIDE',
		'('	: 'OPENPAREN',
		')'	: 'CLOSEPAREN',
		'['	: 'OPENBRAC',
		']'	: 'CLOSEBRAC',
		 
	};






}