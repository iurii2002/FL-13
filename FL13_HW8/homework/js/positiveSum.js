const positiveSum = (arr) => arr.reduce((sum, num) => num > 0 ? sum + num : sum, 0);

positiveSum([2, 4, 6, 8])