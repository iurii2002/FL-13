const letterCount = (str, letter) => {
    return (str.toLowerCase().split(letter.toLowerCase()).length - 1);
}

letterCount("Maggy", "g")