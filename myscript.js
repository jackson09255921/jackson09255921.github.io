// 生成一個指定範圍內的隨機整數
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成樂透號碼
function generateLotteryNumbers() {
    var numbers = [];

    while (numbers.length < 3) {
        var randomNumber = getRandomNumber(1, 10);

        if (numbers.indexOf(randomNumber) === -1) {
            numbers.push(randomNumber);
        }
    }
    return numbers;
}

// 驗證用戶的選擇是否合法
function validateUserNumbers(userNumbers) {
    if (userNumbers.length !== 3) {
        return false;
    }
    for (var i = 0; i < userNumbers.length; i++) {
        var number = userNumbers[i];

        if (isNaN(number) || number < 1 || number > 10) {
            return false;
        }
    }
    return true;
}

// 比較用戶的選擇和樂透號碼
function compareNumbers(userNumbers, lotteryNumbers) {
    var matchedNumbers = [];

    for (var i = 0; i < userNumbers.length; i++) {
        var userNumber = userNumbers[i];

        if (lotteryNumbers.indexOf(userNumber) !== -1) {
            matchedNumbers.push(userNumber);
        }
    }
    return matchedNumbers;
}

// 檢查用戶的選擇
function checkNumbers() {
    var userNumbers = [];
    var inputs = document.querySelectorAll('.number-input input');

    for (var i = 0; i < inputs.length; i++) {
        var number = parseInt(inputs[i].value);

        if (isNaN(number) || number < 1 || number > 10) {
            alert('輸入無效，請輸入一個 1 到 10 之間的號碼。');
            resetNumbers();
            return;
        }

        if (userNumbers.indexOf(number) !== -1) {
            alert('您已經輸入過該號碼，請輸入不同的號碼。');
            resetNumbers();
            return;
        }
        userNumbers.push(number);
    }

    if (!validateUserNumbers(userNumbers)) {
        alert('請選擇 3 個號碼。');
        resetNumbers();
        return;
    }

    var lotteryNumbers = generateLotteryNumbers();
    var matchedNumbers = compareNumbers(userNumbers, lotteryNumbers);

    let result = ('樂透號碼為：' + lotteryNumbers.join(', ') + '<br>' +
        '您選擇的號碼為：' + userNumbers.join(', ') + '<br>' +
        '匹配的號碼為：' + matchedNumbers.join(', '));
    
    prize(matchedNumbers, result);
}

//輸出獎金面額
function prize(matchedNumbers, result){
    let text;
    var num = matchedNumbers.length;
    if (num == 3){
        text = '恭喜獲得頭獎(≧▽≦)，榮獲1,000,000,000';

    }else if(num == 2){
        text = '恭喜獲得二獎｡^‿^｡，榮獲500,000,000';   
    }else if (num == 1){
        text = '恭喜獲得三獎｡(◑‿◐)，榮獲10,000,000';
    }else
    {
        text = '再接再厲(─‿─)';
    }

    text = result + "<br>" + text;
    document.getElementById("result").innerHTML = text;
    resetNumbers()
}

function resetNumbers()
{
    var numberInputs = document.querySelectorAll('input[type="number"]');
    for (var i = 0; i < numberInputs.length; i++) {
        numberInputs[i].value = '';
    }
}