const countPoints = (arr) => {
    let points = 0;
    for (let scores of arr) {
        if (scores[0] > scores[2]) {
            points += 3;
        } else if (scores[0] === scores[2]) {
            points += 1;
        }
    }
    return points;
}

countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']) 