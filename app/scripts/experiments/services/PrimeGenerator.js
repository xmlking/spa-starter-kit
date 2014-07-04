'use strict';

function* numbers(start) {
	while (true) {
		yield start++;
	}
}

export function* take(count, seq) {
	for (var i = 0; i < count; i++) {
		yield seq.next().value;
	}
}

function* filter(seq, prime) {
	for (var num of seq) {
		if (num % prime !== 0) {
			yield num;
		}
	}
}

export function* primes() {
	var seq = numbers(2);
	var prime;

	while (true) {
		prime = seq.next().value;
		yield prime;
		seq = filter(seq, prime);
	}
}

//// change 10 to 15 below and click "Execute"
//for (var prime of take(10 /* <--here */, primes())) {
//	console.log(prime);
//}
